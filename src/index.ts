import express, { Express } from "express";
import * as dotenv from "dotenv";

import { graphqlHTTP } from "express-graphql";
import schema from "./schema/schema";

dotenv.config();

const port = process.env.PORT || 3000;
const app: Express = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

app.listen(port, () => {
  console.log("Server is running on http://localhost:3000");
});
