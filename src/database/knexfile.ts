import type { Knex } from "knex";

import dotenv from "dotenv";
dotenv.config();

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  development: {
    client: process.env.DB_CLIENT!,
    connection: {
      filename: process.env.FILEPATH!,
    },
    debug: !!process.env.DEBUG,
    useNullAsDefault: true,
  },
};

export default config;
