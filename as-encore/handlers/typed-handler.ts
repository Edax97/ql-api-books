import {ApolloServer, BaseContext, ContextFunction} from "@apollo/server";
import {APICallMeta} from "encore.dev";
import {
    APIError,
    ErrCode,
    HandlerResponse,
    middleware,
    MiddlewareOptions,
    MiddlewareRequest,
    ResponseHeader
} from "encore.dev/api";
import {parseHeadToQLS, parseRespToRawApi} from "../parsers";

interface ContextArgs {
    req: MiddlewareRequest;
}

const baseContextFun: ContextFunction<[ContextArgs], any> = async () => ({})
const baseOptions: MiddlewareOptions = {target: {isRaw: false}};

export const mddlwGql = <Tcontext extends BaseContext>(aserver: () => ApolloServer<Tcontext>, getContext?: ContextFunction<[ContextArgs], Tcontext>, mddlwOptions?: MiddlewareOptions) =>
    middleware(mddlwOptions || baseOptions, async (req, next) => {
        aserver().assertStarted('Apollo instance not active')

        const context = getContext || baseContextFun;

        const requestMeta = req.requestMeta as APICallMeta;
        const httpGraphQLRes = await (aserver().executeHTTPGraphQLRequest({
            httpGraphQLRequest: {
                headers: parseHeadToQLS(() => requestMeta.headers),
                method: requestMeta.method!.toUpperCase(),
                body: JSON.parse(requestMeta.parsedPayload?.body as string),
                search: new URLSearchParams(requestMeta.path || '').toString()
            },
            context: () => context({req})
        }));
        if (httpGraphQLRes.status || 200 >= 300) throw new APIError(ErrCode.Internal, 'Apollo server error');

        const resPayload = {headers: new ResponseHeader(), status: httpGraphQLRes.status || 200};
        let bodyString = ''
        await parseRespToRawApi(httpGraphQLRes,
            (k: string, v: string) => {resPayload.headers.add(k, v)},
            (c?: string) => {bodyString.concat(c || '')}
            )

        await next(req);

        return new HandlerResponse({...resPayload, body: JSON.parse(bodyString)});
})
