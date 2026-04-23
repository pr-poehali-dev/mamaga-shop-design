CREATE TABLE IF NOT EXISTS material_photos (
    id SERIAL PRIMARY KEY,
    material_slug VARCHAR(50) NOT NULL,
    url TEXT NOT NULL,
    caption TEXT DEFAULT '',
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_material_photos_slug ON material_photos(material_slug);
