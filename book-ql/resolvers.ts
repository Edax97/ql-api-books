import {add, edit, get, list} from "../book-meta/book-query";
import {MutationResolvers, QueryResolvers, Resolvers} from "../graphql/__generated__/book-ql.types";

const Query: QueryResolvers = {
    book: async (_p, args) => {
        return await get({id : args.id});
    },
    books: async () => {
        return await list();
    }
}
const Mutation: MutationResolvers = {
    addBook: async (_p, args) => {
        return await add(args.input);
    },
    updateBook: async(_p, args) => {
        return await edit(args.input)
    }
}

export const resolvers: Resolvers = { Query, Mutation }

