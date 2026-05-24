import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SECRET_KEY!,
);

export async function POST(req: NextRequest) {
  try {
    const { order } = await req.json();

    if (!Array.isArray(order)) {
      return NextResponse.json(
        { error: "Invalid order format" },
        { status: 400 },
      );
    }

    // Update each video's order_index
    for (const item of order) {
      const { error } = await supabase
        .from("video_lessons")
        .update({ order_index: item.order_index, updated_at: new Date() })
        .eq("id", item.id);

      if (error) throw error;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error reordering videos:", error);
    return NextResponse.json(
      { error: "Failed to reorder videos" },
      { status: 500 },
    );
  }
}
