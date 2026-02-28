export function ReviewList ({book, removeReview}){

    return <section className="review-list">
                <ul className="">
                    {book.reviews.map(review => <li key={review.id}>
                        <div className="review-container">
                            <p className="name">Name: {review.fullname}</p>
                            <p className="rating">Rate: {review.rating}</p>
                            <button onClick={() => removeReview(book, review.id)}>delete</button>
                        </div>
                    </li>)}
                </ul>
    </section>

}