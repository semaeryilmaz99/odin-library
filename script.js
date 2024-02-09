const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}
// FAKE BOOK
const book1 = new Book("Harry Potter", "JK Rowling", 555, true);
const book2 = new Book("Learn", "JK Rowling", 555, true);
const book3 = new Book("Calm", "JK Rowling", 555, true);
const book4 = new Book("Software Engineer", "JK Rowling", 555, true);
const book5 = new Book("Discipline", "JK Rowling", 555, true);

myLibrary.push(book1, book2, book3, book4, book5);

const newBookModal = document.querySelector("#new-book-modal");
const addBookForm = document.querySelector("#add-form");
const addBookBtn = document.querySelector(".add-btn");
const bookList = document.querySelector(".books");

function addBookToLibrary(newBook) {
  myLibrary.push(newBook);
}

function deleteBookFromLibrary(title) {
  myLibrary.forEach((book, index) => {
    if (book.title === title) {
      myLibrary.splice(index, 1);
    }
  });
}

// UI
function createBookItem(book) {
  const bookItemElement = document.createElement("li");
  const bookTitleElement = document.createElement("span");
  const bookAuthorElement = document.createElement("span");
  const bookPagesElement = document.createElement("span");
  const haveReadElement = document.createElement("span");
  bookTitleElement.textContent = book.title;
  bookAuthorElement.textContent = book.author;
  bookPagesElement.textContent = book.pages;
  haveReadElement.textContent = book.read;
  bookItemElement.append(
    bookTitleElement,
    bookAuthorElement,
    bookPagesElement,
    haveReadElement
  );
  return bookItemElement;
}
function displayAllBook() {
  myLibrary.forEach((book) => {
    const newBookItem = createBookItem(book);
    bookList.appendChild(newBookItem);
  });
}

function removeAllBook() {
  Array.from(bookList.children).forEach((child) => child.remove());
}

function repaintBookListToScreen() {
  removeAllBook();
  displayAllBook();
}

addBookBtn.addEventListener("click", (e) => {
  newBookModal.showModal();
});

addBookForm.addEventListener("submit", (e) => {
  // prevent form submit data to server
  e.preventDefault();
  const title = e.target.querySelector("#title").value;
  const author = e.target.querySelector("#author").value;
  const pages = e.target.querySelector("#pages").value;
  const read = e.target.querySelector("#read").checked;
  const newBook = { title, author, pages, read };
  addBookToLibrary(newBook);
  repaintBookListToScreen();
  addBookForm.reset();
  newBookModal.close();
});

document.addEventListener("DOMContentLoaded", () => {
  displayAllBook();
});
