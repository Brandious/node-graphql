import {
  GraphQLInt,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from "graphql";

import { AuthorType } from "./AuthorSchema/Author";
import { BookType } from "./BookSchema/Book";
import db from "../database/db";

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        // code to get data from db / other source
        const { id } = args;
        return db().select("*").from("books").where("id", id).first();
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        // code to get data from db / other source
        const { id } = args;
        return db().select("*").from("authors").where("id", id).first();
      },
    },
  },
});

export default new GraphQLSchema({
  query: RootQuery,
});
