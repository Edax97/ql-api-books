import {ApolloServer} from "@apollo/server";
import {api} from "encore.dev/api";
import {readFileSync} from "node:fs";

import {handlerToQLS} from "../as-encore/handlers/raw";
import {resolvers} from "./resolvers";

const typeDefs = readFileSync('./graphql/book-ql.schema.graphql', {encoding: 'utf8'});

const server = new ApolloServer({
    typeDefs,
    resolvers
} )
await server.start()

export const rawBookQlAPI = api.raw(
    {method: '*', expose: true, path: '/graphql'}, handlerToQLS(server)
    )