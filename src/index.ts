import express, { Express } from "express";
import * as dotenv from "dotenv";
import { Request, expressjwt as jwt } from "express-jwt";

import { graphqlHTTP } from "express-graphql";
import schema from "./schema/schema";

dotenv.config();

const port = process.env.PORT || 3000;
const app: Express = express();

app.use(
  "/protected",
  jwt({ secret: process.env.JWT_SECRET!, algorithms: ["HS256"] }),
  (req: Request, res) => {
    if (req.auth) return res.send(`Welcome ${JSON.stringify(req.auth)}`);

    return res.status(401).send("Unauthorized");
  }
);

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

app.listen(port, () => {
  console.log(`Server is running on PORT => ${port}`);
});
