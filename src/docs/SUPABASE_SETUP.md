# Supabase Setup Guide

## Database Schema

Run these SQL commands in your Supabase SQL Editor to create the required tables:

### Gallery Images Table

```sql
-- Create gallery_images table
CREATE TABLE gallery_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  url TEXT NOT NULL,
  alt TEXT,
  title TEXT,
  order_index INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read" ON gallery_images
  FOR SELECT
  USING (true);

-- Create policy to allow authenticated users to perform all operations
CREATE POLICY "Allow authenticated all operations" ON gallery_images
  FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Create index for ordering
CREATE INDEX idx_gallery_images_order_index ON gallery_images(order_index);
```

### Video Lessons Table

```sql
-- Create video_lessons table
CREATE TABLE video_lessons (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  video_url TEXT NOT NULL,
  thumbnail_url TEXT,
  duration_seconds INTEGER,
  order_index INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS
ALTER TABLE video_lessons ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read" ON video_lessons
  FOR SELECT
  USING (true);

-- Create policy to allow authenticated users to perform all operations
-- NOTE: API routes use SUPABASE_SECRET_KEY which bypasses RLS,
-- so these policies mainly apply to client-side operations
CREATE POLICY "Allow authenticated all operations" ON video_lessons
  FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Create index for ordering
CREATE INDEX idx_video_lessons_order_index ON video_lessons(order_index);
```

## Fixing RLS Policies (Drop Old, Add New)

Run this SQL to fix the existing RLS policies:

```sql
-- DROP old incorrect policies
DROP POLICY IF EXISTS "Allow all operations" ON gallery_images;
DROP POLICY IF EXISTS "Allow all operations" ON video_lessons;

-- CREATE new authenticated policies for gallery_images
CREATE POLICY "Allow authenticated all operations" ON gallery_images
  FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- CREATE new authenticated policies for video_lessons
CREATE POLICY "Allow authenticated all operations" ON video_lessons
  FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');
```

## Steps

1. Go to your Supabase dashboard: https://app.supabase.com
2. Select your project "rqobwouuaembptuoybwm"
3. Click "SQL Editor" in the left sidebar
4. Create a new query
5. Copy and paste the SQL above to fix RLS policies
6. Click "Run"
7. Done! Your policies are now correctly configured

## Environment Variables

Your `.env.local` already contains:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_ADMIN_USERNAME`
- `NEXT_PUBLIC_ADMIN_PASSWORD`

## Accessing the Admin Dashboard

- Login URL: `http://localhost:3000/admin` (dev) or `/admin` (production)
- Username: `hugo`
- Password: `hugo`
- Dashboard: `/dashboard`
