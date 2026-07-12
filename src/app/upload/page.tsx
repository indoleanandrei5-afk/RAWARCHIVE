"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { addOrder, getLatestPendingOrder, removeOrderById, updateOrderStatus, Order } from "@/lib/orders";

const PRICE_PER_PHOTO = 1;

export default function Upload() {
  const router = useRouter();
  const [checkoutStatus, setCheckoutStatus] = useState<"success" | "canceled" | null>(null);

  const [files, setFiles] = useState<File[]>([]);
  const [isDragActive, setIsDragActive] = useState(false);

  const totalPrice = useMemo(() => files.length * PRICE_PER_PHOTO, [files]);

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

  useEffect(() => {
    if (typeof window === "undefined") return;

    const searchParams = new URLSearchParams(window.location.search);
    const success = searchParams.get("success") === "true";
    const canceled = searchParams.get("canceled") === "true";

    if (success) {
      const pending = getLatestPendingOrder();
      if (pending) {
        updateOrderStatus(pending.id, "success");
      }
      setCheckoutStatus("success");
      setFiles([]);
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

  const [pendingOrderId, setPendingOrderId] = useState<string | null>(null);

  const handleCheckout = async () => {
    if (files.length === 0) return;
    setCheckoutLoading(true);
    setCheckoutError(null);

    const orderId = `${Date.now()}`;
    const pendingOrder: Order = {
      id: orderId,
      createdAt: new Date().toISOString(),
      photoCount: files.length,
      total: totalPrice,
      status: "pending",
      photoNames: files.map((file) => file.name).join(", "),
    };

    addOrder(pendingOrder);
    setPendingOrderId(orderId);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: files.map((file) => ({
            name: file.name,
            quantity: 1,
            unit_amount: PRICE_PER_PHOTO * 100,
          })),
          metadata: {
            photoCount: files.length.toString(),
            photoNames: files.map((file) => file.name).join(", "),
          },
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        removeOrderById(orderId);
        throw new Error(data.message || "Unable to create checkout session");
      }
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      if (pendingOrderId === orderId) {
        removeOrderById(orderId);
        setPendingOrderId(null);
      }
      const message = error instanceof Error ? error.message : "Payment failed. Please try again.";
      setCheckoutError(message);
    } finally {
      setCheckoutLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black px-6 py-20 text-white">
      <div className="mx-auto max-w-5xl">
        <div className="mb-14 text-center">
          <p className="uppercase tracking-[0.45em] text-sm text-gray-500">
            Upload your photos
          </p>
          <h1 className="mt-6 text-5xl font-semibold">Start your edit.</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-400">
            Drop your images below and review your total before payment. Pricing is $1 per photo.
          </p>
        </div>

        {checkoutStatus === "success" && (
          <div className="mb-10 rounded-[40px] border border-emerald-500/20 bg-emerald-500/10 p-8 text-center text-white">
            <p className="text-sm uppercase tracking-[0.4em] text-emerald-200">Order Confirmed</p>
            <h2 className="mt-4 text-3xl font-bold">Thanks — your upload order is being processed.</h2>
            <p className="mt-3 text-gray-100">
              Payment completed successfully. We’ll handle your files and send you a confirmation email soon.
            </p>
          </div>
        )}

        {checkoutStatus === "canceled" && (
          <div className="mb-10 rounded-[40px] border border-amber-500/20 bg-amber-500/10 p-8 text-center text-white">
            <p className="text-sm uppercase tracking-[0.4em] text-amber-200">Payment Canceled</p>
            <h2 className="mt-4 text-3xl font-bold">Your order was not completed.</h2>
            <p className="mt-3 text-gray-100">
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
          className={`rounded-[40px] border border-white/10 bg-white/5 p-12 text-center transition ${
            isDragActive ? "border-white/30 bg-white/10" : "border-white/10 bg-white/5"
          }`}
        >
          <p className="text-2xl font-semibold">Drag & Drop Photos Here</p>
          <p className="mt-4 text-gray-400">Or click below to select files from your computer</p>

          <label className="mt-8 inline-flex cursor-pointer items-center justify-center rounded-full bg-white px-8 py-4 text-black transition hover:scale-105">
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

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <div className="rounded-[40px] border border-white/10 bg-white/5 p-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.4em] text-gray-500">Order Summary</p>
                  <h2 className="mt-4 text-3xl font-bold">{files.length} Photos</h2>
                </div>
                <p className="text-3xl font-semibold">${totalPrice}</p>
              </div>

              <div className="mt-8 space-y-3 text-gray-400">
                <p>${PRICE_PER_PHOTO} per photo</p>
                <p>Secure upload</p>
                <p>High-resolution delivery</p>
              </div>

              <button
                type="button"
                disabled={files.length === 0}
                onClick={() => setIsCheckoutOpen(true)}
                className="mt-10 w-full rounded-full bg-white px-8 py-4 text-black font-semibold transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Continue to Payment
              </button>
            </div>

            {isCheckoutOpen && (
              <div className="mt-8 rounded-[40px] border border-white/10 bg-white/5 p-8">
                <p className="text-sm uppercase tracking-[0.4em] text-gray-500">Checkout</p>
                <h3 className="mt-4 text-3xl font-bold">Review Your Order</h3>
                <p className="mt-3 text-gray-400">Confirm your photo count and total before continuing to payment.</p>

                <div className="mt-8 grid gap-4 rounded-3xl bg-black/30 p-6">
                  <div className="flex items-center justify-between text-lg">
                    <span>Photos</span>
                    <span>{files.length}</span>
                  </div>
                  <div className="flex items-center justify-between text-lg">
                    <span>Unit price</span>
                    <span>${PRICE_PER_PHOTO}</span>
                  </div>
                  <div className="flex items-center justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>${totalPrice}</span>
                  </div>
                </div>

                <div className="mt-8 grid gap-4">
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
                      className="flex-1 rounded-full bg-white px-8 py-4 text-black font-semibold transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {checkoutLoading ? "Redirecting…" : `Pay $${totalPrice}`}
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsCheckoutOpen(false)}
                      className="flex-1 rounded-full border border-white/10 px-8 py-4 text-white transition hover:border-white/30"
                    >
                      Back to Order
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div>
            <div className="rounded-[40px] border border-white/10 bg-white/5 p-8">
              <h3 className="text-2xl font-semibold">Selected Photos</h3>
              {files.length === 0 ? (
                <p className="mt-6 text-gray-400">No photos selected yet.</p>
              ) : (
                <div className="mt-6 space-y-4">
                  {files.map((file, index) => (
                    <div key={`${file.name}-${index}`} className="flex items-center gap-4 rounded-3xl border border-white/10 bg-black/20 p-4">
                      <div className="h-16 w-16 overflow-hidden rounded-2xl bg-white/10">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={file.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">{file.name}</p>
                        <p className="text-xs text-gray-400">{Math.round(file.size / 1024)} KB</p>
                      </div>
                      <button
                        type="button"
                        className="rounded-full border border-white/10 px-3 py-1 text-sm text-gray-300 transition hover:border-white/30 hover:text-white"
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
