export type AdminOrderStatus = "received" | "editing" | "ready" | "canceled";

export type AdminAsset = {
  assetId: string;
  publicId: string;
  secureUrl: string;
  width: number;
  height: number;
  bytes: number;
  format: string;
  createdAt: string;
  folder: string;
};

export type AdminOrder = {
  id: string;
  sessionId: string;
  createdAt: string;
  clientEmail: string;
  photoCount: number;
  total: number;
  currency: string;
  status: AdminOrderStatus;
  photoNames: string[];
  editNotes: string;
  socialMediaConsent: "allow" | "deny" | "unknown";
  cloudinaryFolder: string;
  editedFolder: string;
  originals: AdminAsset[];
  editedAssets: AdminAsset[];
  deliveryUrls: string[];
};

export type AdminConfiguration = {
  stripe: boolean;
  cloudinary: boolean;
  browserUploads: boolean;
};

export type AdminOrdersResponse = {
  orders: AdminOrder[];
  configuration: AdminConfiguration;
  warnings: string[];
};
