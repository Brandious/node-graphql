import type { Knex } from "knex";

import * as dotenv from "dotenv";

dotenv.config();


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
