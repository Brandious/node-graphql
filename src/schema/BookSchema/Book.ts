import {
  GraphQLFloat,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { AuthorType } from "../AuthorSchema/Author";
import db from "../../database/db";

export const BookType: GraphQLObjectType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    rating: { type: GraphQLFloat },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        const { author_id } = parent;
        return db().select("*").from("authors").where("id", author_id).first();
      },
    },
  }),
});
