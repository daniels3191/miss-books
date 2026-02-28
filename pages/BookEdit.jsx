const { useEffect, useState } = React
const { Link, useParams, useNavigate } = ReactRouterDOM

import { bookService } from '../services/book.service.js'
import { showSuccessMsg } from '../services/event-bus.service.js'

export function BookEdit() {
    const [book, setBook] = useState(bookService.getEmptyBook)

    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (params.id) {
            bookService.get(params.id)
                .then(setBook)
        }
    }, [params.id])

    function handleChange({ target }) {

        const { type, name, value } = target

        setBook(prev => ({ ...prev, [name]: type === 'text' ? value : +value }))
    }

    function onSaveBook(ev) {
        ev.preventDefault()

        bookService.save(book)
            .then(book => {
                console.log(book);
                
                showSuccessMsg(`Book ${book.id} has been saved`)
                navigate('/book')
            })
            .catch(err => showErrorMsg(`Couldn't save ${book.id}`))
    }

    return <section className="book-edit">
        <form onSubmit={onSaveBook}>
            <label htmlFor="title">Title: </label>
            <input
                type="text"
                placeholder="title"
                id="title"
                name="title"
                value={book.title}
                onChange={handleChange}
            />
            <label htmlFor="price">Price: </label>
            <input
                type="number"
                placeholder="pageCount"
                id="pageCount"
                name="pageCount"
                value={book.pageCount || ''}
                onChange={handleChange}
            />
            <Link to='/book'><button type="button">Back</button></Link>
            <button>Save</button>

        </form>
    </section>

}