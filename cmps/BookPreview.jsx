export function BookPreview({book}){
    

    return <article className="book-preview">
        <h1>{book.title}</h1>
        <p>{book.listPrice.amount}</p>
        <img src={book.thumbnail} alt="" />
    </article>


}