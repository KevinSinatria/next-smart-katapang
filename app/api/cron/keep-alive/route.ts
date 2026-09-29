import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(req: Request) {
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret) {
    const auth = req.headers.get("authorization");
    if (auth !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ success: false, message: "Unauthorized." }, { status: 401 });
    }
  }
  try {
    await prisma.$queryRaw`SELECT 1`;
    const category = await prisma.categories.findFirst({
      select: { id: true },
    });
    const { error } = await supabase.from("categories").select("id").limit(1);
    if (error) throw error;
    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      categoryFound: Boolean(category),
    });
  } catch (error) {
    console.error("Keep-alive cron failed:", error);
    return NextResponse.json({ success: false, message: "Keep-alive query gagal." }, { status: 500 });
  }
}
