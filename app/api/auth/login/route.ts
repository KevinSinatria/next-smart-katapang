import { prisma } from "@/lib/db";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user)
      return NextResponse.json(
        { success: false, message: "Email atau password salah." },
        { status: 401 },
      );
    const isPasswordValid = await bcrypt.compare(password, user?.password!);
    if (!isPasswordValid)
      return NextResponse.json(
        { success: false, message: "Email atau password salah." },
        { status: 401 },
      );

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    const cookieStore = await cookies();
    cookieStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24,
      path: "/",
    });

    return NextResponse.json({ success: true, message: "Login berhasil." });
  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan saat login." },
      { status: 500 },
    );
  }
}
