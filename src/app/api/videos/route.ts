import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import { getYouTubeId, getYouTubeThumbnail } from "@/lib/youtubeUtils";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

export async function GET(req: NextRequest) {
  try {
    const { data, error } = await supabase
      .from("video_lessons")
      .select("*")
      .order("order_index", { ascending: true });

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching video lessons:", error);
    return NextResponse.json(
      { error: "Failed to fetch video lessons" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const video_url_input = formData.get("video_url") as string | null;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const thumbnail_url = formData.get("thumbnail_url") as string;
    const duration_seconds = formData.get("duration_seconds") as string;
    const order_index = parseInt(formData.get("order_index") as string);

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    let video_url: string;

    // Handle file upload
    if (file) {
      const fileName = `${Date.now()}-${file.name}`;
      const buffer = await file.arrayBuffer();

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("videos")
        .upload(fileName, buffer, {
          contentType: file.type,
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: urlData } = supabase.storage
        .from("videos")
        .getPublicUrl(fileName);

      video_url = urlData.publicUrl;
    } else if (video_url_input) {
      // Use provided URL (YouTube, Vimeo, etc.)
      video_url = video_url_input;
    } else {
      return NextResponse.json(
        { error: "Either file or video URL is required" },
        { status: 400 },
      );
    }

    // Auto-generate thumbnail for YouTube videos if not provided
    let final_thumbnail_url = thumbnail_url;
    if (!final_thumbnail_url && video_url_input) {
      const youtubeId = getYouTubeId(video_url_input);
      if (youtubeId) {
        final_thumbnail_url = getYouTubeThumbnail(youtubeId);
      }
    }

    // Save to database
    const { data, error } = await supabase
      .from("video_lessons")
      .insert([
        {
          title,
          description: description || null,
          video_url,
          thumbnail_url: final_thumbnail_url || null,
          duration_seconds: duration_seconds
            ? parseInt(duration_seconds)
            : null,
          order_index,
        },
      ])
      .select();

    if (error) throw error;

    return NextResponse.json(data[0]);
  } catch (error) {
    console.error("Error creating video lesson:", error);
    return NextResponse.json(
      { error: "Failed to create video lesson" },
      { status: 500 },
    );
  }
}
