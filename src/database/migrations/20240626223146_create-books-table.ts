import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("books", (table: Knex.TableBuilder) => {
    table.uuid("id").primary().notNullable().unique();
    table.string("title").nullable();
    table.integer("genre");
    table.float("rating");

    table.uuid("author_id").references("id").inTable("authors");

    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("books");
}
