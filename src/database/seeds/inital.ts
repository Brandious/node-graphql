import { Knex } from "knex";

import books from "../../data/books.json";
import authors from "../../data/authors.json";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("authors").del();
  await knex("books").del();

  // Inserts seed entries
  await knex("authors").insert(authors);
  await knex("books").insert(books);
}
