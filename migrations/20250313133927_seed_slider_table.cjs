

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex("slider_items").insert([
    {
      id: "items.item1",
      image_url: "/product1.avif",
    },
    {
      id: "items.item2",
      image_url: "/alton.avif",
    },
    {
      id: "items.item3",
      image_url: "/subhero.avif",
    },
  ]);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex("slider_items")
    .whereIn("id", ["items.item1", "items.item2", "items.item3"])
    .del();
};

