# Deploying PulseShift to Vercel

## Prerequisites

- GitHub account
- Vercel account (sign up at https://vercel.com)
- Supabase project with credentials

## Deployment Steps

### 1. Push to GitHub

Ensure your code is pushed to a GitHub repository:

```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

### 2. Import Project to Vercel

1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Select your PulseShift repository
4. Vercel will automatically detect Next.js

### 3. Configure Environment Variables

In the Vercel project settings, add the following environment variables:

**Required:**
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY` - Your Supabase service role key
- `NEXT_PUBLIC_SITE_URL` - Your production URL (e.g., https://pulseshift.health)

**Optional:**
- `NEXT_PUBLIC_GA_ID` - Google Analytics ID

You can find these values in your `.env.local` file (do not commit this file).

### 4. Deploy

1. Click "Deploy"
2. Vercel will build and deploy your application
3. You'll receive a deployment URL

### 5. Custom Domain (Optional)

1. Go to your Vercel project settings
2. Navigate to "Domains"
3. Add your custom domain (e.g., pulseshift.health)
4. Follow DNS configuration instructions

## Build Configuration

The project is configured with:

- **Framework:** Next.js 15
- **Build Command:** `npm run build`
- **Output Directory:** `.next` (automatically configured)
- **Install Command:** `npm install`

## Vercel Configuration

The `vercel.json` file includes:

- Security headers (X-Frame-Options, CSP, etc.)
- Cache headers for static assets
- Optimized caching for favicons and images

## Post-Deployment

After deployment:

1. Verify all environment variables are set correctly
2. Test the application functionality
3. Check favicon and metadata rendering
4. Verify Supabase connectivity
5. Enable Vercel Analytics (already integrated via `@vercel/analytics`)

## Troubleshooting

### Build Failures

- Check build logs in Vercel dashboard
- Verify all environment variables are set
- Ensure dependencies are listed in `package.json`

### Environment Variable Issues

- Make sure `NEXT_PUBLIC_*` prefix is used for client-side variables
- Redeploy after adding/updating environment variables

### Domain Configuration

- DNS propagation can take up to 48 hours
- Verify DNS records are correctly configured
- Use Vercel's nameservers for easier configuration

## Continuous Deployment

Vercel automatically deploys:

- **Production:** Pushes to `main` branch
- **Preview:** Pull requests and other branches

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Supabase Environment Variables](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
