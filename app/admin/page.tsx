"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth-context";
import { AppWindow, Tags, Users, TrendingUp } from "lucide-react";

export default function AdminDashboardPage() {
  const { profile } = useAuth();
  const [stats, setStats] = useState({
    totalApps: 0,
    totalCategories: 0,
    totalUsers: 0,
  });
  console.log(profile);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [appsResponse, categoriesResponse, usersResponse] =
        await Promise.all([
          supabase.from("apps").select("id", { count: "exact", head: true }),
          supabase
            .from("categories")
            .select("id", { count: "exact", head: true }),
          profile?.role === "admin"
            ? supabase
                .from("profiles")
                .select("id", { count: "exact", head: true })
            : Promise.resolve({ count: 0 }),
        ]);

      setStats({
        totalApps: appsResponse.count || 0,
        totalCategories: categoriesResponse.count || 0,
        totalUsers: usersResponse.count || 0,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-600 mt-2">
          Selamat datang, {profile?.full_name || "Admin"}!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Aplikasi
            </CardTitle>
            <AppWindow className="h-4 w-4 text-slate-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalApps}</div>
            <p className="text-xs text-slate-600 mt-1">
              Aplikasi terdaftar di portal
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Kategori
            </CardTitle>
            <Tags className="h-4 w-4 text-slate-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCategories}</div>
            <p className="text-xs text-slate-600 mt-1">
              Kategori aplikasi tersedia
            </p>
          </CardContent>
        </Card>

        {profile?.role === "admin" && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Pengguna
              </CardTitle>
              <Users className="h-4 w-4 text-slate-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
              <p className="text-xs text-slate-600 mt-1">Pengguna terdaftar</p>
            </CardContent>
          </Card>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informasi Akun</CardTitle>
          <CardDescription>Detail akun Anda saat ini</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-slate-100">
            <span className="text-sm font-medium text-slate-600">Nama</span>
            <span className="text-sm text-slate-900">
              {profile?.full_name || "-"}
            </span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-slate-100">
            <span className="text-sm font-medium text-slate-600">Email</span>
            <span className="text-sm text-slate-900">
              {profile?.email || "-"}
            </span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-sm font-medium text-slate-600">Role</span>
            <span className="text-sm text-slate-900 capitalize">
              {profile?.role || "viewer"}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
