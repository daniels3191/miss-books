import { utilService } from './util.service.js';
import { storageService } from './async-storage.service.js';

const BOOK_KEY = 'bookDB'
_createBooks()

export const bookService = {
    query,
    get,
    remove,
    getDefaultFilter
}

function query(filterBy = {}) {

    return storageService.query(BOOK_KEY)
        .then(books => {

            if (filterBy.title) {
                const regExp = new RegExp(filterBy.title, 'i')
                books = books.filter(book => regExp.test(book.title))
            }
            if (filterBy.price) {
                books = books.filter(book => filterBy.price <= book.listPrice.amount)
            }
            if (filterBy.category) {
                books = books.filter(book => filterBy.category === book.categories[0])
            }
            return books
        })
}

function get(bookID) {
    return storageService.get(BOOK_KEY, bookID)
}

function remove(bookID) {
    return storageService.remove(BOOK_KEY, bookID)

}

function getDefaultFilter(filterBy = { title: '', price: 0, category: '' }) {
    return { title: filterBy.title, price: filterBy.price, category: filterBy.category }
}

function _createBooks() {
    let books = utilService.loadFromStorage(BOOK_KEY)
    if (!books || !books.length) {
        const ctgs = ['Love', 'Fiction', 'Poetry', 'Computers', 'Religion']
        books = []
        for (let i = 0; i < 20; i++) {
            const book = {
                id: utilService.makeId(),
                title: utilService.makeLorem(2),
                subtitle: utilService.makeLorem(4),
                authors: [
                    utilService.makeLorem(1)
                ],
                publishedDate: utilService.getRandomIntInclusive(1950, 2026),
                description: utilService.makeLorem(20),
                pageCount: utilService.getRandomIntInclusive(20, 600),
                categories: [ctgs[utilService.getRandomIntInclusive(0, ctgs.length - 1)]],
                thumbnail: `./assets/img/${i + 1}.jpg`,
                language: "en",
                listPrice: {
                    amount: utilService.getRandomIntInclusive(5, 550),
                    currencyCode: "EUR",
                    isOnSale: Math.random() > 0.7
                }
            }
            books.push(book)
        }
    }
    utilService.saveToStorage(BOOK_KEY, books)
}


// function _createBooks() {
//     let books = utilService.loadFromStorage(BOOK_KEY)
//     if (!books || !books.length) {
//         books = []
//         const booksTitle = ['GWENT', 'BETWEEN HERE AND GONE', 'MAGIC LAMTERN']
//         for (let i = 0; i < 3; i++) {
//             books.push(_createBook(i, booksTitle[i]))
//         }
//         utilService.saveToStorage(BOOK_KEY, books)
//     }
// }

// function _createBook(idx, title) {
//     const currency = ['EUR', 'USD', 'NIS']
//     const book = {}
//     book.id = utilService.makeId()
//     book.title = title
//     book.description = utilService.makeLorem(10)
//     book.thumbnail = `./assets/img/${idx + 1}.jpg`
//     book.listPrice = {
//         "amount": utilService.getRandomIntInclusive(30, 199),
//         "currencyCode": currency[utilService.getRandomIntInclusive(0, 2)],
//         "isOnSale": false
//     }
//     console.log(utilService.getRandomIntInclusive(0, 2));

//     return book
// }