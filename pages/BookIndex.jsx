const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM

import { bookService } from '../services/book.service.js'
import { BookFilter } from '../cmps/BookFilter.jsx'
import { BookList } from '../cmps/BookList.jsx'
import { showSuccessMsg } from '../services/event-bus.service.js'
import { utilService } from '../services/util.service.js'

export function BookIndex() {
    const [books, setBooks] = useState(null)
    const [ searchParams, setSearchParams ] = useSearchParams()
    const [filterBy, setFilterBy] = useState(bookService.getFilterFromSearchParms(searchParams))
    

    useEffect(() => {
        loadBooks()
        setSearchParams(utilService.trimObj(filterBy))
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
                showSuccessMsg(`Book ${bookId} has been removed`)
            })
            .catch(err => showErrorMsg(`Couldn't remove ${carId}`))
    }

    if (!books) return <div className="loader">
        <img src="./assets/img/loader.svg" alt="" />
    </div>

    return <div className="book-index">

        <React.Fragment>
            <BookFilter
                filterBy={filterBy}
                setFilterBy={setFilterBy} />
                <Link to={`/book/edit`}><button>Add a book</button></Link>
            <BookList
                books={books} onRemoveBook={onRemoveBook} />
        </React.Fragment>
    </div>
}

