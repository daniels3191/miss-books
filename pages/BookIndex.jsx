const { useState, useEffect } = React

import { BookList } from '../cmps/BookList.jsx'
import { bookService } from '../services/book.service.js'
import { BookDetails } from './BookDetails.jsx'



export function BookIndex() {
    const [books, setBooks] = useState(null)
    const [selectedBook, setSelectedBook] = useState(null)

    useEffect(() => {
        loadBooks()
    }, [])

    function loadBooks() {
        return bookService.query()
            .then(setBooks)
    }

    function removeBook(bookId) {
        return bookService.remove(bookId)
            .then(() => setBooks(prevBooks => prevBooks.filter(book => book.id !== bookId)))
    }



    if (!books) return <div className="loader">
        <img src="./assets/img/loader.svg" alt="" />
    </div>

    return <div className="book-index">
        {!selectedBook &&
            <BookList
                books={books} onRemoveBook={removeBook}
                onSelectedBook={setSelectedBook} />}


        {selectedBook &&
            <BookDetails
                book={selectedBook}
                onClearSelectedBook={() => setSelectedBook(null)} />}


    </div>

}

