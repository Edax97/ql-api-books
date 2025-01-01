import {api} from "encore.dev/api";

export const qlApi = api(
    {expose: true, method: '*', path: '/book-ql-mw'}, async(req) => {
        return req;
    }
)