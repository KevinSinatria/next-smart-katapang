import { prisma } from "@/lib/db";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;
        if(!token) return NextResponse.json({ success: false, message: "Anda belum login." }, { status: 401 });

        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        if(!decoded) return NextResponse.json({ success: false, message: "Token tidak valid." }, { status: 401 });

        const user = await prisma.user.findUnique({
            where: {
                id: (decoded as { id: string }).id
            },
            select: {
                id: true,
                email: true,
                full_name: true,
                avatar_url: true,
                role: true,
                created_at: true,
                updated_at: true
            }
        });
        if(!user) return NextResponse.json({ success: false, message: "User tidak ditemukan." }, { status: 401 });

        return NextResponse.json({ success: true, user });
    } catch (error) {
        console.error("Error saat mengambil profile:", error);
        return NextResponse.json({ success: false, message: "Terjadi kesalahan pada server." }, { status: 500 });
    }
}