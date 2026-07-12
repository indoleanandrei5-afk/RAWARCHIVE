export type OrderStatus = "pending" | "success" | "canceled";

export type Order = {
  id: string;
  createdAt: string;
  photoCount: number;
  total: number;
  status: OrderStatus;
  photoNames: string;
  uploadedUrls?: string[];
  clientEmail?: string;
  editedUrls?: string[];
  editNotes?: string;
};

const ORDERS_STORAGE_KEY = "rawArchiveOrders";

function parseOrders(value: string | null): Order[] {
  if (!value) return [];
  try {
    return JSON.parse(value) as Order[];
  } catch {
    return [];
  }
}

export function getStoredOrders(): Order[] {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(ORDERS_STORAGE_KEY);
  return parseOrders(raw);
}

export function saveStoredOrders(orders: Order[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
}

export function addOrder(order: Order) {
  const orders = getStoredOrders();
  saveStoredOrders([order, ...orders]);
}

export function removeOrderById(orderId: string) {
  const orders = getStoredOrders().filter((order) => order.id !== orderId);
  saveStoredOrders(orders);
}

export function updateOrderStatus(orderId: string, status: OrderStatus) {
  const orders = getStoredOrders();
  const next = orders.map((order) =>
    order.id === orderId ? { ...order, status } : order,
  );
  saveStoredOrders(next);
}

export function updateOrderUploadedUrls(orderId: string, uploadedUrls: string[]) {
  const orders = getStoredOrders();
  const next = orders.map((order) =>
    order.id === orderId ? { ...order, uploadedUrls } : order,
  );
  saveStoredOrders(next);
}

export function getLatestPendingOrder(): Order | undefined {
  return getStoredOrders().find((order) => order.status === "pending");
}
