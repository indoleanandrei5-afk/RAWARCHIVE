"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { addOrder, getLatestPendingOrder, removeOrderById, updateOrderStatus, updateOrderUploadedUrls, Order } from "@/lib/orders";

// Tiered pricing: 1-9 = $1 each, 10-19 = $7 flat, 20-29 = $18 flat, 30+ = $25 flat
function calculateTieredPrice(photoCount: number): number {
  if (photoCount <= 9) {
    return photoCount; // $1 per photo
  } else if (photoCount <= 19) {
    return 7; // $7 flat
  } else if (photoCount <= 29) {
    return 18; // $18 flat
  } else {
    return 25; // $25 flat
  }
}

type UploadedAsset = {
  secureUrl: string;
  publicId: string;
  originalFilename: string;
};

export default function Upload() {
  const router = useRouter();
  const [checkoutStatus, setCheckoutStatus] = useState<"success" | "canceled" | null>(null);

  const [files, setFiles] = useState<File[]>([]);
  const [isDragActive, setIsDragActive] = useState(false);

  const totalPrice = useMemo(() => calculateTieredPrice(files.length), [files]);

  const handleFiles = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;
    setFiles((current) => [...current, ...Array.from(selectedFiles)]);
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

  useEffect(() => {
    if (typeof window === "undefined") return;

    const searchParams = new URLSearchParams(window.location.search);
    const success = searchParams.get("success") === "true";
    const canceled = searchParams.get("canceled") === "true";

    if (success) {
      const pending = getLatestPendingOrder();
      if (pending && filesToUpload.length > 0) {
        // Upload files after payment confirmation
        uploadFilesToCloudinary(pending.id, filesToUpload, false)
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
      
      setCheckoutStatus("success");
      setFiles([]);
      setFilesToUpload([]);
      setEditNotes("");
      setClientEmail("");
      setIsCheckoutOpen(false);
      setCheckoutError(null);
      router.replace("/upload", { scroll: false });
    } else if (canceled) {
      const pending = getLatestPendingOrder();
      if (pending) {
        updateOrderStatus(pending.id, "canceled");
      }
      setCheckoutStatus("canceled");
      router.replace("/upload", { scroll: false });
    }
  }, [router]);

  const uploadFilesToCloudinary = async (orderId: string, filesToUpload: File[], isTemporary: boolean = false): Promise<UploadedAsset[]> => {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
      throw new Error("Upload storage is not configured. Add Cloudinary environment variables.");
    }

    const uploadedAssets: UploadedAsset[] = [];
    const folderPath = isTemporary ? `raw-archive-orders/${orderId}/temp` : `raw-archive-orders/${orderId}`;

    for (let index = 0; index < filesToUpload.length; index += 1) {
      const file = filesToUpload[index];
      setUploadStatus(`Uploading ${index + 1} of ${filesToUpload.length}...`);

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
  };

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

    setCheckoutLoading(true);
    setCheckoutError(null);
    setUploadStatus(null);

    const orderId = `${Date.now()}`;

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
        window.location.href = data.url;
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
    <main className="min-h-screen bg-[#050507] px-4 py-16 text-white sm:px-6 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center sm:mb-14">
          <p className="text-xs uppercase tracking-[0.28em] text-gray-500 sm:text-sm sm:tracking-[0.45em]">
            Upload your photos
          </p>
          <h1 className="mt-5 text-4xl font-semibold sm:mt-6 sm:text-5xl">Start your edit.</h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-gray-200 sm:text-lg">
            Drop your images below and review your total before payment. Tiered pricing: $1 per photo for 1-9, $7 flat for 10-19, $18 flat for 20-29, $25 flat for 30+.
          </p>
        </div>

        {checkoutStatus === "success" && (
          <div className="mb-10 rounded-4xl border border-emerald-300/30 bg-emerald-300/10 p-6 text-center text-white sm:rounded-[40px] sm:p-8">
            <p className="text-xs uppercase tracking-[0.28em] text-emerald-200 sm:text-sm sm:tracking-[0.4em]">Order Confirmed</p>
            <h2 className="mt-4 text-2xl font-bold sm:text-3xl">Thanks — your upload order is being processed.</h2>
            <p className="mt-3 text-gray-100">
              Payment completed successfully. We’ll handle your files and send you a confirmation email soon.
            </p>
          </div>
        )}

        {checkoutStatus === "canceled" && (
          <div className="mb-10 rounded-4xl border border-white/15 bg-white/8 p-6 text-center text-white sm:rounded-[40px] sm:p-8">
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
          className={`rounded-4xl border border-white/15 bg-white/[0.07] p-6 text-center transition sm:rounded-[40px] sm:p-12 ${
            isDragActive ? "border-(--accent) bg-white/12" : "border-white/15 bg-white/[0.07]"
          }`}
        >
          <p className="text-xl font-semibold sm:text-2xl">Drag & Drop Photos Here</p>
          <p className="mt-4 text-gray-200">Or click below to select files from your computer</p>

          <label className="mt-8 inline-flex w-full cursor-pointer items-center justify-center rounded-full border border-white/20 bg-(--accent-strong) px-8 py-4 text-[#0b111a] transition hover:scale-105 hover:bg-(--accent) sm:w-auto">
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(event) => handleFiles(event.target.files)}
            />
            Select Photos
          </label>
        </div>

        <div className="mt-10 grid gap-6 sm:mt-12 sm:gap-8 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <div className="rounded-4xl border border-white/15 bg-white/[0.07] p-6 sm:rounded-[40px] sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-gray-500 sm:text-sm sm:tracking-[0.4em]">Order Summary</p>
                  <h2 className="mt-4 text-2xl font-bold sm:text-3xl">{files.length} Photos</h2>
                </div>
                <p className="text-2xl font-semibold sm:text-3xl">${totalPrice}</p>
              </div>

              <div className="mt-8 space-y-3 text-gray-200">
                <p>{files.length <= 9 ? `$1 per photo` : files.length <= 19 ? `Flat rate $7` : files.length <= 29 ? `Flat rate $18` : `Flat rate $25`}</p>
                <p>Secure upload</p>
                <p>High-resolution delivery</p>
              </div>

              <button
                type="button"
                disabled={files.length === 0}
                onClick={() => setIsCheckoutOpen(true)}
                className="mt-10 w-full rounded-full border border-white/20 bg-(--accent-strong) px-8 py-4 font-semibold text-[#0b111a] transition hover:scale-105 hover:bg-(--accent) disabled:cursor-not-allowed disabled:opacity-50"
              >
                Continue to Payment
              </button>
            </div>

            {isCheckoutOpen && (
              <div className="mt-8 rounded-4xl border border-white/15 bg-white/[0.07] p-6 sm:rounded-[40px] sm:p-8">
                <p className="text-xs uppercase tracking-[0.28em] text-gray-500 sm:text-sm sm:tracking-[0.4em]">Checkout</p>
                <h3 className="mt-4 text-2xl font-bold sm:text-3xl">Review Your Order</h3>
                <p className="mt-3 text-gray-200">Confirm your photo count and total before continuing to payment.</p>

                <div className="mt-8 grid gap-4 rounded-3xl border border-white/10 bg-black/40 p-6">
                  <div className="flex items-center justify-between text-lg">
                    <span>Photos</span>
                    <span>{files.length}</span>
                  </div>
                  <div className="flex items-center justify-between text-lg">
                    <span>Pricing</span>
                    <span>{files.length <= 9 ? `$1 per photo` : files.length <= 19 ? `Flat $7` : files.length <= 29 ? `Flat $18` : `Flat $25`}</span>
                  </div>
                  <div className="flex items-center justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>${totalPrice}</span>
                  </div>
                </div>

                <div className="mt-6">
                  <label htmlFor="client-email" className="text-xs uppercase tracking-[0.22em] text-gray-300">
                    Your Email
                  </label>
                  <input
                    id="client-email"
                    type="email"
                    value={clientEmail}
                    onChange={(event) => setClientEmail(event.target.value)}
                    placeholder="your@email.com"
                    className="mt-3 w-full rounded-2xl border border-white/15 bg-black/35 px-4 py-3 text-sm text-white outline-none placeholder:text-gray-400 focus:border-(--accent)"
                    required
                  />
                  <p className="mt-2 text-xs text-gray-400">We'll send your edited photos to this email.</p>
                </div>

                <div className="mt-6">
                  <label htmlFor="edit-notes" className="text-xs uppercase tracking-[0.22em] text-gray-300">
                    Edit Notes For Your Photos
                  </label>
                  <textarea
                    id="edit-notes"
                    value={editNotes}
                    onChange={(event) => setEditNotes(event.target.value)}
                    placeholder="Describe your preferred look: tone, warmth, contrast, skin retouch, cleanup, crop, and any priority shots."
                    rows={5}
                    className="mt-3 w-full rounded-2xl border border-white/15 bg-black/35 px-4 py-3 text-sm text-white outline-none placeholder:text-gray-400 focus:border-(--accent)"
                  />
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
                      className="flex-1 rounded-full border border-white/20 bg-(--accent-strong) px-8 py-4 font-semibold text-[#0b111a] transition hover:scale-105 hover:bg-(--accent) disabled:cursor-not-allowed disabled:opacity-50"
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
            <div className="rounded-4xl border border-white/15 bg-white/[0.07] p-6 sm:rounded-[40px] sm:p-8">
              <h3 className="text-xl font-semibold sm:text-2xl">Selected Photos</h3>
              {files.length === 0 ? (
                <p className="mt-6 text-gray-200">No photos selected yet.</p>
              ) : (
                <div className="mt-6 space-y-4">
                  {files.map((file, index) => (
                    <div key={`${file.name}-${index}`} className="flex items-center gap-4 rounded-3xl border border-white/15 bg-black/35 p-4">
                      <div className="h-16 w-16 overflow-hidden rounded-2xl bg-white/10">
                        <img
                          src={URL.createObjectURL(file)}
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
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
