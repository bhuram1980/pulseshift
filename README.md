# PulseShift.com

**Never Miss a Shift. Never Lose a Patient.**

AI-powered locum healthcare staffing platform connecting hospitals/clinics with verified MDs, NPs, PAs, and CRNAs.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to SQL Editor and run the SQL from `supabase-schema.sql`
3. Copy your project URL and anon key from Settings → API

### 3. Configure Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

Update with your Supabase credentials:
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anon/public key
- `SUPABASE_SERVICE_ROLE_KEY` - Your service role key (for admin operations)
- `NEXT_PUBLIC_SITE_URL` - Your production URL (e.g., https://pulseshift.com)
- `NEXT_PUBLIC_GA_ID` - Google Analytics ID (optional)

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
app/
  ├── layout.tsx          # Root layout with metadata, Navbar, Footer
  ├── page.tsx            # Home page with hero section
  ├── components/
  │   ├── Navbar.tsx      # Sticky navigation bar
  │   └── Footer.tsx        # Site footer with links
  ├── facility/
  │   └── page.tsx        # Post a shift form
  └── provider/
      └── page.tsx        # Browse and apply to shifts
lib/
  └── supabase.ts         # Supabase client configuration
public/
  ├── logo.svg            # PulseShift logo with pulse wave
  ├── favicon.svg         # Site favicon (32x32)
  ├── favicon-16x16.svg   # Small favicon
  ├── favicon-32x32.svg   # Standard favicon
  ├── apple-touch-icon.svg # Apple touch icon (180x180)
  ├── site.webmanifest    # PWA manifest
  └── hero-doctor.jpg     # Hero background image (add this)
```

## 🗄️ Database Schema

- **shifts** - Open locum positions
- **providers** - Healthcare providers (MDs, NPs, PAs, CRNAs)
- **applications** - Provider applications to shifts

## 🚢 Deployment

### Vercel (Recommended)

The project is fully configured for Vercel deployment with:
- ✅ Optimized `vercel.json` configuration
- ✅ Security headers
- ✅ Asset caching
- ✅ Environment variable templates

**Quick Deploy:**

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables from `.env.example`
4. Deploy!

📖 **See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.**

### Domain Setup

1. Buy `pulseshift.com` or `pulseshift.health` via GoDaddy
2. Point DNS to Vercel
3. Update `NEXT_PUBLIC_SITE_URL` in environment variables

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 (App Router), Tailwind CSS, Framer Motion
- **Backend**: Supabase (PostgreSQL + Auth)
- **Deploy**: Vercel
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod
- **Analytics**: Vercel Analytics

## 📝 Features

### Current MVP Features
- ✅ Professional logo and branding with pulse wave design
- ✅ Complete favicon set (multiple sizes + Apple touch icon)
- ✅ PWA manifest for mobile installation
- ✅ Sticky navigation with mobile menu
- ✅ Hero section with trust metrics
- ✅ Trust badges (NALTO, HIPAA, Joint Commission)
- ✅ Footer with site links
- ✅ Post shifts (facilities)
- ✅ Browse shifts (providers)
- ✅ One-click applications
- ✅ Real-time shift listings
- ✅ Responsive design
- ✅ SEO optimized with meta tags
- ✅ Vercel deployment ready
- ✅ AI-ready architecture

## 🎯 Next Steps

### Immediate (Required for Full Functionality)

1. **Set Up Supabase Database**
   - Create account at [supabase.com](https://supabase.com)
   - Create new project
   - Run SQL from `supabase-schema.sql` in SQL Editor
   - Copy project URL and anon key

2. **Add Environment Variables to Vercel**
   - Go to Vercel Dashboard → Settings → Environment Variables
   - Add all variables from `.env.example`:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - `SUPABASE_SERVICE_ROLE_KEY`
     - `NEXT_PUBLIC_SITE_URL` (your Vercel URL or custom domain)
     - `NEXT_PUBLIC_GA_ID` (optional)

3. **Add Hero Image**
   - Download a professional doctor/medical image from [Unsplash](https://unsplash.com/s/photos/doctor-tablet)
   - Save as `public/hero-doctor.jpg`
   - Recommended: 1920x1080 or larger
   - See `public/HERO_IMAGE_README.txt` for details

### Domain & Branding

4. **Set Up Custom Domain**
   - Purchase `pulseshift.com` or `pulseshift.health` via GoDaddy
   - In Vercel: Settings → Domains → Add domain
   - Update DNS records as instructed
   - Update `NEXT_PUBLIC_SITE_URL` environment variable

5. **Add Open Graph Image**
   - Create 1200x630px image for social sharing
   - Save as `public/og-image.jpg`
   - Update in `app/layout.tsx` metadata if needed

### Phase 2 Features

6. **Authentication System**
   - Implement Supabase Auth
   - Add login/signup pages
   - Protect facility/provider routes
   - User profiles and dashboards

7. **AI Matching Algorithm**
   - Build matching logic based on:
     - Specialty compatibility
     - Location preferences
     - Availability dates
     - Credential requirements
   - Real-time notifications

8. **Payment Processing**
   - Integrate Stripe or similar
   - Handle 20-30% markup on rates
   - Weekly payment processing
   - Invoice generation

9. **Dashboard Features**
    - Provider dashboard: View applications, earnings, schedule
    - Facility dashboard: Manage shifts, view candidates, accept/reject
    - Analytics and reporting

10. **Email Notifications**
    - New shift matches
    - Application status updates
    - Payment confirmations
    - Use Resend, SendGrid, or similar

11. **Credentialing Workflow**
    - License verification
    - DEA number validation
    - Malpractice insurance checks
    - Automated background checks
    - 48-hour credentialing promise

### Phase 3 Enhancements

- [ ] Mobile app (React Native)
- [ ] SMS notifications (Twilio)
- [ ] Video interviews integration
- [ ] Rating/review system
- [ ] Referral program
- [ ] Multi-state expansion (CA, OH)
- [ ] Advanced analytics dashboard
- [ ] API for third-party integrations

## 📄 License

Proprietary - PulseShift.com

