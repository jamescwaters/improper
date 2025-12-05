-- Run this SQL in your Supabase SQL Editor to create the signups table

CREATE TABLE IF NOT EXISTS signups (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  zip_code TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_signups_email ON signups(email);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_signups_created_at ON signups(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE signups ENABLE ROW LEVEL SECURITY;

-- Create policy to allow service role to insert (for API routes)
CREATE POLICY "Allow service role to insert signups"
  ON signups
  FOR INSERT
  TO service_role
  WITH CHECK (true);

-- Create policy to allow service role to read signups
CREATE POLICY "Allow service role to read signups"
  ON signups
  FOR SELECT
  TO service_role
  USING (true);

-- Create policy to allow anon users to read count only (for public display)
CREATE POLICY "Allow anon to read signup count"
  ON signups
  FOR SELECT
  TO anon
  USING (true);

