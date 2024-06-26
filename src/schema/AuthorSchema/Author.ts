import {
  GraphQLFloat,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";

import { BookType } from "../BookSchema/Book";
import db from "../../database/db";

export const AuthorType: GraphQLObjectType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    rating: { type: GraphQLFloat },
    books: {
      type: new GraphQLList(BookType),
      resolve: (parent, args) => {
        const { id } = parent;
        return db.select("*").from("books").where("author_id", id);
      },
    },
  }),
});
