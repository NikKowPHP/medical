DROP TABLE IF EXISTS medical_products;

CREATE TABLE medical_products (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4(),
    image_url TEXT NOT NULL,
    description TEXT NOT NULL,
    pdf_url TEXT NOT NULL,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO medical_products (id, image_url, description, pdf_url, title, category, created_at, updated_at)
VALUES (
    'product1',
    'https://example.com/product1-image.jpg',
    'This is a sample product description.',
    'https://example.com/product1-doc.pdf',
    'Sample Product 1',
    'Category A',
    NOW(),
    NOW()
);