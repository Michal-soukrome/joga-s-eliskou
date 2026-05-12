import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SECRET_KEY!,
);

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { data, error } = await supabase
      .from("video_lessons")
      .select("*")
      .eq("id", params.id)
      .single();

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching video lesson:", error);
    return NextResponse.json(
      { error: "Video lesson not found" },
      { status: 404 },
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const body = await req.json();
    const {
      title,
      description,
      video_url,
      thumbnail_url,
      duration_seconds,
    } = body;

    // Only update fields that are provided (partial update)
    const updateData: Record<string, any> = {
      updated_at: new Date(),
    };

    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (video_url !== undefined) updateData.video_url = video_url;
    if (thumbnail_url !== undefined) updateData.thumbnail_url = thumbnail_url;
    if (duration_seconds !== undefined) updateData.duration_seconds = duration_seconds;

    const { data, error } = await supabase
      .from("video_lessons")
      .update(updateData)
      .eq("id", params.id)
      .select();

    if (error) throw error;

    return NextResponse.json(data[0]);
  } catch (error) {
    console.error("Error updating video lesson:", error);
    return NextResponse.json(
      { error: "Failed to update video lesson" },
      { status: 500 },
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const body = await req.json();
    const {
      title,
      description,
      video_url,
      thumbnail_url,
      duration_seconds,
      order_index,
    } = body;

    const { data, error } = await supabase
      .from("video_lessons")
      .update({
        title,
        description,
        video_url,
        thumbnail_url,
        duration_seconds,
        order_index,
        updated_at: new Date(),
      })
      .eq("id", params.id)
      .select();

    if (error) throw error;

    return NextResponse.json(data[0]);
  } catch (error) {
    console.error("Error updating video lesson:", error);
    return NextResponse.json(
      { error: "Failed to update video lesson" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    // Get the video record to find the filename
    const { data: video, error: fetchError } = await supabase
      .from("video_lessons")
      .select("video_url")
      .eq("id", params.id)
      .single();

    if (fetchError) throw fetchError;

    if (video) {
      // Extract filename from URL
      const fileName = video.video_url.split("/").pop();
      if (fileName) {
        await supabase.storage.from("videos").remove([fileName]);
      }
    }

    // Delete from database
    const { error: deleteError } = await supabase
      .from("video_lessons")
      .delete()
      .eq("id", params.id);

    if (deleteError) throw deleteError;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting video lesson:", error);
    return NextResponse.json(
      { error: "Failed to delete video lesson" },
      { status: 500 },
    );
  }
}
