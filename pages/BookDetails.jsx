const { useState, useEffect } = React
const { Link, useParams } = ReactRouterDOM

import { bookService } from '../services/book.service.js'
import { LongTxt } from "../cmps/LongTxt.jsx"

export function BookDetails() {

    const [book, setBook] = useState(null)

    const params = useParams()
    console.log(params);

    useEffect(() => {
        bookService.get(params.id)
            .then(setBook)

    }, [book])

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

    if (!book) return <div className="loader">
        <img src="./assets/img/loader.svg" alt="" />
    </div>

    console.log(book);

    return <article className="book-details">

        {/* <pre>{JSON.stringify(book, null, 2)}</pre> */}
        <h1>{book.title}</h1>
        <h2>{book.subtitle}</h2>
        <p>Authors: {book.authors}</p>
        <p>Publishe Date: {book.publishedDate} {pablishedDateDescription()}</p>
        {/* <p>Description: {book.description}</p> */}
        <p className="description">Description: <LongTxt txt={book.description} /></p>
        <p>Page Count: {book.pageCount} {pageCountDescription()}</p>
        <p className="price">Price: {book.listPrice.amount} {book.listPrice.isOnSale && <img src="./assets/img/sale-tag.svg" alt="" />}</p>
        <img src={book.thumbnail} alt="" />
        <nav>
            <Link to={`/book/${book.prevBookId}`}><button>Prev</button></Link>
            <Link to={`/book/${book.nextBookId}`}><button>Next</button></Link>
            <Link to='/book'><button>Back</button></Link>
        </nav>

    </article>

}