import {ApolloServer, HeaderMap} from "@apollo/server";
import {api} from "encore.dev/api";
import {readFileSync} from "node:fs";
import {json} from "node:stream/consumers";
import {resolvers} from "./resolvers";

export const bookGraphQl = api<any, any>(
    {method: '*', expose: true, path: '/'},
    async ()=>{
        return null;
    }
)
const typeDefs = readFileSync('../graphql/book-ql.schema.graphql', {encoding: 'utf8'});

const server = new ApolloServer({
    typeDefs,
    resolvers
})
await server.start()

export const rawBookQlAPI = api.raw(
    {method: '*', expose: true, path: '/'},
        async (req, res) => {
    server.assertStarted("/graphql");

    const headers = new HeaderMap();
    for (const [key, value] of Object.entries(req.headers)) {
        if (value !== undefined) {
            headers.set(key, Array.isArray(value) ? value.join(", ") : value);
        }
    }

    // More on how to use executeHTTPGraphQLRequest: https://www.apollographql.com/docs/apollo-server/integrations/building-integrations/
    const httpGraphQLResponse = await server.executeHTTPGraphQLRequest({
        httpGraphQLRequest: {
            headers,
            method: req.method!.toUpperCase(),
            body: await json(req),
            search: new URLSearchParams(req.url ?? "").toString(),
        },
        context: async () => {
            return { req, res };
        },
    });

    for (const [key, value] of httpGraphQLResponse.headers) {
        res.setHeader(key, value);
    }
    res.statusCode = httpGraphQLResponse.status || 200;

    if (httpGraphQLResponse.body.kind === "complete") {
        res.end(httpGraphQLResponse.body.string);
        return;
    }

    for await (const chunk of httpGraphQLResponse.body.asyncIterator) {
        res.write(chunk);
    }
    res.end();
        }
)