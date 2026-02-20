const { useState, useEffect } = React

export function BookFilter({ filterBy, setFilterBy }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
    
 useEffect(() => {

    setFilterBy(filterByToEdit)

 }, [filterByToEdit])

    function handleChange(ev) {

        const { type, value, name } = ev.target
        setFilterByToEdit(prev => ({ ...prev, [name]: type === 'text' ? value : +value}))
    }

    return <div className="book-filter">
        <p>Search:</p>
        <input type="text"
            value={filterByToEdit.title}
            onChange={ev => handleChange(ev)}
            name="title"
            placeholder="Title" />

        <input type="number"
            value={filterByToEdit.price || ''}
            onChange={ev => handleChange(ev)}
            name="price" 
            placeholder="Price" />
            
    </div>

}