const { useState, useEffect } = React

import { bookService } from '../services/book.service.js'


export function BookIndex() {
    const [books, setBooks] = useState(null)

    useEffect(() => {
        loadBooks()
    }, [])

    function loadBooks() {
        return bookService.query()
            .then(setBooks)
    }

    if (!books) return <div className="loader">
        <img src="./assets/img/loader.svg" alt="" />
    </div>

    return <div className="book-index">
        <pre>{JSON.stringify(books, null, 2)}</pre>
    </div>

}

