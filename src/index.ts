import * as dotenv from "dotenv";
import express, { Express } from "express";
import { graphqlHTTP } from "express-graphql";
import { verifyTokenMiddleware } from "./middleware/verifyTokenMiddleware";
import schema from "./schema/schema";

dotenv.config();

const port = process.env.PORT || 3000;
const app: Express = express();

app.use(
  verifyTokenMiddleware.unless({
    path: ["/public", "/graphql"],
  })
);

app.use("/protected", (req, res) => {
  res.send("Protected route");
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: {
      headerEditorEnabled: true,
    },
  })
);

app.listen(port, () => {
  console.log(`Server is running on PORT => ${port}`);
});
