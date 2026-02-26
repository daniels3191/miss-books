const { useState, useEffect } = React

import { bookService } from '../services/book.service.js'
import { BookFilter } from '../cmps/BookFilter.jsx'
import { BookList } from '../cmps/BookList.jsx'
import { BookDetails } from './BookDetails.jsx'

export function BookIndex() {
    const [books, setBooks] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())

    useEffect(() => {
        loadBooks()
    }, [filterBy])

    function loadBooks() {
        return bookService.query(filterBy)
            .then(setBooks)
    }

    function onRemoveBook(bookId) {
        return bookService.remove(bookId)
            .then(() => {
                setBooks(prevBooks => prevBooks.filter(book => book.id !== bookId))
                setFilterBy(bookService.getDefaultFilter())
            })
    }

    if (!books) return <div className="loader">
        <img src="./assets/img/loader.svg" alt="" />
    </div>

    return <div className="book-index">

        <React.Fragment>
            <BookFilter
                filterBy={filterBy}
                setFilterBy={setFilterBy} />
            <BookList
                books={books} onRemoveBook={onRemoveBook} />
        </React.Fragment>


    </div>
}

