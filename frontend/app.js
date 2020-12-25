require('./styles/index.css');

const UI = require('./UI');
const ui  = new UI();

document.addEventListener('DOMContentLoader', ui.renderBooks());

document.getElementById('book-form')
    .addEventListener('submit', e => {
        e.preventDefault();

        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const isbn = document.getElementById('isbn').value;
        const image = document.getElementById('image').files;

        const formData = new FormData();

        formData.append('title',title);
        formData.append('author',author);
        formData.append('isbn',isbn);
        formData.append('image',image[0]);
        console.log(formData.entries());

        ui.addNewBook(formData);
        console.log()
    })


document.getElementById('books-cards')
    .addEventListener('click', (e)=>{
        e.preventDefault();

        if(e.target.classList.contains('delete')){
            console.log(e.target.getAttribute('_id'));
            ui.deleteBook(e.target.getAttribute('_id'));
        }
    })


