import { SliderItem } from '@/domain/models/models';
import { SqlLiteAdapter } from '@/lib/repositories/adapters/sqllite.adapter';
import { Database } from 'sqlite3';
import { getDatabaseFilePath } from '@/lib/config/database.config';
import logger from '@/lib/logger';
import { ISliderRepository } from '@/lib/interfaces/repositories.interface';

const dbPath = getDatabaseFilePath();
const db = new Database(dbPath);

export class SliderRepositoryLocal extends SqlLiteAdapter<SliderItem, string> implements ISliderRepository {
  constructor() {
    // Use the table name for slider items as defined in your migration
    super("slider_items", db);
  }

  // Fetch all slider items
  getSliderItems = async (): Promise<SliderItem[]> => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM "${this.tableName}";`;
      this.db.all(query, [], (err, rows: SliderItem[]) => {
        if (err) {
          logger.log(`Error fetching slider items from table "${this.tableName}":`, err);
          reject(new Error(`Database error fetching slider items: ${err.message || 'Unknown error'}`));
          return;
        }
        resolve(rows || []);
      });
    });
  };

  // Create a new slider item
  createSliderItem = async (sliderItem: Partial<SliderItem>): Promise<SliderItem> => {
    return new Promise((resolve, reject) => {
      // Build columns, placeholders, and values from sliderItem DTO
      const keys = Object.keys(sliderItem)
        .filter(key => sliderItem[key as keyof SliderItem] !== undefined);
      const columns = keys.map(key => `"${key}"`).join(', ');
      const placeholders = keys.map(() => '?').join(', ');
      const values = keys.map(key => sliderItem[key as keyof SliderItem]);

      const query = `
        INSERT INTO "${this.tableName}" (${columns})
        VALUES (${placeholders});
      `;
      
      const that = this;
      that.db.run(query, values, function(err) {
        if (err) {
          logger.log(`Error creating slider item in table "${that.tableName}":`, err);
          reject(new Error(`Database error creating slider item: ${err.message || 'Unknown error'}`));
          return;
        }
        // After insertion, retrieve the created slider item.
        // It assumes that sliderItem.id is provided; if not, you should generate and include it before insertion.
        const id = sliderItem.id;
        logger.log('id slider item ', id)
        if (!id) {
          reject(new Error('Slider item id must be provided'));
          return;
        }
        that.db.get(`SELECT * FROM "${that.tableName}" WHERE id = ?;`, [id], (err, row: SliderItem) => {
          if (err) {
            logger.log(`Error retrieving created slider item from table "${that.tableName}":`, err);
            reject(new Error(`Database error retrieving created slider item: ${err.message || 'Unknown error'}`));
            return;
          }
          if (!row) {
            reject(new Error(`Failed to retrieve created slider item from table "${that.tableName}"`));
            return;
          }
          resolve(row);
        });
      });
    });
  };

  // Update an existing slider item by id
  updateSliderItem = async (id: string, sliderItem: Partial<SliderItem>): Promise<SliderItem> => {
    return new Promise((resolve, reject) => {
      const keys = Object.keys(sliderItem)
        .filter(key => sliderItem[key as keyof SliderItem] !== undefined);
      const updates = keys.map(key => `"${key}" = ?`).join(', ');
      const values = keys.map(key => sliderItem[key as keyof SliderItem]);

      const query = `
        UPDATE "${this.tableName}"
        SET ${updates}
        WHERE id = ?;
      `;
      const that = this;
      that.db.run(query, [...values, id], function(err) {
        if (err) {
          logger.log(`Error updating slider item with id ${id} in table "${that.tableName}":`, err);
          reject(new Error(`Database error updating slider item: ${err.message || 'Unknown error'}`));
          return;
        }
        that.db.get(`SELECT * FROM "${that.tableName}" WHERE id = ?;`, [id], (err, row: SliderItem) => {
          if (err) {
            logger.log(`Error retrieving updated slider item with id ${id} from table "${that.tableName}":`, err);
            reject(new Error(`Database error retrieving updated slider item: ${err.message || 'Unknown error'}`));
            return;
          }
          if (!row) {
            reject(new Error(`Failed to retrieve updated slider item with id ${id}`));
            return;
          }
          resolve(row);
        });
      });
    });
  };

  // Delete a slider item by id
  deleteSliderItem = async (id: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM "${this.tableName}" WHERE id = ?;`;
      this.db.run(query, [id], function(err) {
        if (err) {
          logger.log(`Error deleting slider item with id ${id} from table "slider_items":`, err);
          reject(new Error(`Database error deleting slider item: ${err.message || 'Unknown error'}`));
          return;
        }
        resolve();
      });
    });
  };

  // Retrieve a slider item by id
  getSliderItemById = async (id: string): Promise<SliderItem> => {
    return new Promise((resolve, reject) => {
      this.db.get(`SELECT * FROM "${this.tableName}" WHERE id = ?;`, [id], (err, row: SliderItem) => {
        if (err) {
          logger.log(`Error fetching slider item with id ${id} from table "${this.tableName}":`, err);
          reject(new Error(`Database error fetching slider item: ${err.message || 'Unknown error'}`));
          return;
        }
        resolve(row);
      });
    });
  }
}

// Export a singleton instance
export const sliderRepositoryLocal = new SliderRepositoryLocal();