
export function BookDetails({ book, onClearSelectedBook }) {

    function pageCountDescription(){
        let str = ''
        if(book.pageCount > 500) str = '(Serious Reading)'
        else if(book.pageCount > 200) str = '(Descent Reading)'
        else if(book.pageCount < 100) str = '(Light Reading)'

        return str
    }

    function pablishedDateDescription(){
        const fullYear = (new Date()).getFullYear()
        let str = ''
        if(fullYear - book.publishedDate > 10) str = '(Vintage)'
        else if (fullYear - book.publishedDate < 1) str = '(New)'

        return str
    }

    return <article className="book-details">
        {/* <pre>{JSON.stringify(book, null, 2)}</pre> */}
        <h1>{book.title}</h1>
        <h2>{book.subtitle}</h2>
        <p>Authors: {book.authors}</p>
        <p>Publishe Date: {book.publishedDate} {pablishedDateDescription()}</p>
        <p>Description: {book.description}</p>
        <p>Page Count: {book.pageCount} {pageCountDescription()}</p>
        <p className="price">Price: {book.listPrice.amount} {book.listPrice.isOnSale && <img src="./assets/img/sale-tag.svg" alt="" /> }</p>
        <p>Is On Sale: </p>
        <img src={book.thumbnail} alt="" />
        <div>
            <button
                onClick={onClearSelectedBook}
                className="btn-clear-selected-book">Back</button>
        </div>

    </article>

}