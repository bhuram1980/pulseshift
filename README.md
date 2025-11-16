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

Copy `env.example` to `.env.local` and fill in your values:

```bash
cp env.example .env.local
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
  ├── layout.tsx          # Root layout with metadata
  ├── page.tsx            # Home page
  ├── facility/
  │   └── page.tsx        # Post a shift form
  └── provider/
      └── page.tsx        # Browse and apply to shifts
```

## 🗄️ Database Schema

- **shifts** - Open locum positions
- **providers** - Healthcare providers (MDs, NPs, PAs, CRNAs)
- **applications** - Provider applications to shifts

## 🚢 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Domain Setup

1. Buy `pulseshift.com` via GoDaddy
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

- ✅ Post shifts (facilities)
- ✅ Browse shifts (providers)
- ✅ One-click applications
- ✅ Real-time shift listings
- ✅ Responsive design
- ✅ AI-ready architecture

## 🎯 Next Steps

- [ ] Add favicon.ico to `/public` directory
- [ ] Add authentication (Supabase Auth)
- [ ] Implement AI matching algorithm
- [ ] Add payment processing
- [ ] Build provider dashboard
- [ ] Build facility dashboard
- [ ] Add email notifications
- [ ] Implement credentialing workflow

## 📄 License

Proprietary - PulseShift.com

