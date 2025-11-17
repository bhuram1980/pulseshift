-- Create Storage Bucket for Resumes
-- Run this in Supabase SQL Editor after creating the bucket in Storage UI

-- 1. First, create the bucket via Supabase Dashboard:
--    - Go to Storage → Create Bucket
--    - Name: "resumes"
--    - Public: false (keep private)
--    - File size limit: 5MB
--    - Allowed MIME types: application/pdf

-- 2. Then run this SQL to set up RLS policies:

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

-- Migration: Add resume_url column to existing providers table
-- Run this if you already have the providers table created
alter table providers add column if not exists resume_url text;
