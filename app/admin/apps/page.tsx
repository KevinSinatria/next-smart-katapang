"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { App, Category } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import slugify from "slugify";
import path from "node:path";

export default function AdminAppsPage() {
  const { profile } = useAuth();
  const [apps, setApps] = useState<App[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingApp, setEditingApp] = useState<App | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    category_id: "",
    image_url: "",
    visit_url: "",
  });
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpload = async () => {
    if (!file) return;
    const fileName = `${Date.now()}-${file.name}`;
    const filePath = `uploads/${fileName}`;
    const { data, error } = await supabase.storage
      .from("smart-katapang")
      .upload(`/${filePath}`, file);

    if (error) {
      console.error("Upload error:", error.message);
      alert("Gagal upload");
      return;
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("smart-katapang").getPublicUrl(`/${filePath}`);

    // setFormData((prevFormData) => ({
    //   ...prevFormData,
    //   image_url: publicUrl,
    // }));

    return {
      url: publicUrl,
      path: filePath,
    };
  };

  const fetchData = async () => {
    setLoading(true);
    const [appsRes, categoriesRes] = await Promise.all([
      supabase
        .from("apps")
        .select("*")
        .order("created_at", { ascending: false }),
      supabase.from("categories").select("*").order("name"),
    ]);
    setApps(appsRes.data || []);
    setCategories(categoriesRes.data || []);
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingApp) {
      await supabase.from("apps").update(formData).eq("id", editingApp.id);
    } else {
      const uploadedImage = await handleUpload();
      await supabase.from("apps").insert([
        {
          ...formData,
          image_url: uploadedImage?.url,
          image_path: uploadedImage?.path,
        },
      ]);
    }

    setDialogOpen(false);
    setEditingApp(null);
    resetForm();
    fetchData();
  };

  const handleDelete = async (id: string) => {
    try {
      if (confirm("Yakin ingin menghapus aplikasi ini?")) {
        const { data: app } = await supabase
          .from("apps")
          .select("*")
          .eq("id", id)
          .single();
        app.image_path &&
          (await supabase.storage
            .from("smart-katapang")
            .remove([app.image_path]));
        await supabase.from("apps").delete().eq("id", id);
        fetchData();
      }
    } catch (error) {
      console.error("Error deleting app:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      slug: "",
      description: "",
      category_id: "",
      image_url: "",
      visit_url: "",
    });
  };

  const openEditDialog = (app: App) => {
    setEditingApp(app);
    setFormData({
      title: app.title,
      slug: app.slug,
      description: app.description,
      category_id: app.category_id,
      image_url: app.image_url,
      visit_url: app.visit_url,
    });
    setDialogOpen(true);
  };

  const openCreateDialog = () => {
    setEditingApp(null);
    resetForm();
    setDialogOpen(true);
  };

  const getCategoryName = (categoryId: string) => {
    return categories.find((cat) => cat.id === categoryId)?.name || "-";
  };

  const canEdit = profile?.role === "admin" || profile?.role === "editor";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Aplikasi</h1>
          <p className="text-slate-600 mt-2">Kelola aplikasi sekolah</p>
        </div>
        {canEdit && (
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={openCreateDialog}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="mr-2 h-4 w-4" />
                Tambah Aplikasi
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <form onSubmit={handleSubmit}>
                <DialogHeader>
                  <DialogTitle>
                    {editingApp ? "Edit" : "Tambah"} Aplikasi
                  </DialogTitle>
                  <DialogDescription>
                    {editingApp ? "Ubah" : "Buat"} aplikasi baru di portal
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Judul</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => {
                        setFormData((prev) => ({
                          ...prev,
                          title: e.target.value,
                        }));
                        setFormData((prev) => ({
                          ...prev,
                          slug: slugify(e.target.value, { lower: true }),
                        }));
                      }}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="slug">Slug</Label>
                    <Input id="slug" value={formData.slug} required disabled />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Kategori</Label>
                    <Select
                      value={formData.category_id}
                      onValueChange={(value) =>
                        setFormData({ ...formData, category_id: value })
                      }
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih kategori" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat.id} value={cat.id}>
                            {cat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Deskripsi</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="upload_thumbnail">Upload Thumbnail</Label>
                    {/* <Input
                      id="image_url"
                      type="url"
                      value={formData.image_url}
                      onChange={(e) =>
                        setFormData({ ...formData, image_url: e.target.value })
                      }
                      required
                    /> */}
                    <Input
                      id="upload_thumbnail"
                      type="file"
                      required
                      onChange={(e) => setFile(e.target.files?.[0] || null)}
                      accept="image/*"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="visit_url">URL Aplikasi</Label>
                    <Input
                      id="visit_url"
                      type="url"
                      value={formData.visit_url}
                      onChange={(e) =>
                        setFormData({ ...formData, visit_url: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Simpan
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Aplikasi</CardTitle>
          <CardDescription>Semua aplikasi yang terdaftar</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Judul</TableHead>
                  <TableHead>Kategori</TableHead>
                  <TableHead>Slug</TableHead>
                  {canEdit && (
                    <TableHead className="text-right">Aksi</TableHead>
                  )}
                </TableRow>
              </TableHeader>
              <TableBody>
                {apps.map((app) => (
                  <TableRow key={app.id}>
                    <TableCell className="font-medium">{app.title}</TableCell>
                    <TableCell>{getCategoryName(app.category_id)}</TableCell>
                    <TableCell>{app.slug}</TableCell>
                    {canEdit && (
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openEditDialog(app)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        {profile?.role === "admin" && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(app.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
