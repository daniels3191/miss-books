export function BookPreview({book}){

    return <article className="book-preview">
        <h1>{book.title}</h1>
        <h2>{book.listPrice.amount}</h2>
    </article>


}