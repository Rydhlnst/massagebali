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

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Massage Bali content dashboard

The public site is configured for Massage Bali, Canggu, Bali, with home-service massage only and WhatsApp booking at 082326348577.

Set up the connected catalog:

1. Copy `.env.example` to `.env.local`.
2. Add your Neon connection string as `DATABASE_URL`.
3. Set a private `ADMIN_DASHBOARD_TOKEN`.
4. Run `npm run db:push` to create the `products` and `site_settings` tables.
5. Open `/dashboard`, enter the same admin token, and edit the pricelist or homepage settings.

The dashboard writes through Zod-validated API routes. Without `DATABASE_URL`, the site runs in preview mode with the supplied sample pricelist and does not allow mutations.

### R2 media uploads

The secured `POST /api/admin/media` route accepts image files up to 8 MB and uploads them to Cloudflare R2 using the server-only credentials in `.env.local`. It requires the same `x-admin-token` header as other dashboard mutations.

AI-generated image assets require `OPENAI_API_KEY`; that key is intentionally not committed or requested in chat.
