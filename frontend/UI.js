const BookService = require('./services/BookService');
const bookService = new BookService();
const {format} = require('timeago.js');

class UI{

    async renderBooks(){
        const books = await bookService.getBook();
        const booksCardContainer = document.getElementById('books-cards');
        booksCardContainer.innerHTML = '';

        console.log(books);

        books.forEach( b => {
            const div = document.createElement('div');
            div.className = '';
            div.innerHTML = 
                `<div class='card md-2'>
                    <div class='row'>
                        <div class='col-md-4'>
                            <img src="http://localhost:3000${b.imgPath}" alt="" class='img-fluid'/>
                        </div>
                        <div class='col-md-8'>
                            <div class='card-block px-2'>
                                <h4 class='card-title'>${b.title} </h4>
                                <p class='card-text'>${b.author} </p>
                                <a href='#' class='btn btn-danger delete' _id="${b._id}">X</a>
                            </div>
                        </div>
                    </div>
                    <div class='card-footer'>
                        ${format(b.createdAt)}
                    </div>
                </div>`;
            booksCardContainer.appendChild(div);
        });
    }

    async addNewBook(book){
        await bookService.postBook(book);
        this.clearBookForm()
    }

    clearBookForm(){
        document.getElementById('book-form').reset();
    }

    renderMessage(message, colorMessage, secondsToRemove) {
        // Creating a div
        const div = document.createElement('div');
        // Styling the div
        div.className = `message ${colorMessage}`;
        // Adding Text to the div
        div.appendChild(document.createTextNode(message));
        // Puting in the documnet
        const container = document.querySelector('.col-md-4');
        const bookForm = document.querySelector('#book-form');
        container.insertBefore(div, bookForm);
        // Removing the div after some secconds
        setTimeout(() => {
          document.querySelector('.message').remove();
        }, secondsToRemove);
      }

    async deleteBook(bookId){
        await bookService.deleteBook(bookId);
        this.renderBooks();
    }
}


module.exports = UI;



