import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SECRET_KEY!,
);

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    // Get the image record to find the filename
    const { data: image, error: fetchError } = await supabase
      .from("gallery_images")
      .select("url")
      .eq("id", params.id)
      .single();

    if (fetchError) throw fetchError;

    if (image) {
      // Extract filename from URL
      const fileName = image.url.split("/").pop();
      if (fileName) {
        await supabase.storage.from("gallery").remove([fileName]);
      }
    }

    // Delete from database
    const { error: deleteError } = await supabase
      .from("gallery_images")
      .delete()
      .eq("id", params.id);

    if (deleteError) throw deleteError;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting gallery image:", error);
    return NextResponse.json(
      { error: "Failed to delete gallery image" },
      { status: 500 },
    );
  }
}
