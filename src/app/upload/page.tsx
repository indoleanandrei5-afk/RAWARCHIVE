"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { addOrder, getLatestPendingOrder, removeOrderById, updateOrderStatus, updateOrderUploadedUrls, Order } from "@/lib/orders";

// Pricing rule: total equals photo count, except every 10th photo threshold gets
// a cumulative $3 discount (10 -> 7, 20 -> 14, 30 -> 21, ...).
function calculateTieredPrice(photoCount: number): number {
  if (photoCount <= 0) return 0;
  const discountBlocks = Math.floor(photoCount / 10);
  return photoCount - discountBlocks * 3;
}

type UploadedAsset = {
  secureUrl: string;
  publicId: string;
  originalFilename: string;
};

async function uploadFilesToCloudinaryRaw(
  orderId: string,
  filesToUpload: File[],
  isTemporary: boolean = false,
): Promise<UploadedAsset[]> {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName || !uploadPreset) {
    throw new Error("Upload storage is not configured. Add Cloudinary environment variables.");
  }

  const uploadedAssets: UploadedAsset[] = [];
  const folderPath = isTemporary ? `raw-archive-orders/${orderId}/temp` : `raw-archive-orders/${orderId}`;

  for (let index = 0; index < filesToUpload.length; index += 1) {
    const file = filesToUpload[index];

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);
    formData.append("folder", folderPath);
    formData.append("tags", isTemporary ? "raw-archive,temp-upload" : "raw-archive,paid-upload");

    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (!response.ok || !data.secure_url || !data.public_id) {
      throw new Error(data?.error?.message || "Unable to upload one or more files.");
    }

    uploadedAssets.push({
      secureUrl: data.secure_url,
      publicId: data.public_id,
      originalFilename: file.name,
    });
  }

  return uploadedAssets;
}

export default function Upload() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [files, setFiles] = useState<File[]>([]);
  const [isDragActive, setIsDragActive] = useState(false);

  const totalPrice = useMemo(() => calculateTieredPrice(files.length), [files]);
  const tierDiscount = useMemo(() => Math.floor(files.length / 10) * 3, [files.length]);
  const nextTierAt = useMemo(() => {
    if (files.length <= 0) return 10;
    return (Math.floor(files.length / 10) + 1) * 10;
  }, [files.length]);

  const handleFiles = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;

    const incomingFiles = Array.from(selectedFiles);
    setFiles((current) => {
      const merged = [...current, ...incomingFiles];
      if (!selectedTierPreview) return merged;
      return merged.slice(0, selectedTierPreview);
    });

    if (selectedTierPreview && files.length + incomingFiles.length > selectedTierPreview) {
      setCheckoutError(`Tier ${selectedTierPreview} allows up to ${selectedTierPreview} photos. Extra files were not added.`);
      return;
    }

    if (checkoutError) setCheckoutError(null);
  };

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  const handleTierSelect = (tier: number) => {
    setSelectedTierPreview(tier);
    setFiles((current) => current.slice(0, tier));
    setIsCheckoutOpen(false);
    setCheckoutError(null);
    openFilePicker();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragActive(false);
    handleFiles(event.dataTransfer.files);
  };

  const removeFile = (index: number) => {
    setFiles((current) => current.filter((_, idx) => idx !== index));
  };

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [editNotes, setEditNotes] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const [filesToUpload, setFilesToUpload] = useState<File[]>([]);
  const [selectedTierPreview, setSelectedTierPreview] = useState(10);
  const [socialMediaConsent, setSocialMediaConsent] = useState<"allow" | "deny" | null>(null);

  const checkoutStatus: "success" | "canceled" | null =
    typeof window === "undefined"
      ? null
      : new URLSearchParams(window.location.search).get("success") === "true"
      ? "success"
      : new URLSearchParams(window.location.search).get("canceled") === "true"
      ? "canceled"
      : null;

  const tierStops = useMemo(() => [10, 20, 30], []);

  useEffect(() => {
    if (files.length <= 0) {
      setSelectedTierPreview(10);
      return;
    }

    const nextTier = Math.ceil(files.length / 10) * 10;
    setSelectedTierPreview(Math.min(30, Math.max(10, nextTier)));
  }, [files.length]);

  useEffect(() => {
    if (checkoutStatus === "success") {
      const pending = getLatestPendingOrder();
      if (pending && filesToUpload.length > 0) {
        // Upload files after payment confirmation
        uploadFilesToCloudinaryRaw(pending.id, filesToUpload, false)
          .then((uploadedAssets) => {
            // Update order with uploaded URLs
            updateOrderUploadedUrls(pending.id, uploadedAssets.map((a) => a.secureUrl));
            updateOrderStatus(pending.id, "success");
          })
          .catch((error) => {
            console.error("Failed to upload files after payment:", error);
            updateOrderStatus(pending.id, "success");
          });
      } else if (pending) {
        updateOrderStatus(pending.id, "success");
      }
    } else if (checkoutStatus === "canceled") {
      const pending = getLatestPendingOrder();
      if (pending) {
        updateOrderStatus(pending.id, "canceled");
      }
    }
  }, [checkoutStatus, filesToUpload]);

  const handleCheckout = async () => {
    if (files.length === 0) return;
    
    if (!clientEmail.trim()) {
      setCheckoutError("Please enter your email address");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(clientEmail)) {
      setCheckoutError("Please enter a valid email address");
      return;
    }

    if (!socialMediaConsent) {
      setCheckoutError("Please choose your social media usage preference before checkout.");
      return;
    }

    setCheckoutLoading(true);
    setCheckoutError(null);
    setUploadStatus(null);

    const orderId = crypto.randomUUID();

    try {
      // Store files for upload after payment
      setFilesToUpload(files);

      // Create order WITHOUT uploading files yet
      const pendingOrder: Order = {
        id: orderId,
        createdAt: new Date().toISOString(),
        photoCount: files.length,
        total: totalPrice,
        status: "pending",
        photoNames: files.map((file) => file.name).join(", "),
        clientEmail,
        editNotes,
        socialMediaConsent,
      };

      addOrder(pendingOrder);

      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId,
          cloudinaryFolder: `raw-archive-orders/${orderId}`,
          items: files.map((file) => ({
            name: file.name,
          })),
          uploadedPreviewUrls: [],
          editNotes,
          socialMediaConsent,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        removeOrderById(orderId);
        setUploadStatus(null);
        throw new Error(data.message || "Unable to create checkout session");
      }
      if (data.url) {
        setUploadStatus("Redirecting to secure payment...");
        window.location.assign(data.url);
      }
    } catch (error) {
      removeOrderById(orderId);
      const message = error instanceof Error ? error.message : "Payment failed. Please try again.";
      setCheckoutError(message);
      setUploadStatus(null);
    } finally {
      setCheckoutLoading(false);
    }
  };

  return (
    <main className="page-wrap relative overflow-hidden px-4 py-16 sm:px-6 sm:py-20">
      <div className="page-overlay" />
      <div className="page-container">
        <div className="mb-12 text-center sm:mb-14">
          <p className="eyebrow">
            Upload your photos
          </p>
          <h1 className="pro-title mt-5 sm:mt-6">Start your edit.</h1>
          <p className="pro-subtitle mx-auto mt-4 max-w-2xl text-base sm:text-lg">
            Upload your photos, glance at the total, and you are ready to go. It starts at $1 per photo, with $3 automatically knocked off every 10 images.
          </p>
        </div>

        {checkoutStatus === "success" && (
          <div className="pro-shell mb-10 border-emerald-300/30 bg-emerald-300/10 p-6 text-center text-white sm:p-8">
            <p className="text-xs uppercase tracking-[0.28em] text-emerald-200 sm:text-sm sm:tracking-[0.4em]">Order Confirmed</p>
            <h2 className="mt-4 text-2xl font-bold sm:text-3xl">Thanks — your upload order is being processed.</h2>
            <p className="mt-3 text-gray-100">
              Payment completed successfully. We’ll handle your files and send you a confirmation email soon.
            </p>
          </div>
        )}

        {checkoutStatus === "canceled" && (
          <div className="pro-shell mb-10 p-6 text-center text-white sm:p-8">
            <p className="text-xs uppercase tracking-[0.28em] text-gray-200 sm:text-sm sm:tracking-[0.4em]">Payment Canceled</p>
            <h2 className="mt-4 text-2xl font-bold sm:text-3xl">Your order was not completed.</h2>
            <p className="mt-3 text-gray-200">
              You can return to your cart and continue to payment whenever you are ready.
            </p>
          </div>
        )}

        <div
          onDragOver={(event) => {
            event.preventDefault();
            setIsDragActive(true);
          }}
          onDragLeave={() => setIsDragActive(false)}
          onDrop={handleDrop}
          onClick={openFilePicker}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              openFilePicker();
            }
          }}
          role="button"
          tabIndex={0}
          aria-label="Upload photos by tapping, clicking, or drag and drop"
          className={`pro-shell p-6 text-center sm:p-12 ${
            isDragActive ? "border-(--accent) bg-white/8" : "border-white/12 bg-white/4"
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(event) => {
              handleFiles(event.target.files);
              event.target.value = "";
            }}
          />
          <p className="text-xl font-semibold sm:text-2xl">Drag & Drop Photos Here</p>
          <p className="tone-soft mt-4">Tap anywhere in this box, or drag your files in to get started.</p>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              openFilePicker();
            }}
            className="btn-primary mt-8 inline-flex w-full cursor-pointer px-8 py-4 font-medium transition sm:w-auto"
          >
            Select Photos
          </button>
        </div>

        <div className="section-shell mt-6 rounded-3xl p-6 sm:mt-8 sm:p-8">
          <p className="eyebrow">Pick Your Set</p>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: 0.13,
                  delayChildren: 0.06,
                },
              },
            }}
            className="mt-5 grid gap-4 md:grid-cols-3"
          >
            {tierStops.map((tier) => {
              const tierPrice = calculateTieredPrice(tier);
              const tierDiscountAmount = Math.floor(tier / 10) * 3;
              const isReached = files.length >= tier;
              const isSelected = selectedTierPreview === tier;

              return (
                <motion.button
                  type="button"
                  key={tier}
                  onClick={() => handleTierSelect(tier)}
                  aria-pressed={isSelected}
                  variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}
                  transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -6, scale: 1.008 }}
                  whileTap={{ scale: 0.98 }}
                  className={`lux-card relative rounded-3xl p-5 text-left transition sm:p-6 ${
                    isSelected
                      ? "border-(--accent) bg-white/12 shadow-[0_0_0_1px_rgba(196,160,106,0.25)]"
                      : isReached
                        ? "border-white/24 bg-white/8"
                        : "border-white/16 bg-white/5"
                  }`}
                >
                  {tier === 10 && (
                    <span className="absolute right-4 top-4 rounded-full border border-white/16 bg-white/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-white/75">
                      Popular
                    </span>
                  )}
                  <p className="tone-faint text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em]">{tier} Photos</p>
                  <p className="mt-4 text-3xl font-semibold text-white sm:text-4xl">${tierPrice}</p>
                  <p className="tone-soft mt-2 text-sm">Price for this set</p>
                  <p className="tone-faint mt-3 text-xs uppercase tracking-[0.14em] sm:tracking-[0.24em]">Savings ${tierDiscountAmount}</p>
                </motion.button>
              );
            })}
          </motion.div>
          <p className="tone-soft mt-4 text-sm">
            Quick preview: {selectedTierPreview} photos comes to ${calculateTieredPrice(selectedTierPreview)}, with ${Math.floor(selectedTierPreview / 10) * 3} off built in.
          </p>
          <p className="tone-muted mt-2 text-sm">
            Selected {Math.min(files.length, selectedTierPreview)} of {selectedTierPreview} photos for this tier.
          </p>
          <p className="tone-faint mt-4 text-xs sm:text-sm">
            Pick 10, 20, or 30 to lock in your tier, then start dropping files straight in.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <motion.div whileTap={{ scale: 0.98 }}>
              <button
                type="button"
                onClick={() => handleTierSelect(selectedTierPreview)}
                className="btn-secondary inline-flex px-6 py-3 text-sm uppercase tracking-[0.12em] transition"
              >
                Choose {selectedTierPreview} Photos
              </button>
            </motion.div>
            <motion.div whileTap={{ scale: 0.98 }}>
              <button
                type="button"
                disabled={files.length !== selectedTierPreview}
                onClick={() => setIsCheckoutOpen(true)}
                className="btn-primary cta-sheen inline-flex px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] transition disabled:cursor-not-allowed disabled:opacity-45"
              >
                Continue With {selectedTierPreview}
              </button>
            </motion.div>
          </div>
        </div>

        <div className="mt-10 grid gap-6 sm:mt-12 sm:gap-8 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <div className="section-shell rounded-3xl p-6 sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-gray-500 sm:text-sm sm:tracking-[0.4em]">Order Summary</p>
                  <h2 className="mt-4 text-2xl font-bold sm:text-3xl">{files.length} Photos</h2>
                </div>
                <p className="text-2xl font-semibold sm:text-3xl">${totalPrice}</p>
              </div>

              <div className="mt-8 space-y-3 text-gray-200">
                <p>
                  {files.length === 0
                    ? "Add photos to see your total"
                    : `$${files.length} base, $${tierDiscount} discount, $${totalPrice} final total`}
                </p>
                {files.length > 0 && files.length % 10 !== 0 && (
                  <p className="text-white/65">Hit {nextTierAt} photos and another $3 drops off automatically.</p>
                )}
                <p>Secure upload</p>
                <p>High-resolution delivery</p>
              </div>

              <button
                type="button"
                disabled={files.length === 0}
                onClick={() => setIsCheckoutOpen(true)}
                className="mt-10 w-full rounded-full border border-white/20 bg-(--accent-strong) px-8 py-4 font-semibold text-black/90 transition hover:bg-(--accent) disabled:cursor-not-allowed disabled:opacity-50"
              >
                Continue to Payment
              </button>
            </div>

            {isCheckoutOpen && (
              <div className="section-shell mt-8 rounded-3xl p-6 sm:p-8">
                <p className="eyebrow">Checkout</p>
                <h3 className="mt-4 text-2xl font-medium sm:text-3xl">Review Your Order</h3>
                <p className="pro-subtitle mt-3">One last look before checkout. Count, price, notes, all in one place.</p>

                <div className="pro-panel mt-8 grid gap-4 p-6">
                  <div className="flex items-center justify-between text-lg">
                    <span>Photos</span>
                    <span>{files.length}</span>
                  </div>
                  <div className="flex items-center justify-between text-lg">
                    <span>Base</span>
                    <span>${files.length}</span>
                  </div>
                  <div className="flex items-center justify-between text-lg">
                    <span>Tier Discount</span>
                    <span>${tierDiscount}</span>
                  </div>
                  <div className="flex items-center justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>${totalPrice}</span>
                  </div>
                </div>

                <div className="mt-6">
                  <label htmlFor="client-email" className="field-label">
                    Your Email
                  </label>
                  <input
                    id="client-email"
                    type="email"
                    value={clientEmail}
                    onChange={(event) => setClientEmail(event.target.value)}
                    placeholder="your@email.com"
                    className="field-input mt-3 text-sm"
                    required
                  />
                  <p className="mt-2 text-xs text-white/56">We&apos;ll send your edited photos to this email.</p>
                </div>

                <div className="mt-6">
                  <label htmlFor="edit-notes" className="field-label">
                    Edit Notes For Your Photos
                  </label>
                  <textarea
                    id="edit-notes"
                    value={editNotes}
                    onChange={(event) => setEditNotes(event.target.value)}
                    placeholder="Tell me the look you want: clean and bright, cinematic and moody, soft and natural, or anything in between."
                    rows={5}
                    className="field-input mt-3 text-sm"
                  />
                </div>

                <div className="mt-6">
                  <p className="field-label">Social Media Permission</p>
                  <p className="mt-2 text-xs text-white/56">
                    Can we feature your edited photos on RAW ARCHIVE social media and portfolio channels?
                  </p>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    <button
                      type="button"
                      onClick={() => {
                        setSocialMediaConsent("allow");
                        if (checkoutError) setCheckoutError(null);
                      }}
                      aria-pressed={socialMediaConsent === "allow"}
                      className={`rounded-2xl border px-4 py-3 text-left text-sm transition ${
                        socialMediaConsent === "allow"
                          ? "border-(--accent) bg-white/10 text-white"
                          : "border-white/20 text-white/85 hover:border-white/35"
                      }`}
                    >
                      <span className="block font-medium">Yes, you can use them</span>
                      <span className="mt-1 block text-xs text-white/60">Approved for social and portfolio sharing</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSocialMediaConsent("deny");
                        if (checkoutError) setCheckoutError(null);
                      }}
                      aria-pressed={socialMediaConsent === "deny"}
                      className={`rounded-2xl border px-4 py-3 text-left text-sm transition ${
                        socialMediaConsent === "deny"
                          ? "border-(--accent) bg-white/10 text-white"
                          : "border-white/20 text-white/85 hover:border-white/35"
                      }`}
                    >
                      <span className="block font-medium">No, keep them private</span>
                      <span className="mt-1 block text-xs text-white/60">Only used for your order delivery</span>
                    </button>
                  </div>
                </div>

                <div className="mt-8 grid gap-4">
                  {uploadStatus && (
                    <p className="rounded-3xl border border-white/15 bg-white/8 p-4 text-sm text-gray-100">
                      {uploadStatus}
                    </p>
                  )}
                  {checkoutError && (
                    <p className="rounded-3xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-200">
                      {checkoutError}
                    </p>
                  )}
                  <div className="flex flex-col gap-4 sm:flex-row">
                    <button
                      type="button"
                      disabled={checkoutLoading || files.length === 0}
                      onClick={handleCheckout}
                      className="flex-1 rounded-full border border-white/20 bg-(--accent-strong) px-8 py-4 font-semibold text-black/90 transition hover:bg-(--accent) disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {checkoutLoading ? "Redirecting…" : `Pay $${totalPrice}`}
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsCheckoutOpen(false)}
                      className="flex-1 rounded-full border border-white/20 px-8 py-4 text-white transition hover:border-white/40"
                    >
                      Back to Order
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div>
            <div className="section-shell rounded-3xl p-6 sm:p-8">
              <h3 className="text-xl font-medium sm:text-2xl">Selected Photos</h3>
              {files.length === 0 ? (
                <p className="pro-subtitle mt-6">No photos selected yet.</p>
              ) : (
                <div className="mt-6 space-y-4">
                  {files.map((file, index) => {
                    const previewUrl = URL.createObjectURL(file);

                    return (
                    <div key={`${file.name}-${index}`} className="pro-panel flex items-center gap-4 p-4">
                      <div className="h-16 w-16 overflow-hidden rounded-2xl bg-white/10">
                        <img
                          src={previewUrl}
                          alt={file.name}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">{file.name}</p>
                        <p className="text-xs text-gray-300">{Math.round(file.size / 1024)} KB</p>
                      </div>
                      <button
                        type="button"
                        className="rounded-full border border-white/20 px-3 py-1 text-sm text-gray-200 transition hover:border-white/40 hover:text-white"
                        onClick={() => removeFile(index)}
                      >
                        Remove
                      </button>
                    </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
