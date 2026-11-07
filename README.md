# TTB Corporate Website

The TTB website uses Next.js, TypeScript, and Tailwind CSS. Admin edits are stored in Supabase and published to all visitors.

## Architecture

- Next.js 16 App Router and TypeScript
- Supabase Postgres for shared website content
- Supabase Storage for uploaded public website images
- Server-side admin API routes; no static export
- Admin editors for site pages, including the privacy policy

## Local Development

Requirements: Node.js 20+ and npm 9+.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. To use the admin or load shared content, configure Supabase and the admin environment variables below. Run checks with `npm run lint` and `npm run build`.

## Shared Content and Admin Setup

1. Create a Supabase project.
2. Run [`supabase/schema.sql`](./supabase/schema.sql) in the Supabase SQL Editor. It creates the content table and a public-read `site-media` bucket. Only the server can upload images.
3. Copy `.env.example` to `.env.local` and set:
   - `NEXT_PUBLIC_SUPABASE_URL`: the Supabase project URL.
   - `SUPABASE_SERVICE_ROLE_KEY`: the service-role key from Supabase API settings. Keep it secret; never use a `NEXT_PUBLIC_` prefix.
   - `ADMIN_PASSWORD`: a long, unique admin password.
   - `ADMIN_SESSION_SECRET`: a random secret of at least 32 characters. Generate one with `node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"`.
   - `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, and `SMTP_PASSWORD`: the cPanel mailbox SMTP settings for the contact form. Use the mailbox password, not the hosting account password.
4. Restart the dev server and sign in at `/admin/`. Edits are saved centrally; images are uploaded to Supabase Storage. If publishing fails, the admin reports an error instead of treating local changes as published.
5. Add the same server variables to the hosting provider's private environment. Never expose SMTP credentials with a `NEXT_PUBLIC_` prefix.

The first admin edit publishes the bundled default content if the database is empty. Edits saved by the previous browser-only version are not automatically transferred. Export them from that version before replacing it, then use **Backup & Sync → Import Content Backup**.

The Supabase service-role key and admin credentials must only exist in server environment variables. Do not commit `.env.local`, expose the service key in client code, or send credentials in chat.

## Contact Form

The contact form sends inquiries from the server through the `info@ttb.org.pk` cPanel mailbox using SMTP. For Hostinger email, use `smtp.hostinger.com` on port `465`, the full mailbox address as `SMTP_USER`, and that mailbox's password as `SMTP_PASSWORD`. Set these in `.env.local` for local development and in the hosting provider's private server environment for deployment. Never put SMTP credentials in client-side variables or send them in chat. Restart the dev server after changing `.env.local`.

## Deployment

### Vercel

Import the repository as a Next.js project, keep the default build settings, configure all four environment variables in **Project Settings → Environment Variables**, and deploy. Supabase provides persistent shared data and media storage.

### Hostinger

This project requires a Node.js-capable Hostinger app plan or VPS. Static-only shared hosting that serves files from `public_html` cannot run the admin API or publish shared edits. Deploy the Next.js app, configure the four server environment variables, and run:

```bash
npm install
npm run build
npm run start
```

Enable SSL and set `siteConfig.siteUrl` in `src/content/company.ts` to the production domain.

## Source Content

Bundled defaults and site metadata are in `src/content/`. The admin interface edits the published copy stored in Supabase.
