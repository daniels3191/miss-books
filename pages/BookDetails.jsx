
export function BookDetails({book, onClearSelectedBook}){

    return <section className="car-details">
                <pre>{JSON.stringify(book, null, 2)}</pre>
                <div>
                <button onClick={onClearSelectedBook} className="btn-clear-selected-book">Back</button>
                </div>
        
    </section>

}