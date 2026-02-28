export function ReviewList ({book, removeReview}){
   
    function ratingStars(rating){
         let str = ''
         for(var i = 0; i < rating; i++){
                str += '⭐'
            }
            return str
        

    }
    return <section className="review-list">
                <ul className="">
                    {book.reviews.map(review => <li key={review.id}>
                        <div className="review-container">
                            <p className="name">Name: {review.fullname}</p>
                            <p className="rating">Rate: {ratingStars(review.rating)}</p>
                            <button onClick={() => removeReview(book, review.id)}>delete</button>
                        </div>
                    </li>)}
                </ul>
    </section>

}