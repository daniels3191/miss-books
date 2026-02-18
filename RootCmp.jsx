const { useState } = React

import { AppHeader } from "./cmps/AppHeader.jsx"
import { Home } from "./pages/Home.jsx"
import { About } from "./pages/About.jsx"
import { BookIndex } from "./pages/bookIndex.jsx"
import { bookService } from '../services/book.service.js'

window.bookService = bookService


export function RootCmp() {
    const [page, setPage] = useState('home')

    return <section className="app main-layout">
        <AppHeader page={page} onSetPage={setPage} />
        <main>
            {page === 'home' && <Home />}
            {page === 'about' && <About />}
            <BookIndex />
            
        </main>
    </section>
}