# Admin Dashboard - Setup & Deployment Guide

## 🎯 What Was Built

You now have a complete client content management system for:

1. **Gallery Images** - Add/edit/delete gallery photos
2. **Online Video Lessons** - Add/edit/delete video lessons

### Credentials

- **Login URL:** `/admin/login`
- **Username:** `eliska`
- **Password:** `hugo`
- **Gallery Dashboard:** `/dashboard`
- **Videos Dashboard:** `/dashboard/videos`

---

## 🚀 Setup Steps

### 1. Create Supabase Storage Bucket

1. Go to your Supabase dashboard
2. Click **Storage** in the left sidebar
3. Click **Create a new bucket**
4. Name it: `gallery`
5. Set to **Public** (so images are publicly accessible)
6. Click **Create bucket**

### 2. Create Supabase Tables

Go to your Supabase dashboard and run these SQL commands in the SQL Editor:

#### Gallery Images Table

```sql
CREATE TABLE gallery_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  url TEXT NOT NULL,
  alt TEXT,
  title TEXT,
  order_index INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read" ON gallery_images
  FOR SELECT
  USING (true);

CREATE POLICY "Allow all operations" ON gallery_images
  USING (true);

CREATE INDEX idx_gallery_images_order_index ON gallery_images(order_index);
```

#### Video Lessons Table

```sql
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

ALTER TABLE video_lessons ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read" ON video_lessons
  FOR SELECT
  USING (true);

CREATE POLICY "Allow all operations" ON video_lessons
  USING (true);

CREATE INDEX idx_video_lessons_order_index ON video_lessons(order_index);
```

### 2. Environment Variables

Your `.env.local` is already configured:

```
NEXT_PUBLIC_SUPABASE_URL=https://rqobwouuaembptuoybwm.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-key>
NEXT_PUBLIC_ADMIN_USERNAME=eliska
NEXT_PUBLIC_ADMIN_PASSWORD=hugo
```

### 3. Test Locally

```bash
npm run dev
```

- Login: http://localhost:3000/admin/login
- Gallery: http://localhost:3000/dashboard
- Videos: http://localhost:3000/dashboard/videos

---

## 📁 File Structure

```
src/
├── app/
│   ├── admin/
│   │   └── login/page.tsx          # Login page
│   ├── dashboard/
│   │   ├── page.tsx                 # Gallery (file upload form)
│   │   └── videos/page.tsx          # Videos management
│   ├── api/
│   │   ├── gallery/
│   │   │   ├── route.ts             # GET/POST (file upload to storage)
│   │   │   └── [id]/route.ts        # DELETE (removes from storage + DB)
│   │   └── videos/
│   │       ├── route.ts             # GET/POST
│   │       └── [id]/route.ts        # GET/PUT/DELETE
│   └── layout.tsx                   # Updated with AuthProvider
├── components/
│   ├── Gallery.tsx                  # Loads from Supabase
│   └── OnlineVideos.tsx             # Public video display
├── context/
│   └── AuthContext.tsx              # Hardcoded auth
└── lib/
    └── supabase.ts                  # Supabase client
```

---

## 🎬 How to Use

### Adding Gallery Images

1. Go to `/dashboard`
2. Login with `eliska` / `hugo`
3. **Nahrát obrázek** form on left:
   - Click file input and select image from your computer
   - Add alt text (for SEO) - optional
   - Add image name - optional
   - Click "Nahrát"
4. Image uploads to Supabase Storage and appears instantly!

**Supported formats:** JPG, PNG, WebP, GIF (any image type)

### Adding Video Lessons

1. Go to `/dashboard/videos`
2. Login with `eliska` / `hugo`
3. Fill in video details:
   - **Název lekce** - Lesson name
   - **Popis** - Description (optional)
   - **URL videa** - Video embed URL (YouTube, Vimeo, etc.)
   - **URL náhledu** - Thumbnail image (optional)
   - **Délka videa** - Duration in seconds (optional)
4. Click "Přidat"

**Video URL Examples:**

- YouTube: `https://www.youtube.com/embed/VIDEO_ID`
- Vimeo: `https://player.vimeo.com/video/VIDEO_ID`
- Custom (HLS): `https://your-domain.com/videos/lesson.m3u8`

---

## 🚢 Deployment to Vercel

### 1. Add Environment Variables to Vercel

In your Vercel dashboard (Project → Settings → Environment Variables):

```
NEXT_PUBLIC_SUPABASE_URL=https://rqobwouuaembptuoybwm.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key-here
NEXT_PUBLIC_ADMIN_USERNAME=eliska
NEXT_PUBLIC_ADMIN_PASSWORD=hugo
```

### 2. Deploy

```bash
git add .
git commit -m "Add file upload to gallery CMS"
git push
```

Vercel will automatically detect changes and deploy.

### 3. Access Dashboard

- Production Login: `https://yourdomain.com/admin/login`
- Production Gallery: `https://yourdomain.com/dashboard`
- Production Videos: `https://yourdomain.com/dashboard/videos`

---

## 🔒 Security Notes

**Current Setup:**

- Hardcoded credentials (OK for single admin user)
- Public database read access (videos/images visible to everyone)
- Anon key only (no backend authentication)

**For Multiple Users (Future):**
Consider migrating to Supabase Auth or NextAuth.js

**To Protect Videos:**
Add row-level security policies to require authentication for video access

---

## 📊 API Endpoints

### Gallery

- `GET /api/gallery` - List all images
- `POST /api/gallery` - Create image
- `PUT /api/gallery/[id]` - Update image
- `DELETE /api/gallery/[id]` - Delete image

### Videos

- `GET /api/videos` - List all videos
- `POST /api/videos` - Create video
- `PUT /api/videos/[id]` - Update video
- `DELETE /api/videos/[id]` - Delete video

---

## 🎯 Next Steps

1. ✅ Create Supabase tables (SQL commands above)
2. ✅ Test locally with `npm run dev`
3. ✅ Add first gallery images
4. ✅ Add first video lessons
5. ✅ Deploy to Vercel
6. ✅ Share `/admin/login` with Eliška
7. (Optional) Update videos page on main site

---

## 🆘 Troubleshooting

### "Failed to fetch gallery images"

- Check Supabase table was created
- Check environment variables in `.env.local`
- Verify table name: `gallery_images`

### "Invalid username or password"

- Check credentials in `.env.local`
- Ensure variables start with `NEXT_PUBLIC_`
- Restart dev server after changing .env

### Videos not showing up

- Create `video_lessons` table in Supabase
- Check table RLS policies allow public read
- Verify order_index values are set

### Image thumbnails not loading

- Check image URL is publicly accessible
- Test URL directly in browser
- Consider using image CDN (Cloudinary, Imgix)

---

## 📞 Questions?

Check these files for implementation details:

- [/src/app/dashboard/page.tsx](/src/app/dashboard/page.tsx) - Gallery manager
- [/src/app/dashboard/videos/page.tsx](/src/app/dashboard/videos/page.tsx) - Videos manager
- [/src/context/AuthContext.tsx](/src/context/AuthContext.tsx) - Authentication logic
- [/src/components/Gallery.tsx](/src/components/Gallery.tsx) - Public gallery display
- [/src/components/OnlineVideos.tsx](/src/components/OnlineVideos.tsx) - Public videos display
