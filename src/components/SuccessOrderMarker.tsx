"use client";

import { useEffect } from "react";
import { updateOrderStatus } from "@/lib/orders";

export default function SuccessOrderMarker() {
  useEffect(() => {
    const orderId = new URLSearchParams(window.location.search).get("order_id");
    if (orderId) updateOrderStatus(orderId, "success");
  }, []);

  return null;
}
