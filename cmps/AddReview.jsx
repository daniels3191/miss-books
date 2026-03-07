const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouterDOM

import { bookService } from '../services/book.service.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'

export function AddReview() {

    const [review, setReview] = useState(bookService.getEmptyReview())
    const [book, setBook] = useState(null)

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

        setReview(prev => ({ ...prev, [name]: type === 'text' ? value : +value }))
    }

    function onSaveReview(ev) {
        ev.preventDefault()
        bookService.addReview(book.id, review)
            .then(() => {
                showSuccessMsg(`The review for the book ${book.id} has been saved`)
                navigate(`/book/${book.id}`)
            })
            .catch(err => showErrorMsg(`Couldn't save the review for ${book.id}`))
    }

    return <form onSubmit={onSaveReview} className="add-review">
        <h1>Add review</h1>
        <label htmlFor="fullname">Full name: </label>
        <input
            type="text"
            placeholser="Fullname"
            id="fullname"
            name="fullname"
            value={review.fullname}
            onChange={handleChange}
        />
        <label htmlFor="rating">Rating: </label>
        <select id="rating" name="rating" type="text" required
            value={review.ratimg}
            onChange={handleChange}>
            <option value=""></option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
        </select>

        <button>Save</button>

    </form>
}