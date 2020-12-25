const { get } = require("mongoose");


class BookService{
    constructor(){
        this.URI = 'http://localhost:3000/api/books';

    }

    async getBook(){
        const response = await fetch(this.URI);
        const books = response.json();
        return books;
    }

    async postBook(book){
        const response = await fetch(this.URI,{
            method: 'POST',
            body: book
        })
        const data = response.json();
        return data;
    }

    async deleteBook(bookId){
        const response = await fetch(`${this.URI}/${bookId}`, {
            headers:{
                'Content-Type':'aplication/json'
            },
            method: 'DELETE'
        })
        const data = response.json();
    }
}



module.exports = BookService;




