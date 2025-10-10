/*
  # Update Apps Table Schema

  ## Overview
  This migration enhances the apps table to support better admin management.
  Adds slug field for SEO-friendly URLs and updated_at timestamp.

  ## Changes
  
  ### apps table modifications
  - Add `slug` (text, unique) - SEO-friendly URL identifier
  - Add `updated_at` (timestamptz) - Timestamp of last update
  - Update existing data to generate slugs from titles

  ## Security
  
  ### Updated RLS Policies
  - Admins and editors can insert new apps
  - Admins and editors can update apps
  - Admins can delete apps
  - Public can still view all apps

  ## Notes
  - Slugs are automatically generated from titles for existing apps
  - Apps table now supports full CRUD operations with role-based access
*/

-- Add slug column if not exists
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'apps' AND column_name = 'slug'
  ) THEN
    ALTER TABLE apps ADD COLUMN slug text;
  END IF;
END $$;

-- Add updated_at column if not exists
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'apps' AND column_name = 'updated_at'
  ) THEN
    ALTER TABLE apps ADD COLUMN updated_at timestamptz DEFAULT timezone('utc'::text, now());
  END IF;
END $$;

-- Generate slugs for existing apps (if they don't have one)
UPDATE apps
SET slug = lower(regexp_replace(regexp_replace(title, '[^a-zA-Z0-9\s-]', '', 'g'), '\s+', '-', 'g'))
WHERE slug IS NULL OR slug = '';

-- Make slug unique and not null
ALTER TABLE apps ALTER COLUMN slug SET NOT NULL;
DROP INDEX IF EXISTS apps_slug_key;
CREATE UNIQUE INDEX IF NOT EXISTS apps_slug_key ON apps(slug);

-- Add trigger for updated_at on apps table
DROP TRIGGER IF EXISTS apps_updated_at ON apps;
CREATE TRIGGER apps_updated_at
  BEFORE UPDATE ON apps
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Update RLS policies for apps table

-- Policy: Admins and editors can insert apps
CREATE POLICY "Admins and editors can insert apps"
  ON apps
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('admin', 'editor')
    )
  );

-- Policy: Admins and editors can update apps
CREATE POLICY "Admins and editors can update apps"
  ON apps
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('admin', 'editor')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('admin', 'editor')
    )
  );

-- Policy: Admins can delete apps
CREATE POLICY "Admins can delete apps"
  ON apps
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Add description column to categories if not exists
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'categories' AND column_name = 'description'
  ) THEN
    ALTER TABLE categories ADD COLUMN description text;
  END IF;
END $$;

-- Update RLS policies for categories table

-- Policy: Admins can insert categories
CREATE POLICY "Admins can insert categories"
  ON categories
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Policy: Admins can update categories
CREATE POLICY "Admins can update categories"
  ON categories
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Policy: Admins can delete categories
CREATE POLICY "Admins can delete categories"
  ON categories
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );