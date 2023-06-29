const libraryEl = document.querySelector("#library");
let library = [];
const bookCountEl = document.querySelector("#books");

// Book Constructor
function Book(title,author,published,pages,status){
    this.title = title;
    this.author = author;
    this.published = published;
    this.pages = pages;
    this.status = status;
}

// Adding books to library array
function addBook(book){
    library.push(book);
}

// Making book card
function bookCard(book){
    const bookCardEl = document.createElement("div");
    bookCardEl.classList.add('shadow', 'rounded', 'bg-white', 'p-5');
    bookCardEl.innerHTML = `
            <h3 class="text-3xl font-bold text-center">${book.title}</h3>
            <h3 class="text-xl font-bold">Author: <span class="text-lg font-semibold">${book.author}</span></h3>
            <h3 class="text-xl font-bold">Published: <span class="text-lg font-semibold">${book.published}</span></h3>
            <h3 class="text-xl font-bold">Pages: <span class="text-lg font-semibold">${book.pages}</span></h3>
            <h3 class="text-xl font-bold">Status: <span class="text-lg font-semibold ${book.status === true ? "text-green-500" : "text-yellow-600"}">${book.status === true ? "Read" : "Reading"}</span></h3>
    `
    libraryEl.appendChild(bookCardEl);
}

// Showing book cards
function showLibrary(){
    library.forEach(book => {
        bookCard(book);
    })
}

addBook(new Book("John's Adventure","Jane Wayne",1995,200,false));
addBook(new Book("Jane's Adventure","John Wayne",1990,500,true));
addBook(new Book("Become A Millionare","Chuck Norris",2021,1000,true));
addBook(new Book("Romeo and Juliet","Shakespear",1985,1500,false));
addBook(new Book("Finish What You Start","John Lewis",2021,200,true));
showLibrary();
bookCountEl.textContent = library.length;