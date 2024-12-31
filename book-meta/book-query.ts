import {api, APIError, ErrCode} from "encore.dev/api";
import {SQLDatabase} from "encore.dev/storage/sqldb";
import {AddRes, Book, BookFilterInput, BookUpdateInput, UpdateRes} from "../graphql/__generated__/book-ql.types";
import resolveIterator from "../user-modules/resolve-iterator";


/** Query every ${Book} record from  pg ${book_meta} table */
export const list = api<void, Book[]>(
    {path: '/', method: 'GET', expose: true}, async () => {
        return await resolveIterator<Book>(bookMetaDB.query<Book>`SELECT *
                                                                  FROM book_meta;`);
    })

/** Query id-${Book} record
 * Resolves to {book} if found or apierror otherwise
 * */
interface getT {id: string}
export const get = api<getT, Book>
({path: '/:id', method: 'GET', expose: true}, async ({id}) => {
    const book = (await bookMetaDB.queryRow<Book>`SELECT *
                                            FROM book_meta
                                            WHERE id = ${+id}`);
    if (!book) throw new APIError(ErrCode.NotFound, `Book with id ${id} not found`);
    return book;
})

/** Insert i(new Book record)
 * Resolve to inserted Book or apierror
 * */
export const add = api<BookFilterInput, AddRes>
({expose: true, method: 'POST', path: '/'},
    async (book) => {
        try {
            await bookMetaDB.exec`INSERT INTO book_meta (title, author, genre)
                                                    VALUES (${book.title || ''}, ${book.author || ''},
                                                            ${book.genre || ''})`;
        } catch (error) {
            throw new APIError(ErrCode.AlreadyExists, `Book already exists`);

        }
        return {status: 'ok', message: 'Successful addition'};
    });

/** Edit id-Book to input-Book
 * Resolve: edited book or Apierror
 */
export const edit = api<BookUpdateInput, UpdateRes>(
    {expose: true, method: 'POST', path: '/update'},
    async (book) => {
        try {
            await bookMetaDB.exec`UPDATE book_meta 
                              SET (title, author, genre) = (${book.title || ''}, ${book.author || ''}, ${book.genre || ''}) 
                              WHERE id = ${+book.id}`;
        } catch (e) {
            throw new APIError(ErrCode.Aborted, `Could not update book`);
        }
        return {status: 'ok', message: 'Successful edition', book};
    }
    );

// Query pgSQL db with an orm library
const bookMetaDB = new SQLDatabase('book-meta', {migrations: './migrations'});