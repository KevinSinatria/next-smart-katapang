export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  created_at: string;
}

export interface App {
  id: string;
  title: string;
  slug: string;
  description: string;
  category_id: string;
  image_url: string;
  visit_url: string;
  created_at: string;
  updated_at?: string;
  category?: Category;
}

export interface Profile {
  id: string;
  email?: string;
  full_name?: string;
  avatar_url?: string;
  role: 'admin' | 'editor' | 'viewer';
  created_at: string;
  updated_at?: string;
}

export interface User {
  id: string;
  email?: string;
  profile?: Profile;
}
