/*
  # Create Portal Digital SMKN 1 Katapang Database Schema

  ## Overview
  This migration creates the core database structure for the school portal application.
  It establishes two main tables for managing application categories and the applications themselves.

  ## New Tables

  ### 1. categories
  Stores application categories for organizing school management systems.
  - `id` (uuid, primary key) - Unique identifier
  - `name` (text, not null) - Display name of the category
  - `slug` (text, unique, not null) - URL-friendly version of the name
  - `created_at` (timestamptz) - Timestamp of creation

  ### 2. apps
  Stores information about school applications displayed in the portal.
  - `id` (uuid, primary key) - Unique identifier
  - `title` (text, not null) - Application title
  - `description` (text, not null) - Brief description of the application
  - `category_id` (uuid, foreign key) - References categories table
  - `image_url` (text, not null) - URL to application thumbnail/icon
  - `visit_url` (text, not null) - URL to access the application
  - `created_at` (timestamptz) - Timestamp of creation

  ## Security
  - RLS (Row Level Security) is enabled on both tables
  - Public read access is granted for viewing categories and applications
  - This allows the portal to display content to all visitors without authentication

  ## Initial Data
  - Seeds 6 standard categories for school management
  - Provides sample applications for demonstration purposes
*/

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create apps table
CREATE TABLE IF NOT EXISTS apps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  category_id uuid NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  image_url text NOT NULL,
  visit_url text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE apps ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for public read access
CREATE POLICY "Anyone can view categories"
  ON categories FOR SELECT
  USING (true);

CREATE POLICY "Anyone can view apps"
  ON apps FOR SELECT
  USING (true);

-- Insert default categories
INSERT INTO categories (name, slug) VALUES
  ('Kesiswaan', 'kesiswaan'),
  ('Kedisiplinan', 'kedisiplinan'),
  ('Keuangan', 'keuangan'),
  ('Inventaris', 'inventaris'),
  ('Keputrian', 'keputrian'),
  ('Informasi Sekolah', 'informasi-sekolah')
ON CONFLICT (slug) DO NOTHING;

-- Insert sample applications
INSERT INTO apps (title, description, category_id, image_url, visit_url)
SELECT 
  'Sistem Informasi Kesiswaan',
  'Platform manajemen data siswa, nilai, dan kehadiran secara terintegrasi.',
  id,
  'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=400',
  'https://kesiswaan.smkn1katapang.sch.id'
FROM categories WHERE slug = 'kesiswaan'
ON CONFLICT DO NOTHING;

INSERT INTO apps (title, description, category_id, image_url, visit_url)
SELECT 
  'Sistem Kedisiplinan Digital',
  'Monitoring dan pencatatan pelanggaran serta prestasi kedisiplinan siswa.',
  id,
  'https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg?auto=compress&cs=tinysrgb&w=400',
  'https://kedisiplinan.smkn1katapang.sch.id'
FROM categories WHERE slug = 'kedisiplinan'
ON CONFLICT DO NOTHING;

INSERT INTO apps (title, description, category_id, image_url, visit_url)
SELECT 
  'Manajemen Keuangan Sekolah',
  'Sistem pengelolaan SPP, pembayaran, dan laporan keuangan sekolah.',
  id,
  'https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg?auto=compress&cs=tinysrgb&w=400',
  'https://keuangan.smkn1katapang.sch.id'
FROM categories WHERE slug = 'keuangan'
ON CONFLICT DO NOTHING;

INSERT INTO apps (title, description, category_id, image_url, visit_url)
SELECT 
  'Sistem Inventaris Aset',
  'Pendataan dan monitoring barang inventaris sekolah secara real-time.',
  id,
  'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=400',
  'https://inventaris.smkn1katapang.sch.id'
FROM categories WHERE slug = 'inventaris'
ON CONFLICT DO NOTHING;

INSERT INTO apps (title, description, category_id, image_url, visit_url)
SELECT 
  'Portal Keputrian',
  'Platform khusus untuk kegiatan dan informasi keputrian di sekolah.',
  id,
  'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400',
  'https://keputrian.smkn1katapang.sch.id'
FROM categories WHERE slug = 'keputrian'
ON CONFLICT DO NOTHING;

INSERT INTO apps (title, description, category_id, image_url, visit_url)
SELECT 
  'Portal Informasi SMKN 1 Katapang',
  'Website resmi sekolah dengan berita, pengumuman, dan informasi terkini.',
  id,
  'https://images.pexels.com/photos/256490/pexels-photo-256490.jpeg?auto=compress&cs=tinysrgb&w=400',
  'https://smkn1katapang.sch.id'
FROM categories WHERE slug = 'informasi-sekolah'
ON CONFLICT DO NOTHING;