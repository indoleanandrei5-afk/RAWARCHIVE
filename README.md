This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

### Quick setup

1. Connect this GitHub repo to Vercel.
2. Select the `raw-archive` project.
3. Deploy the default settings.

### Custom domain

If you own a domain like `rawarchive.com`, add it in the Vercel Dashboard under `Domains`.

1. Go to the Vercel project settings.
2. Click `Domains` and add `rawarchive.com` (or another domain with `rawarchive`).
3. Follow the DNS instructions to point the domain to Vercel.

Once the domain is verified, your site will be live on that custom domain.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Client upload storage setup

Client photos are uploaded directly to Cloudinary from the upload page before Stripe checkout.

Add these environment variables in Vercel and locally in `.env.local`:

```bash
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_unsigned_upload_preset
```

After setup, uploaded files can be found in your Cloudinary Media Library under folders:

`raw-archive-orders/<order-id>`

## Payment success email notifications

When Stripe checkout completes, the app can send you an email with order details and upload folder info.

Add these environment variables:

```bash
STRIPE_WEBHOOK_SECRET=whsec_...
RESEND_API_KEY=re_...
NOTIFY_TO_EMAIL=you@yourdomain.com
NOTIFY_FROM_EMAIL=orders@yourdomain.com
NEXT_PUBLIC_SITE_URL=https://www.rawarchivephotos.com
```

Configure Stripe webhook endpoint:

- Endpoint URL: `https://www.rawarchivephotos.com/api/stripe/webhook`
- Event to send: `checkout.session.completed`

Notes:

- `NOTIFY_FROM_EMAIL` should be a verified sender for your Resend account.
- If email vars are missing, checkout still works and uploads are still stored.
