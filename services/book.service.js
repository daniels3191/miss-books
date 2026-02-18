import { utilService } from './util.service.js';
import { storageService } from './async-storage.service.js';

const BOOK_KEY = 'bookDB'
_createBooks()

export const bookService ={
    query
}

function query() {
    return storageService.query(BOOK_KEY)
}


function _createBooks() {
    let books = utilService.loadFromStorage(BOOK_KEY)
    if (!books || !books.length) {
        books = []
        for (let i = 0; i < 3; i++) {
            books.push(_createBook(i))
        }
        utilService.saveToStorage(BOOK_KEY, books)
        console.log(books);

    }
}

function _createBook(idx) {
    const currency = ['EUR', 'USD', 'NIS']
    const book = {}
    book.id = utilService.makeId()
    book.title = utilService.makeLorem(2)
    book.description = utilService.makeLorem(10)
    book.thumbnail = `http://ca.org/books-photos/${idx + 1}.jpg`
    book.listPrice = {
        "amount": utilService.getRandomIntInclusive(30, 199),
        "currencyCode": currency[utilService.getRandomIntInclusive(0, 2)],
        "isOnSale": false
    }
    console.log(utilService.getRandomIntInclusive(0, 2));
    
    return book
}