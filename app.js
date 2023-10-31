const libraryEl = document.querySelector("#library");
const libraryDivEl = document.querySelector("#library-div");
const formEl = document.querySelector("#book-form");
const newBookBtn = document.querySelector("#add-new");
const closeEl = document.querySelector("#close");

// Form
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const publishedInput = document.querySelector("#published");
const pagesInput = document.querySelector("#pages");
const radioBtns = document.getElementsByName("status");
const createBtn = document.querySelector("#create");

let library = [];
const bookCountEl = document.querySelector("#books");
let dataAtt;

// Book Constructor
function Book(title,author,published,pages,status){
    this.title = title;
    this.author = author;
    this.published = published;
    this.pages = pages;
    this.status = status;
}

//* Functions

// Adding books to library array
function addBook(){
    const status = document.querySelector('input[name="status"]:checked').value;
    const newBook = new Book(titleInput.value,authorInput.value,publishedInput.value,pagesInput.value,status === "Reading" ? false : true);
    if(!titleInput.value && !authorInput.value && !publishedInput.value && !pagesInput.value && !status){
        alert("Oops. Looks like your missing some information!");
    }else{
        library.length === 0 ? dataAtt = 0 : dataAtt = library.length;
        library.push(newBook);
        titleInput.value = "";
        authorInput.value = "";
        publishedInput.value = "";
        pagesInput.value = "";
        formEl.classList.toggle("hidden");
        radioBtns.forEach((radio) => {
            radio.checked = false;
        });
        libraryDivEl.classList.toggle("hidden");
        bookCard(newBook);
        bookCountEl.textContent = library.length;
        library.length !== 0 && libraryEl.childNodes[1].classList.add("hidden");
    }
    event.preventDefault();
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
            <h3 class="text-xl font-bold">Status: <span class="text-lg font-semibold status-text ${book.status === true ? "text-green-500" : "text-yellow-500"}">${book.status === true ? "Read" : "Reading"}</span></h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                <button class="delete flex items-center justify-center text-white font-bold py-2 px-3 bg-red-600 rounded transition delay-600 duration-500 hover:bg-red-700 mt-1">Remove
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash ml-1" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M4 7l16 0"></path>
                    <path d="M10 11l0 6"></path>
                    <path d="M14 11l0 6"></path>
                    <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
                    <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
                    </svg>
                </button>
                <button class="status flex items-center justify-center text-white font-bold py-2 px-3 ${book.status === true ? "bg-green-600 hover:bg-green-700" : "bg-yellow-500 hover:bg-yellow-600"} rounded transition delay-600 duration-500 mt-1">Change Status
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-book-2 ml-1" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M19 4v16h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12z"></path>
                    <path d="M19 16h-12a2 2 0 0 0 -2 2"></path>
                    <path d="M9 8h6"></path>
                </svg>
                </button>
            </div>
    `
    bookCardEl.dataset.item = dataAtt;
    libraryEl.appendChild(bookCardEl);

    // Update Reading Status
    // const statusBtns = document.querySelectorAll(".status");
    // statusBtns.forEach(statusBtn => {
    //     statusBtn.addEventListener("click",() => {
    //         if(statusBtn.classList.contains("bg-green-600")){
    //             statusBtn.classList.remove("bg-green-600","hover:bg-green-700");
    //             statusBtn.classList.add("bg-yellow-500","hover:bg-yellow-600");
    //         }else{
    //             statusBtn.classList.remove("bg-yellow-500","hover:bg-yellow-600");
    //             statusBtn.classList.add("bg-green-600","hover:bg-green-700");
    //         }
    //         book.status = !book.status;
    //         const statusTexts = bookCardEl.querySelectorAll(".status-text");
    //         statusTexts.forEach(statusText => {
    //             statusText.textContent = book.status ? "Read" : "Reading";
    //             if(statusText.classList.contains("text-green-500")){
    //                 statusText.classList.remove("text-green-500");
    //                 statusText.classList.add("text-yellow-500");
    //             }else{
    //                 statusText.classList.remove("text-yellow-500");
    //                 statusText.classList.add("text-green-500");
    //             }
    //         })
    //     });
    // })

}

// Update read book status
function updateStatus(bookCardElement,btn){
    const index = parseInt(bookCardElement.dataset.item);
    let bookObj = library.find((item,i)=>i===index);
    let statusText = bookCardElement.childNodes[9].children[0];
    if(bookObj.status === true){
        btn.classList.add("bg-yellow-500","hover:bg-yellow-600");
        btn.classList.remove("bg-green-600","hover:bg-green-700");
        bookObj.status = !bookObj.status;
        statusText.classList.remove("text-green-500");
        statusText.classList.add("text-yellow-500");
        statusText.textContent = "Reading";
    }else{
        btn.classList.add("bg-green-600","hover:bg-green-700");
        btn.classList.remove("bg-yellow-500","hover:bg-yellow-600");
        bookObj.status = !bookObj.status;
        statusText.classList.remove("text-yellow-500");
        statusText.classList.add("text-green-500");
        statusText.textContent = "Read";
    }
}

// Delete book
function deleteBook(bookCardElement){
    const index = parseInt(bookCardElement.dataset.item);
                if (index >= 0 && index < library.length) {
                // Remove the book card from the DOM
                bookCardElement.remove();
                // Remove the book from the library array
                library.splice(index, 1);
                // Update the book count
                bookCountEl.textContent = library.length;
                // Update data-item attributes
                updateDataItem(bookCardElement);
                library.length === 0 && libraryEl.childNodes[1].classList.remove("hidden");
            }
}

// Update data-item on book elements
function updateDataItem(bookCardElement){
    const bookCardElements = document.querySelectorAll(".bg-white");
    bookCardElements.forEach((bookCard, newIndex) => {
        bookCard.dataset.item = newIndex;
    })
}

// Show book cards
function showLibrary(){
    library.forEach(book => {
        bookCard(book);
    })
}

//* Event Listeners

// Showing New Book Form
newBookBtn.addEventListener("click", () => {
    libraryDivEl.classList.toggle("hidden");
    gsap.from("#book-form", {duration: .4, delay: .5, x:"100vw", ease: "power1.in"}); 
    formEl.classList.toggle("hidden");
})

// Closing New Book Form
closeEl.addEventListener("click", () => {
    libraryDivEl.classList.toggle("hidden");
    formEl.classList.toggle("hidden");
})

// Form Create Book 
createBtn.addEventListener("click", addBook);

// Attach delete button event listeners to the whole document and listen for clicks on delete and update status buttons 
document.addEventListener("click", event => {
    const bookCardElement = event.target.closest(".bg-white");
    const bookStatusBtn = event.target.closest(".status");
    const statusText = event.target.closest(".status-text");

    if (event.target.classList.contains("delete")) {
        if (bookCardElement) {
            deleteBook(bookCardElement);
        }
    }
    if(event.target.classList.contains("status")){
        if (bookCardElement) {
            updateStatus(bookCardElement,bookStatusBtn);
        }
    }

});

// Invoking books objects to display in Cards
showLibrary();
bookCountEl.textContent = library.length;