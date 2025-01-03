import { add, edit, get, list } from "../book-meta/book-query";
const Query = {
    book: async (_p, args) => {
        return await get({ id: args.id });
    },
    books: async () => {
        return (await list()).books;
    }
};
const Mutation = {
    addBook: async (_p, args) => {
        return await add(args.input);
    },
    updateBook: async (_p, args) => {
        return await edit(args.input);
    }
};
export const resolvers = { Query, Mutation };
//# sourceMappingURL=resolvers.js.map