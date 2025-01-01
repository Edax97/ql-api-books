import {ApolloServer, BaseContext, ContextFunction} from "@apollo/server";
import {APIError, ErrCode, RawHandler} from "encore.dev/api";
import {IncomingMessage, ServerResponse} from "node:http";
import {json} from "node:stream/consumers";
import {parseHeadToQLS, parseRespToRawApi} from "../parsers";

interface ContextFunArgs {
    req: IncomingMessage;
    res: ServerResponse
}
const baseContextFun: ContextFunction<[ContextFunArgs], any> = async () => ({})

/**
 * Abstraction that handles encore api layer on top of the gql relational service
 * @type <Tcontext> query wide context
 * @param aserver apollo instance
 * @param getContext user defines resolving ctx
 */
export function graphQlHandler<Tcontext extends BaseContext>
(aserver: ApolloServer<Tcontext>, getContext?: ContextFunction<[ContextFunArgs], Tcontext>): RawHandler {
    // not typed endpoint handler
    // errors fall to gql layer
    return async (req, res) => {
        // instance listening
        aserver.assertStarted('Apollo instance not active');
        // compute data relation from query
        const context: ContextFunction<[ContextFunArgs], Tcontext> = getContext || baseContextFun;
        const httpGraphQLRes = await aserver.executeHTTPGraphQLRequest({
            httpGraphQLRequest: {
                headers: parseHeadToQLS(()=> req.headers),
                method: req.method!.toUpperCase(),
                body: await json(req),
                search: new URLSearchParams(req.url ?? "").toString(),
            },
            context: () => context({req, res})
        });
        // error collecting
        if (httpGraphQLRes.status || 200 >= 300) throw new APIError(ErrCode.Internal, 'Apollo server error');
        // parse apollo resp to encore apiraw response listener
        await parseRespToRawApi(httpGraphQLRes,
            (k: string, v: string)=> {res.setHeader(k, v)},
            (c?: string) => {res.write(c || '')},
            (c?: string) => {res.end(c || '')},
            (status: number) => {res.statusCode = status})
    };
}
