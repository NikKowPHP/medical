import { Product } from '@/domain/models/models';
import { SqlLiteAdapter } from '@/lib/repositories/adapters/sqllite.adapter';
import { Database } from 'sqlite3';
import { getDatabaseFilePath } from '@/lib/config/database.config';
import logger from '@/lib/logger';
import { IProductRepository } from '@/lib/interfaces/repositories.interface';

const dbPath = getDatabaseFilePath();
const db = new Database(dbPath);

export class ProductRepositoryLocal extends SqlLiteAdapter<Product, string> implements IProductRepository  {
  constructor() {
    // Using same table name as the Supabase repository ("medical_products")
    super("products", db);
  }

  // Fetch all products ordered by created_at descending
  getProducts = async (): Promise<Product[]> => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM "${this.tableName}" ORDER BY created_at DESC;`;
      this.db.all(query, [], (err, rows: Product[]) => {
        if (err) {
          logger.log(`Error fetching products from table "${this.tableName}":`, err);
          reject(new Error(`Database error fetching products: ${err.message || 'Unknown error'}`));
          return;
        }
        resolve(rows || []);
      });
    });
  };

  // Create a new product
  createProduct = async (product: Partial<Product>): Promise<Product> => {
    return new Promise((resolve, reject) => {
      // Build columns, placeholders, and values from product DTO
      product.id = Date.now().toString();
      const keys = Object.keys(product)
        .filter(key => product[key as keyof Product] !== undefined);
      const columns = keys.map(key => `"${key}"`).join(', ');
      const placeholders = keys.map(() => '?').join(', ');
      const values = keys.map(key => product[key as keyof Product]);

      const query = `
        INSERT INTO "${this.tableName}" (${columns})
        VALUES (${placeholders});
      `;
      
      const that = this;
      that.db.run(query, values, function(err) {
        if (err) {
          logger.log(`Error creating product in table "${that.tableName}":`, err);
          reject(new Error(`Database error creating product: ${err.message || 'Unknown error'}`));
          return;
        }
        // After insertion, retrieve the created product.
        // Assumes that product.id is provided; if not, generate and include it before insertion.
        const id = product.id;
        if (!id) {
          reject(new Error('Product id must be provided'));
          return;
        }
        that.db.get(`SELECT * FROM "${that.tableName}" WHERE id = ?;`, [id], (err, row: Product) => {
          if (err) {
            logger.log(`Error retrieving created product from table "${that.tableName}":`, err);
            reject(new Error(`Database error retrieving created product: ${err.message || 'Unknown error'}`));
            return;
          }
          if (!row) {
            reject(new Error(`Failed to retrieve created product from table "${that.tableName}"`));
            return;
          }
          resolve(row);
        });
      });
    });
  };

  // Update an existing product by id
  updateProduct = async (id: string, product: Partial<Product>): Promise<Product> => {
    return new Promise((resolve, reject) => {
      const keys = Object.keys(product)
        .filter(key => product[key as keyof Product] !== undefined);
      const updates = keys.map(key => `"${key}" = ?`).join(', ');
      const values = keys.map(key => product[key as keyof Product]);

      const query = `
        UPDATE "${this.tableName}"
        SET ${updates}
        WHERE id = ?;
      `;
      const that = this;
      that.db.run(query, [...values, id], function(err) {
        if (err) {
          logger.log(`Error updating product with id ${id} in table "${that.tableName}":`, err);
          reject(new Error(`Database error updating product: ${err.message || 'Unknown error'}`));
          return;
        }
        that.db.get(`SELECT * FROM "${that.tableName}" WHERE id = ?;`, [id], (err, row: Product) => {
          if (err) {
            logger.log(`Error retrieving updated product with id ${id} from table "${that.tableName}":`, err);
            reject(new Error(`Database error retrieving updated product: ${err.message || 'Unknown error'}`));
            return;
          }
          if (!row) {
            reject(new Error(`Failed to retrieve updated product with id ${id}`));
            return;
          }
          resolve(row);
        });
      });
    });
  };

  // Delete a product by id
  deleteProduct = async (id: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM "${this.tableName}" WHERE id = ?;`;
      this.db.run(query, [id], function(err) {
        if (err) {
          logger.log(`Error deleting product with id ${id} from table :`, err);
          reject(new Error(`Database error deleting product: ${err.message || 'Unknown error'}`));
          return;
        }
        resolve();
      });
    });
  };

  getProductById = async (id: string): Promise<Product> => {
    return new Promise((resolve, reject) => {
      this.db.get(`SELECT * FROM "${this.tableName}" WHERE id = ?;`, [id], (err, row: Product) => {
        if (err) {
          logger.log(`Error fetching product with id ${id} from table "${this.tableName}":`, err);
          reject(new Error(`Database error fetching product: ${err.message || 'Unknown error'}`));
          return;
        }
        resolve(row);
      });
    });
  }
}

// Export a singleton instance
export const productRepositoryLocal = new ProductRepositoryLocal();