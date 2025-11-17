# Email & Resume Upload Implementation Guide

This guide walks you through setting up the new email notifications and resume upload features for PulseShift.

## Overview

**New Features:**
- ✅ Email confirmations for shift postings (facilities)
- ✅ Email confirmations for provider applications
- ✅ Email notifications to facilities when providers apply
- ✅ Resume/CV upload for providers
- ✅ Secure storage of resumes in Supabase Storage

## Prerequisites

- Existing PulseShift installation with Supabase configured
- [Resend](https://resend.com) account (free tier available)
- Access to Supabase Dashboard

---

## Step 1: Install Dependencies

```bash
npm install resend
```

---

## Step 2: Set Up Resend

1. **Create Resend Account**
   - Go to [resend.com](https://resend.com) and sign up
   - Verify your email address

2. **Get API Key**
   - In Resend Dashboard, go to "API Keys"
   - Create a new API key
   - Copy the key (starts with `re_`)

3. **Add Domain (Optional but Recommended)**
   - Go to "Domains" in Resend Dashboard
   - Add your domain: `pulseshift.health`
   - Follow DNS verification steps
   - Once verified, emails will be from `noreply@pulseshift.health`
   - **Note:** Without domain verification, you can still send emails from `onboarding@resend.dev`

4. **Update Environment Variables**

   Add to `.env.local`:
   ```bash
   RESEND_API_KEY=re_your_actual_api_key_here
   ```

   Add to Vercel (Production):
   - Go to Vercel Dashboard → Settings → Environment Variables
   - Add: `RESEND_API_KEY` = `re_your_actual_api_key_here`

---

## Step 3: Set Up Supabase Storage

### 3.1 Create Storage Bucket

1. Go to Supabase Dashboard → Storage
2. Click "Create Bucket"
3. Configure:
   - **Name:** `resumes`
   - **Public:** ❌ Uncheck (keep private)
   - **File size limit:** 5MB
   - **Allowed MIME types:** `application/pdf`
4. Click "Create Bucket"

### 3.2 Set Up RLS Policies

Go to SQL Editor and run:

```sql
-- Allow authenticated users to upload their own resumes
create policy "Users can upload their own resumes"
on storage.objects for insert
with check (bucket_id = 'resumes');

-- Allow authenticated users to view their own resumes
create policy "Users can view their own resumes"
on storage.objects for select
using (bucket_id = 'resumes');

-- Allow authenticated users to update their own resumes
create policy "Users can update their own resumes"
on storage.objects for update
using (bucket_id = 'resumes');

-- Allow authenticated users to delete their own resumes
create policy "Users can delete their own resumes"
on storage.objects for delete
using (bucket_id = 'resumes');
```

### 3.3 Update Database Schema

If you already have the `providers` table, run:

```sql
alter table providers add column if not exists resume_url text;
```

If you're creating from scratch, the updated schema is in `supabase-schema.sql`.

---

## Step 4: Test Locally

1. **Start Development Server**
   ```bash
   npm run dev
   ```

2. **Test Facility Shift Posting**
   - Go to `http://localhost:3000/facility`
   - Fill out the form including your email
   - Submit
   - Check your email for confirmation

3. **Test Provider Application**
   - Go to `http://localhost:3000/provider`
   - Click "Apply Now" on a shift
   - Fill out form with:
     - Your email
     - Name
     - Specialty
     - Upload a test PDF resume
   - Submit
   - Check your email for confirmation
   - Verify resume uploaded to Supabase Storage

---

## Step 5: Deploy to Production

1. **Update Environment Variables in Vercel**
   ```
   RESEND_API_KEY=re_your_actual_api_key_here
   ```

2. **Commit and Push Changes**
   ```bash
   git add .
   git commit -m "Add email notifications and resume upload"
   git push origin main
   ```

3. **Verify Deployment**
   - Wait for Vercel deployment to complete
   - Test both forms in production
   - Check emails are being sent

---

## Troubleshooting

### Emails Not Sending

1. **Check API Key:**
   - Verify `RESEND_API_KEY` is set correctly in environment variables
   - Check for typos or extra spaces
   - Restart dev server after adding env variables

2. **Check Resend Dashboard:**
   - Go to Resend Dashboard → Logs
   - Look for failed email attempts
   - Check error messages

3. **Domain Verification:**
   - If using custom domain, ensure DNS records are verified
   - Use `onboarding@resend.dev` if domain not yet verified

### Resume Upload Failing

1. **Check Storage Bucket:**
   - Verify bucket name is exactly `resumes`
   - Check bucket is created and accessible

2. **Check RLS Policies:**
   - Run the SQL policy statements again
   - Verify policies exist in Storage settings

3. **File Size/Type:**
   - Ensure file is PDF format
   - Check file is under 5MB

4. **Supabase Credentials:**
   - Verify `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are correct
   - Check Supabase project is active

### API Route Errors

1. **Check Server Logs:**
   - Look at terminal for API route errors
   - Check Vercel logs in production

2. **Verify File Paths:**
   - Ensure all API routes are in `app/api/` directory
   - Check imports are correct

---

## Cost Estimates

### Resend (Email Service)
- **Free Tier:** 100 emails/day, 3,000 emails/month
- **Paid Plans:** Start at $20/month for 50,000 emails
- **Recommended:** Start with free tier, upgrade as needed

### Supabase Storage
- **Free Tier:** 1GB storage
- **Paid Plans:** $0.021/GB/month after free tier
- **Average resume:** ~200KB
- **Free tier holds:** ~5,000 resumes

---

## Email Templates

Email templates are in the API routes and can be customized:

- **Facility Confirmation:** `app/api/send-shift-confirmation/route.ts`
- **Provider Confirmation:** `app/api/send-application-confirmation/route.ts`

To customize, edit the HTML in the respective files.

---

## Security Considerations

1. **Resumes are Private:**
   - Stored in private Supabase bucket
   - Only accessible with valid authentication
   - RLS policies prevent unauthorized access

2. **Email Rate Limiting:**
   - Resend has built-in rate limiting
   - Consider adding application-level rate limiting for production

3. **File Validation:**
   - Only PDFs are accepted
   - 5MB file size limit enforced
   - Consider adding virus scanning for production

---

## Next Steps

After implementation:

1. **Monitor Email Delivery:**
   - Check Resend dashboard regularly
   - Monitor bounce rates
   - Update email templates based on feedback

2. **Test Resume Access:**
   - Build admin dashboard to view applications
   - Add download functionality for resumes
   - Implement resume preview

3. **Add Features:**
   - Email templates with better branding
   - SMS notifications (Twilio)
   - Calendar invites for shifts
   - Automated follow-ups

---

## Support

- **Resend Docs:** [resend.com/docs](https://resend.com/docs)
- **Supabase Storage:** [supabase.com/docs/guides/storage](https://supabase.com/docs/guides/storage)
- **PulseShift Issues:** Create issue in GitHub repo

---

## Summary Checklist

- [ ] Install `resend` package
- [ ] Create Resend account and get API key
- [ ] Add `RESEND_API_KEY` to environment variables
- [ ] Create `resumes` storage bucket in Supabase
- [ ] Run SQL to add RLS policies
- [ ] Update `providers` table with `resume_url` column
- [ ] Test facility form email confirmation
- [ ] Test provider application with resume upload
- [ ] Deploy to production
- [ ] Verify emails working in production
- [ ] Monitor Resend dashboard

All done! 🎉
