// @ts-ignore
import { api, APIError, ErrCode } from "encore.dev/api";
import { SQLDatabase } from "encore.dev/storage/sqldb";
import resolveIterator from "../user-modules/resolve-iterator";
/** Query every ${Book} record from  pg ${book_meta} table */
export const list = api({ path: '/', method: 'GET', expose: true }, async () => {
    const books = await resolveIterator(bookMetaDB.query `SELECT *
                                                                  FROM book_meta;`);
    return { books };
});
export const get = api({ path: '/:id', method: 'GET', expose: true }, async ({ id }) => {
    const book = (await bookMetaDB.queryRow `SELECT *
                                            FROM book_meta
                                            WHERE id = ${+id}`);
    if (!book)
        throw new APIError(ErrCode.NotFound, `Book with id ${id} not found`);
    return book;
});
/** Insert i(new Book record)
 * Resolve to inserted Book or apierror
 * */
export const add = api({ expose: true, method: 'POST', path: '/add' }, async (book) => {
    try {
        await bookMetaDB.exec `INSERT INTO book_meta (title, author, genre)
                                                    VALUES (${book.title || ''}, ${book.author || ''},
                                                            ${book.genre || ''})`;
    }
    catch (error) {
        throw new APIError(ErrCode.AlreadyExists, `Book already exists`);
    }
    return { status: 'ok', message: 'Successful addition' };
});
/** Edit id-Book to input-Book
 * Resolve: edited book or Apierror
 */
export const edit = api({ expose: true, method: 'POST', path: '/update' }, async (book) => {
    try {
        await bookMetaDB.exec `UPDATE book_meta 
                              SET (title,author,genre) = (${book.title || ''}, ${book.author || ''}, ${book.genre || ''}) 
                              WHERE id = ${+book.id}`;
        //await bookMetaDB.
    }
    catch (e) {
        throw new APIError(ErrCode.Aborted, `Could not update book`);
    }
    return { status: 'ok', message: 'Successful edition', book };
});
export const deleteObject = api({ expose: true, method: 'DELETE', path: '/delete' }, async ({ id }) => {
    await bookMetaDB.exec `DELETE from book_meta WHERE id=${+id}`;
});
// Query pgSQL db with an orm library
const bookMetaDB = new SQLDatabase('book-meta', { migrations: './migrations' });
//# sourceMappingURL=book-query.js.map