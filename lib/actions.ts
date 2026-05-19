"use server";

import { prisma } from "./db";
import { Category, App, Profile } from "@/types";

export async function getCategories(): Promise<Category[]> {
  const data = await prisma.categories.findMany({
    orderBy: { name: "asc" },
  });
  return data.map((item) => ({
    ...item,
    description: item.description || undefined,
    created_at: item.created_at.toISOString(),
  }));
}

export async function getApps(): Promise<App[]> {
  const data = await prisma.apps.findMany({
    orderBy: { created_at: "desc" },
  });
  return data.map((item) => ({
    ...item,
    created_at: item.created_at.toISOString(),
    updated_at: item.updated_at.toISOString(),
  }));
}

export async function getProfile(userId: string): Promise<Profile | null> {
  const data = await prisma.profiles.findUnique({
    where: { id: userId },
  });
  if (!data) return null;
  return {
    ...data,
    avatar_url: data.avatar_url || undefined,
    created_at: data.created_at.toISOString(),
    updated_at: data.updated_at.toISOString(),
    role: data.role.toLowerCase() as "admin" | "editor" | "viewer", // Schema has ADMIN as enum, interface has 'admin' etc.
  };
}

export async function updateProfile(userId: string, data: Partial<Profile>) {
  return await prisma.profiles.update({
    where: { id: userId },
    data: {
      full_name: data.full_name,
      avatar_url: data.avatar_url,
      // Role is not updatable usually by user, but let's keep it simple
    },
  });
}

export async function createCategory(data: {
  name: string;
  slug: string;
  description?: string;
}) {
  return await prisma.categories.create({
    data: {
      name: data.name,
      slug: data.slug,
      description: data.description || "",
    },
  });
}

export async function updateCategory(
  id: string,
  data: { name: string; slug: string; description?: string },
) {
  return await prisma.categories.update({
    where: { id },
    data: {
      name: data.name,
      slug: data.slug,
      description: data.description || "",
    },
  });
}

export async function deleteCategory(id: string) {
  return await prisma.categories.delete({
    where: { id },
  });
}

export async function createApp(data: {
  title: string;
  slug: string;
  description: string;
  category_id: string;
  image_url: string;
  visit_url: string;
}) {
  return await prisma.apps.create({
    data,
  });
}

export async function updateApp(
  id: string,
  data: Partial<{
    title: string;
    slug: string;
    description: string;
    category_id: string;
    image_url: string;
    visit_url: string;
  }>,
) {
  return await prisma.apps.update({
    where: { id },
    data,
  });
}

export async function deleteApp(id: string) {
  return await prisma.apps.delete({
    where: { id },
  });
}

export async function getAppsCount() {
  return await prisma.apps.count();
}

export async function getCategoriesCount() {
  return await prisma.categories.count();
}

export async function getProfilesCount() {
  return await prisma.profiles.count();
}
