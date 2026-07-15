import Stripe from "stripe";
import type {
  AdminAsset,
  AdminConfiguration,
  AdminOrder,
  AdminOrdersResponse,
  AdminOrderStatus,
} from "@/lib/adminTypes";

const assetCache = new Map<string, { expiresAt: number; assets: AdminAsset[] }>();
const ASSET_CACHE_MS = 60_000;

type CloudinaryResource = {
  asset_id?: unknown;
  public_id?: unknown;
  secure_url?: unknown;
  width?: unknown;
  height?: unknown;
  bytes?: unknown;
  format?: unknown;
  created_at?: unknown;
  folder?: unknown;
  asset_folder?: unknown;
};

function getStripe() {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) return null;
  return new Stripe(secretKey, { apiVersion: "2026-06-24.dahlia" });
}

function getConfiguration(): AdminConfiguration {
  return {
    stripe: Boolean(process.env.STRIPE_SECRET_KEY),
    cloudinary: Boolean(
      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME &&
        process.env.CLOUDINARY_API_KEY &&
        process.env.CLOUDINARY_API_SECRET,
    ),
    browserUploads: Boolean(
      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME &&
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
    ),
  };
}

function cloudinaryDeliveryUrl(publicId: string, format: string) {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  if (!cloudName) return "";
  const encodedId = publicId.split("/").map(encodeURIComponent).join("/");
  return `https://res.cloudinary.com/${encodeURIComponent(cloudName)}/image/upload/${encodedId}.${format}`;
}

function parseStatus(value: string | undefined): AdminOrderStatus {
  return value === "editing" || value === "ready" || value === "canceled" ? value : "received";
}

function readString(value: unknown) {
  return typeof value === "string" ? value : "";
}

function readNumber(value: unknown) {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

function mapCloudinaryResource(resource: CloudinaryResource): AdminAsset | null {
  const secureUrl = readString(resource.secure_url);
  const publicId = readString(resource.public_id);
  if (!secureUrl || !publicId) return null;

  return {
    assetId: readString(resource.asset_id) || publicId,
    publicId,
    secureUrl,
    width: readNumber(resource.width),
    height: readNumber(resource.height),
    bytes: readNumber(resource.bytes),
    format: readString(resource.format),
    createdAt: readString(resource.created_at),
    folder: readString(resource.asset_folder) || readString(resource.folder),
  };
}

async function fetchCloudinaryEndpoint(path: string, parameters: Record<string, string>) {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  if (!cloudName || !apiKey || !apiSecret) return [];

  const url = new URL(`https://api.cloudinary.com/v1_1/${cloudName}/${path}`);
  Object.entries(parameters).forEach(([key, value]) => url.searchParams.set(key, value));

  const response = await fetch(url, {
    headers: { Authorization: `Basic ${Buffer.from(`${apiKey}:${apiSecret}`).toString("base64")}` },
    cache: "no-store",
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`Cloudinary ${response.status}: ${message.slice(0, 180)}`);
  }

  const body = (await response.json()) as { resources?: unknown };
  if (!Array.isArray(body.resources)) return [];
  return body.resources.flatMap((resource) => {
    const mapped = mapCloudinaryResource(resource as CloudinaryResource);
    return mapped ? [mapped] : [];
  });
}

async function listCloudinaryFolder(folder: string) {
  if (!folder) return [];
  const cached = assetCache.get(folder);
  if (cached && cached.expiresAt > Date.now()) return cached.assets;

  const [fixedFolderAssets, dynamicFolderAssets] = await Promise.all([
    fetchCloudinaryEndpoint("resources/image/upload", {
      prefix: `${folder.replace(/\/$/, "")}/`,
      max_results: "100",
    }).catch(() => []),
    fetchCloudinaryEndpoint("resources/by_asset_folder", {
      asset_folder: folder,
      max_results: "100",
    }).catch(() => []),
  ]);

  const deduplicated = new Map<string, AdminAsset>();
  [...fixedFolderAssets, ...dynamicFolderAssets].forEach((asset) => deduplicated.set(asset.assetId, asset));
  const assets = [...deduplicated.values()].sort((left, right) => left.createdAt.localeCompare(right.createdAt));
  assetCache.set(folder, { assets, expiresAt: Date.now() + ASSET_CACHE_MS });
  return assets;
}

function getOrderFolders(metadataFolder: string, orderId: string) {
  const fallbackBase = `raw-archive-orders/${orderId}`;
  const normalized = metadataFolder.replace(/\/$/, "") || fallbackBase;
  const baseFolder = normalized.endsWith("/temp") ? normalized.slice(0, -5) : normalized;
  return {
    baseFolder,
    originalFolders: Array.from(new Set([normalized, baseFolder, `${baseFolder}/temp`])),
    editedFolder: `${baseFolder}/edited`,
  };
}

async function mapSessionToOrder(session: Stripe.Checkout.Session): Promise<AdminOrder> {
  const metadata = session.metadata ?? {};
  const orderId = metadata.orderId || session.client_reference_id || session.id;
  const folders = getOrderFolders(metadata.cloudinaryFolder || "", orderId);
  const [sourceFolderResults, editedAssets] = await Promise.all([
    Promise.all(folders.originalFolders.map((folder) => listCloudinaryFolder(folder))),
    listCloudinaryFolder(folders.editedFolder),
  ]);

  const editedIds = new Set(editedAssets.map((asset) => asset.assetId));
  const originalMap = new Map<string, AdminAsset>();
  sourceFolderResults.flat().forEach((asset) => {
    const inEditedFolder = asset.folder === folders.editedFolder || asset.publicId.startsWith(`${folders.editedFolder}/`);
    if (!editedIds.has(asset.assetId) && !inEditedFolder) originalMap.set(asset.assetId, asset);
  });

  const photoCount = Number.parseInt(metadata.photoCount || "0", 10) || 0;
  if (originalMap.size === 0 && metadata.assetNamingVersion === "v1") {
    const formats = (metadata.uploadedFormats || "").split(",").filter(Boolean);
    for (let index = 0; index < photoCount; index += 1) {
      const format = formats[index] || "jpg";
      const publicId = `${folders.baseFolder}/temp/original-${String(index + 1).padStart(3, "0")}`;
      const secureUrl = cloudinaryDeliveryUrl(publicId, format);
      if (!secureUrl) continue;
      originalMap.set(publicId, {
        assetId: publicId,
        publicId,
        secureUrl,
        width: 0,
        height: 0,
        bytes: 0,
        format,
        createdAt: new Date(session.created * 1000).toISOString(),
        folder: `${folders.baseFolder}/temp`,
      });
    }
  }

  if (originalMap.size === 0 && metadata.uploadedPreviewUrls) {
    metadata.uploadedPreviewUrls.split("\n").map((url) => url.trim()).filter(Boolean).forEach((secureUrl, index) => {
      originalMap.set(secureUrl, {
        assetId: `${orderId}-preview-${index}`,
        publicId: `${orderId}-preview-${index}`,
        secureUrl,
        width: 0,
        height: 0,
        bytes: 0,
        format: "",
        createdAt: new Date(session.created * 1000).toISOString(),
        folder: folders.baseFolder,
      });
    });
  }

  const consent = metadata.socialMediaConsent;
  return {
    id: orderId,
    sessionId: session.id,
    createdAt: new Date(session.created * 1000).toISOString(),
    clientEmail: session.customer_details?.email || session.customer_email || "",
    photoCount,
    total: (session.amount_total || 0) / 100,
    currency: (session.currency || "usd").toUpperCase(),
    status: parseStatus(metadata.workflowStatus),
    photoNames: (metadata.photoNames || "").split(",").map((name) => name.trim()).filter(Boolean),
    editNotes: metadata.editNotes || "",
    socialMediaConsent: consent === "allow" || consent === "deny" ? consent : "unknown",
    cloudinaryFolder: folders.baseFolder,
    editedFolder: folders.editedFolder,
    originals: [...originalMap.values()],
    editedAssets,
    deliveryUrls: (metadata.deliveryUrls || "").split("\n").map((url) => url.trim()).filter(Boolean),
  };
}

export async function getAdminOrders(): Promise<AdminOrdersResponse> {
  const configuration = getConfiguration();
  const warnings: string[] = [];
  const stripe = getStripe();
  if (!stripe) {
    warnings.push("STRIPE_SECRET_KEY is missing, so paid orders cannot be loaded yet.");
    return { orders: [], configuration, warnings };
  }
  if (!configuration.cloudinary) {
    warnings.push("Cloudinary server credentials are missing. New orders still show every photograph; older orders may show previews only.");
  }

  const sessions = await stripe.checkout.sessions.list({ limit: 100, status: "complete" });
  const paidOrders = sessions.data.filter(
    (session) => session.payment_status === "paid" && Boolean(session.metadata?.orderId),
  );

  const orders: AdminOrder[] = [];
  for (let index = 0; index < paidOrders.length; index += 4) {
    const batch = paidOrders.slice(index, index + 4);
    orders.push(...(await Promise.all(batch.map((session) => mapSessionToOrder(session)))));
  }

  return { orders, configuration, warnings };
}

export async function updateAdminOrder(
  sessionId: string,
  status: AdminOrderStatus,
  deliveryUrls?: string[],
) {
  const stripe = getStripe();
  if (!stripe) throw new Error("STRIPE_SECRET_KEY is missing.");

  await stripe.checkout.sessions.update(sessionId, {
    metadata: {
      workflowStatus: status,
      workflowUpdatedAt: new Date().toISOString(),
      ...(deliveryUrls
        ? { deliveryUrls: deliveryUrls.join("\n").slice(0, 500) }
        : {}),
    },
  });
}
