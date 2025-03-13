// test_db.js
const knexConfig = require('./knexfile.cjs');
const knex = require('knex')(knexConfig.development);

async function testQueries() {
  try {
    // Test query for the products table
    const products = await knex('products')
      .select('*')
      .orderBy('created_at', 'desc');
    console.log("Products table:");
    console.log(products);

    // Test query for the slider_items table
    const sliderItems = await knex('slider_items').select('*');
    console.log("Slider Items table:");
    console.log(sliderItems);

    // If there are any products, fetch a single product by its id
    if (products.length > 0) {
      const productId = products[0].id;
      const product = await knex('products')
        .where({ id: productId })
        .first();
      console.log(`Product by id ${productId}:`);
      console.log(product);
    }

    // If there are any slider items, fetch a single slider item by its id
    if (sliderItems.length > 0) {
      const sliderItemId = sliderItems[0].id;
      const sliderItem = await knex('slider_items')
        .where({ id: sliderItemId })
        .first();
      console.log(`Slider item by id ${sliderItemId}:`);
      console.log(sliderItem);
    }

    // Additional tests: count the number of records in each table
    const productCountResult = await knex('products').count('* as count');
    const sliderCountResult = await knex('slider_items').count('* as count');
    console.log("Total products count:", productCountResult[0].count);
    console.log("Total slider items count:", sliderCountResult[0].count);
  } catch (err) {
    console.error("Error running test queries:", err);
  } finally {
    knex.destroy();
  }
}

testQueries();