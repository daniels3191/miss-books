const Router = ReactRouterDOM.HashRouter
const { Routes, Route } = ReactRouterDOM

const { useState } = React

import { AppHeader } from "./cmps/AppHeader.jsx"
import { Home } from "./pages/Home.jsx"
import { About } from "./pages/About.jsx"
import { BookIndex } from "./pages/BookIndex.jsx"
import { BookDetails } from "./pages/BookDetails.jsx"
import { bookService } from './services/book.service.js'



export function RootCmp() {
    // const [page, setPage] = useState('books')

    return (
        <Router>
            <section className="app main-layout">
                <AppHeader />
                <main>
                    <Routes>
                       <Route path="/" element={ <Home />}/>      
                       <Route path="/about" element={ <About />}/> 
                       <Route path="/book" element={ <BookIndex />}/> 
                       <Route path="/book/:id" element={ <BookDetails />}/> 
                    </Routes>


                </main>
            </section>
        </Router>
    )
}