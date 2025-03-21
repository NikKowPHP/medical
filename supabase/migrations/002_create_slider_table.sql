-- Create the slider_items table (if it doesn't already exist)
CREATE TABLE IF NOT EXISTS medical_slider (
  id VARCHAR PRIMARY KEY,
  image_url VARCHAR NOT NULL
);

-- Insert seed data into slider_items table
INSERT INTO medical_slider (id, image_url)
VALUES 
  ('items.item1', '/product1.avif'),
  ('items.item2', '/alton.avif'),
  ('items.item3', '/subhero.avif')
ON CONFLICT (id) DO NOTHING;