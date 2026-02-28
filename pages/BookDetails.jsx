const { useState, useEffect } = React
const { Link, useParams, useNavigate } = ReactRouterDOM

import { bookService } from '../services/book.service.js'
import { LongTxt } from "../cmps/LongTxt.jsx"
import { ReviewList } from '../cmps/ReviewList.jsx'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'

export function BookDetails() {

    const [book, setBook] = useState(null)

    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        bookService.get(params.id)
            .then(setBook)

    }, [params.id])

    function pageCountDescription() {
        let str = ''
        if (book.pageCount > 500) str = '(Serious Reading)'
        else if (book.pageCount > 200) str = '(Descent Reading)'
        else if (book.pageCount < 100) str = '(Light Reading)'

        return str
    }

    function pablishedDateDescription() {
        const fullYear = (new Date()).getFullYear()
        let str = ''
        if (fullYear - book.publishedDate > 10) str = '(Vintage)'
        else if (fullYear - book.publishedDate < 1) str = '(New)'

        return str
    }

    function onRemoveReview(book, reviewId) {

        const reviewIdx = book.reviews.findIndex(review => review.id === reviewId)
        book.reviews.splice(reviewIdx, 1)
        bookService.save(book)
            .then(book => {
                showSuccessMsg(`The review on the book ${book.id} has been removed`)
                navigate(`/book/${book.id}`)
            })
            .catch(err => showErrorMsg(`Couldn't remove the book review`))
    }

    if (!book) return <div className="loader">
        <img src="./assets/img/loader.svg" alt="" />
    </div>

    return <article className="book-details">

        {/* <pre>{JSON.stringify(book, null, 2)}</pre> */}
        <h1>{book.title}</h1>
        <h2>{book.subtitle}</h2>
        <p>Authors: {book.authors}</p>
        <p>Publishe Date: {book.publishedDate} {pablishedDateDescription()}</p>
        <div className="description">
            <span>Description: </span>
            <LongTxt txt={book.description} />
        </div>
        <p>Page Count: {book.pageCount} {pageCountDescription()}</p>
        <p className="price">Price: {book.listPrice.amount} {book.listPrice.isOnSale && <img src="./assets/img/sale-tag.svg" alt="" />}</p>
        <img src={book.thumbnail} alt="" />
        <div className="reviews">
            <h1>Reviews</h1>
            <ReviewList book={book} removeReview={onRemoveReview} />
            <Link to={`/book/review/${book.id}`}><button className="btn-add-review">Add review</button></Link>

        </div>
        <nav>
            <Link to={`/book/${book.prevBookId}`}><button>Prev</button></Link>
            <Link to={`/book/${book.nextBookId}`}><button>Next</button></Link>
            <Link to='/book'><button>Back</button></Link>
        </nav>

    </article>

}