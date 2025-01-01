import {ApolloServer, BaseContext, ContextFunction, HeaderMap} from "@apollo/server";
import {IncomingHttpHeaders, IncomingMessage, ServerResponse} from "node:http";
import {json} from "node:stream/consumers";
import {RawHandler} from "../../../../.encore/runtimes/js/encore.dev/api/mod";

interface ContextFunArgs{
    req: IncomingMessage;
    res: ServerResponse<IncomingMessage>
}

const baseContextFun : ContextFunction<[ContextFunArgs], any> = async () => ({})
export function graphQlHandler<Tcontext extends BaseContext>
    (aserver: ApolloServer<Tcontext>, getContext?: ContextFunction<[ContextFunArgs], Tcontext>): RawHandler{
    // Handles requests to api.raw defined endpoints
    return async (req, res) => {
        aserver.assertStarted('Apollo instance not active');

        const context: ContextFunction<[ContextFunArgs], Tcontext> = getContext || baseContextFun;
        // Handle the request and response here
        const headers = gQLHeaders(()=>req.headers);
        const httpGraphQLRes = await aserver.executeHTTPGraphQLRequest({
            httpGraphQLRequest: {
                headers,
                method: req.method!.toUpperCase(),
                body: await json(req),
                search: new URLSearchParams(req.url ?? "").toString(),
            },
            context: () => context({req, res})
        });

        for (const [key, value] of httpGraphQLRes.headers) {
            res.setHeader(key, value);
        }
        res.statusCode = httpGraphQLRes.status || 200;

        if (httpGraphQLRes.body.kind === "complete") {
            res.end(httpGraphQLRes.body.string);
            return;
        }

        for await (const chunk of httpGraphQLRes.body.asyncIterator) {
            res.write(chunk);
        }
        res.end();
    };
}
const gQLHeaders = (reqHeaders: () => IncomingHttpHeaders) => {
    const headers = new HeaderMap()
    for (const [key, value] of Object.entries(reqHeaders() )) {
        if (!value) continue;
        headers.set(key, Array.isArray(value) ? value.join(", ") : value);
    }
    return headers;
}
