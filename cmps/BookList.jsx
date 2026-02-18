import { BookPreview } from "./BookPreview.jsx";

export function BookList({books}){


    return <section className="book-list">
        <ul className="fluid-grid">
            {books.map(book => <li key={book.id}>

                <BookPreview book = {book} />
            </li> )}
        </ul>
    </section>

}