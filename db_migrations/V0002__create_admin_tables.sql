
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  price INTEGER,
  material VARCHAR(100),
  style VARCHAR(100),
  image_url TEXT,
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS blog_posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT,
  excerpt TEXT,
  image_url TEXT,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS site_settings (
  key VARCHAR(100) PRIMARY KEY,
  value TEXT
);

INSERT INTO site_settings (key, value) VALUES
  ('hero_title', 'Искусство живёт в каждом корне'),
  ('hero_subtitle', 'Авторские изделия из дерева, металла и камня'),
  ('phone', '+7 (495) 123-45-67'),
  ('email', 'hello@vkorne.space'),
  ('instagram', ''),
  ('telegram', '')
ON CONFLICT (key) DO NOTHING;
