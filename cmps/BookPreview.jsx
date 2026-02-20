export function BookPreview({book}){
    
    function classList(){
        classList = []
        if(book.listPrice.amount > 150) classList.push('red')
            else if (book.listPrice.amount < 20) classList.push('green')

                return classList
    }

    return <article className="book-preview">
        <h1>{book.title}</h1>
        <span className="on-sale-sign">{book.listPrice.isOnSale && <img src="./assets/img/sale-tag.svg" alt="" />}</span>
        <p className={classList()}>Price: {book.listPrice.amount}</p>
        <img src={book.thumbnail} alt="" />
        <p>Page Count: {book.pageCount}</p>
    </article>


}