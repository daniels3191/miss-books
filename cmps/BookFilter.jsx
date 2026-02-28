const { useState, useEffect } = React

export function BookFilter({ filterBy, setFilterBy }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffect(() => {

        setFilterBy(filterByToEdit)
    }, [filterByToEdit])

    function handleChange(ev) {

        const { type, value, name } = ev.target
        setFilterByToEdit(prev => ({ ...prev, [name]: type === 'number' ? +value : value }))
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

        <label htmlFor="categories">Category:</label>
        <select id="categories" name="category" type='text'
            value={filterByToEdit.category}
            onChange={ev => handleChange(ev)}>
            <option value="">All</option>
            <option value="Love">Love</option>
            <option value="Fiction">Fiction</option>
            <option value="Poetry">Poetry</option>
            <option value="Computers">Computers</option>
            <option value="Religion">Religion</option>
        </select>

    </div>

}