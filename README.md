# TTB Corporate Website

> Production-quality corporate website for **TTB**, developed by **Motion Studio**.  
> Engineered with Next.js App Router, TypeScript, and Tailwind CSS. Fully static-export compatible for **Hostinger Single** shared hosting and preview deployments on **Vercel**.

---

## 1. Architecture & Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript (strict mode enabled)
- **Styling**: Tailwind CSS v4 with custom corporate design system
- **Icons**: Lucide React
- **Output Mode**: Static Export (`output: 'export'`, `trailingSlash: true`, `images: { unoptimized: true }`)
- **Hosting Target**: Permanent hosting on **Hostinger Single** (`public_html`) and preview environments on **Vercel**

---

## 2. Directory Structure

```
ttb/
├── public/                     # Static root assets (favicon, images, logos)
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── layout.tsx          # Master layout (SEO metadata, Navbar, Footer)
│   │   ├── page.tsx            # Page 1: Homepage (/)
│   │   ├── about-us/           # Page 2: About Us (/about-us/)
│   │   ├── our-values/         # Page 3: Our Values (/our-values/)
│   │   ├── services/           # Page 4: Services (/services/)
│   │   ├── projects/           # Page 5: Projects (/projects/)
│   │   ├── clients/            # Page 6: Our Clients (/clients/)
│   │   ├── careers/            # Page 7: Careers (/careers/)
│   │   ├── contact-us/         # Page 8: Contact Us (/contact-us/)
│   │   ├── privacy-policy/     # Optional: Privacy Policy (/privacy-policy/)
│   │   ├── not-found.tsx       # Custom 404 page
│   │   └── globals.css         # Theme tokens & base styling
│   ├── components/
│   │   ├── layout/             # Reusable Navbar & Footer
│   │   ├── sections/           # Modular section components
│   │   │   ├── Hero.tsx
│   │   │   ├── ServiceCard.tsx
│   │   │   ├── ProjectCard.tsx
│   │   │   ├── ValueCard.tsx
│   │   │   ├── ClientLogoGrid.tsx
│   │   │   └── ContactForm.tsx
│   │   └── ui/                 # Atomic UI (Button, Badge, Container, SectionHeader, IconHelper)
│   ├── content/                # Central data files (Easy client edits)
│   │   ├── company.ts          # Brand information, address, phone, metadata
│   │   ├── services.ts         # Service portfolios, descriptions, capabilities
│   │   ├── projects.ts         # Portfolio items, case studies, deliverables
│   │   ├── values.ts           # Corporate governance values & descriptions
│   │   ├── clients.ts          # Client list & verification placeholders
│   │   ├── careers.ts          # Culture, employee benefits, open talent pipeline
│   │   └── contact.ts          # Form gateway endpoint & contact details
│   └── types/                  # TypeScript data interfaces
├── next.config.ts              # Static export & Turbopack configurations
└── package.json
```

---

## 3. Local Development & Build

### Prerequisites
- Node.js `v18.18+` or `v20+` (tested on Node v26)
- npm `v9+` or `v10+`

### Installation
```bash
npm install
```

### Run Local Development Server
```bash
npm run dev
```
Open `http://localhost:3000` in your web browser.

### Run Code Quality & Lint Checks
```bash
npm run lint
```

### Produce Static Production Export
```bash
npm run build
```
This generates the standalone static distribution in the `out/` directory.

---

## 4. How to Update Content & Placeholders

All business data is separated from UI components into `src/content/`:

1. **Company Information & Address**:
   - Edit `src/content/company.ts` to update official email, phone numbers, registered corporate headquarters, and SEO metadata.
2. **Services & Offerings**:
   - Edit `src/content/services.ts` to add, update, or remove service lines and capabilities.
3. **Projects & Case Studies**:
   - Edit `src/content/projects.ts` to update project descriptions, deliverables, or statuses.
4. **Corporate Values**:
   - Edit `src/content/values.ts` to refine guiding principles.
5. **Clients & Approved Trademarks**:
   - Edit `src/content/clients.ts` to replace placeholder slots with verified corporate client names once legal release is granted.
6. **Careers & Opportunities**:
   - Edit `src/content/careers.ts` to publish specific job requisitions or update HR contact addresses.

---

## 5. Contact Form Configuration

The contact form is built for 100% static hosting compatibility without requiring a Node.js backend.

In `src/content/contact.ts`:
```typescript
export const contactConfig = {
  // Option A: External Form Gateway (e.g. Formspree, Web3Forms, Getform)
  formEndpoint: "https://formspree.io/f/your-form-id",
  formServiceConfigured: true,

  // Option B: Direct Email Dispatch (Default Fallback)
  // If formEndpoint is empty or formServiceConfigured is false, the form automatically
  // routes inquiries into the user's default email client addressed to companyData.email.
};
```
*Note: No private API keys or database credentials are exposed to the browser.*

---

## 6. Deployment Guide

### A. Vercel (Development & Preview Deployment)
1. Push your repository to GitHub.
2. Log into [Vercel](https://vercel.com) and click **"New Project"**.
3. Import the GitHub repository `ttb`.
4. Keep the Framework Preset as **Next.js**.
5. Build Command: `npm run build`
6. Output Directory: `out` (automatically detected with `output: 'export'`).
7. Click **Deploy**. Vercel will build and serve your static preview site.

---

### B. Hostinger Single (Permanent Production Deployment)

Hostinger Single shared hosting serves static websites directly from the `public_html` directory:

1. **Generate the Static Export Locally or via CI**:
   ```bash
   npm run build
   ```
2. **Verify the Export Directory**:
   Confirm that the `out/` directory was created and contains:
   - `index.html`
   - `about-us/index.html`
   - `services/index.html`
   - `our-values/index.html`
   - `projects/index.html`
   - `clients/index.html`
   - `careers/index.html`
   - `contact-us/index.html`
   - `privacy-policy/index.html`
   - `_next/` directory (containing static JS and CSS)
   - `favicon.ico`
3. **Connect to Hostinger**:
   - Open **Hostinger hPanel** -> **File Manager** (or connect via SFTP / FileZilla using your Hostinger FTP credentials).
   - Navigate to `/public_html` for your target domain.
4. **Upload Files**:
   - Upload the **contents** of the `out/` folder directly into `public_html`.
   - *Important*: Do not upload the folder named `out` itself; upload all files and subfolders *inside* `out/` directly into `public_html`.
5. **Verify Routing & Direct URLs**:
   - Because `trailingSlash: true` is configured in Next.js, direct links like `https://yourdomain.com/about-us/` will automatically find and load `public_html/about-us/index.html` on any Apache / LiteSpeed web server without special server configuration.
6. **Custom Domain & SSL**:
   - In Hostinger hPanel, navigate to **Domains** -> select your domain -> ensure SSL (Let's Encrypt) is activated.
   - Update `siteConfig.siteUrl` in `src/content/company.ts` to match your verified permanent domain name.

---

## 7. Quality Assurance Checklist

- [x] Static build completes cleanly (`npm run build`).
- [x] Static `out/` directory generated with all 8 pages + 404 + Privacy Policy.
- [x] ESLint runs with zero errors and zero warnings (`npm run lint`).
- [x] No Node.js runtime or server execution required in production.
- [x] Trailing-slash URL structure matches shared hosting static directory lookup.
- [x] Honest disclosures and editable placeholders for pending TTB data.
- [x] Responsive layout tested for mobile, tablet, and desktop viewports.
- [x] Keyboard navigation and accessible focus indicators implemented.

---

## 8. Credits

- **Client**: TTB Corporate Group
- **Design & Development**: Motion Studio
