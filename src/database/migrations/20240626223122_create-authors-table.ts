import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("authors", (table: Knex.TableBuilder) => {
    table.uuid("id").primary().notNullable().unique();
    table.string("name").nullable();
    table.integer("age");
    table.float("rating");

    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("authors");
}
