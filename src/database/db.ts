import knex from "knex";
import config from "./knexfile";

import dotenv from "dotenv";

dotenv.config();

const conf = config[process.env.NODE_ENV || "development"];

const db = knex(conf);

export default db;
