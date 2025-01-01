import {ApolloServer} from "@apollo/server";
import {Service} from "encore.dev/service";
import {readFileSync} from "node:fs";
import {mwToQLS} from "../as-encore/handlers/typed-handler";
import {resolvers} from "../book-ql/resolvers";

const typeDefs = readFileSync('./graphql/book-ql.schema.graphql', {encoding: 'utf8'});
const as = new ApolloServer({typeDefs, resolvers})

export default new Service('book-ql-mw',
    {middlewares: [mwToQLS(as)]})