import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("token");
    return NextResponse.json({ success: true, message: "Logout berhasil." });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan saat logout." },
      { status: 500 },
    );
  }
}
