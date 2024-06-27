import { GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql";

import db from "../database/db";
import { AuthorType } from "./AuthorSchema/Author";
import { BookType } from "./BookSchema/Book";
import { AuthPayloadType } from "./UserSchema/User";

import * as dotenv from "dotenv";
import bcrypt from "bcrypt";
import { generateToken } from "../helpers/generateToken";
dotenv.config();

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

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    registerUser: {
      type: AuthPayloadType,
      args: {
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      async resolve(parent, { username, email, password }) {
        const id = crypto.randomUUID();

        await db("users").insert({
          id,
          username,
          email,
          password: await bcrypt.hash(
            password,
            Number(process.env.SALT_ROUNDS)
          ),
        });

        const jwtToken = generateToken(id, email);

        return {
          token: jwtToken,
          message: "User registered successfully",
          user: { id, username, email },
        };
      },
    },
  },
});

export default new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
