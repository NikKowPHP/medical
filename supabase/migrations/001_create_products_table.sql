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
VALUES 
(
    '1',
    '/product1.avif',
    'Single-use design eliminates the risk of patient infection, improving patient trust and confidence.',
    'https://example.com/product1.pdf',
    'Product 1',
    'Enhanced Safety',
    NOW(),
    NOW()
),
(
    '2',
    '/product1.avif',
    'Reduces expenses associated with sterilization, disinfectants, and autoclaves. Streamline your workflow and save valuable resources.',
    'https://example.com/product2.pdf',
    'Product 2',
    'Cost-Effective',
    NOW(),
    NOW()
);
