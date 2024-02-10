const myLibrary = [];

function Book(title, author, pages, read, imgUrl) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.imgUrl = imgUrl;
}
// FAKE BOOK
const book1 = new Book(
  "Harry Potter",
  "JK Rowling",
  555,
  false,
  "https://m.media-amazon.com/images/I/91-LL7OnDCL._AC_UF1000,1000_QL80_.jpg"
);
const book2 = new Book(
  "Learn",
  "JK Rowling",
  555,
  true,
  "https://m.media-amazon.com/images/I/71-CKpDxEYL._AC_UF1000,1000_QL80_.jpg"
);
const book3 = new Book(
  "Calm",
  "JK Rowling",
  555,
  false,
  "https://m.media-amazon.com/images/I/813UBZ-O8sL._AC_UF1000,1000_QL80_.jpg"
);
const book4 = new Book(
  "Software Engineer",
  "JK Rowling",
  555,
  true,
  "https://miblart.com/wp-content/uploads/2020/12/new-cover-mibl-2.jpeg"
);
const book5 = new Book(
  "Discipline",
  "JK Rowling",
  555,
  true,
  "https://bukovero.com/wp-content/uploads/2016/07/Harry_Potter_and_the_Cursed_Child_Special_Rehearsal_Edition_Book_Cover.jpg"
);

// Add FAKE BOOK to library for displaying purpose.
myLibrary.push(book1, book2, book3, book4, book5);

const newBookModal = document.querySelector("#new-book-modal");
const addBookForm = document.querySelector("#add-form");
const addBookBtn = document.querySelector(".add-btn");
const filterBtn = document.querySelector(".filter-btn");
const bookList = document.querySelector(".books");
const closeModalBtn = document.querySelector(".close-modal-btn");

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

function createElementWith(type, className, textContent) {
  const element = document.createElement(type);
  element.classList.add(className);
  if (textContent) {
    element.textContent = textContent;
  }
  return element;
}

// UI
function createBookItem(book) {
  const bookCard = createElementWith("li", "book-card");
  // CARD IMAGE
  const image = createElementWith("img", "image", book.imgUrl);
  image.setAttribute("alt", book.title);
  image.setAttribute("src", book.imgUrl);
  // CARD BODY
  const body = createElementWith("div", "body");
  const title = createElementWith("span", "title", book.title);
  const author = createElementWith("span", "author", book.author);
  body.append(title, author);
  // CARD FOOTER
  const footer = createElementWith("div", "footer");
  const pages = createElementWith("span", "pages", `${book.pages} pages`);
  const readStatus = createElementWith("button", "read-btn");
  readStatus.style.backgroundColor = book.read ? "green" : "orangered";
  footer.append(pages, readStatus);
  // APPEND TO BOOK CARD
  bookCard.append(image, body, footer);
  return bookCard;
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
  const title = e.target.title.value;
  const author = e.target.author.value;
  const pages = e.target.pages.value;
  const read = e.target.read.checked;
  const imgUrl = e.target.imgUrl.value;
  const newBook = { title, author, pages, read, imgUrl };
  addBookToLibrary(newBook);
  repaintBookListToScreen();
  addBookForm.reset();
  newBookModal.close();
});

// Using event delegation to target dynamically created bookcard
bookList.addEventListener("click", (e) => {
  const bookTitle = e.target
    .closest(".book-card")
    .querySelector(".title").textContent;
  myLibrary.forEach((book, index) => {
    if (book.title === bookTitle) {
      book.read = !book.read;
      repaintBookListToScreen();
    }
  });
});

function closeModal(e) {
  addBookForm.reset();
  newBookModal.close();
}
closeModalBtn.addEventListener("click", closeModal);

document.addEventListener("DOMContentLoaded", () => {
  displayAllBook();
});
