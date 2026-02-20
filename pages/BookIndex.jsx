const { useState, useEffect } = React

import { bookService } from '../services/book.service.js'
import { BookFilter } from '../cmps/BookFilter.jsx'
import { BookList } from '../cmps/BookList.jsx'
import { BookDetails } from './BookDetails.jsx'




export function BookIndex() {
    const [books, setBooks] = useState(null)
    const [selectedBook, setSelectedBook] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())


    useEffect(() => {
        loadBooks()
    }, [filterBy])

    function loadBooks() {
        return bookService.query(filterBy)
            .then(setBooks)
    }

    function removeBook(bookId) {
        return bookService.remove(bookId)
            .then(() =>{
                setBooks(prevBooks => prevBooks.filter(book => book.id !== bookId))
                setFilterBy(bookService.getDefaultFilter())

            } 
                )
    }



    if (!books) return <div className="loader">
        <img src="./assets/img/loader.svg" alt="" />
    </div>

    return <div className="book-index">
        {!selectedBook &&
            <React.Fragment>
                <BookFilter 
                filterBy={filterBy}
                setFilterBy={setFilterBy}/>
                <BookList
                    books={books} onRemoveBook={removeBook}
                    onSelectedBook={setSelectedBook} />
            </React.Fragment>}

        {selectedBook &&
            <BookDetails
                book={selectedBook}
                onClearSelectedBook={() => setSelectedBook(null)} />}

    </div>

}

