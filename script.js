let library;
const DEFAULT_DATA = [
  { name: "Naruto", author: "Masashi Kishimoto ", status: "Read " },
  { name: "Berserk", author: "Kentaro Miura", status: "Read" },
  {
    name: "Jojo's Bizzare Adventure Part 8",
    author: "Hirohito Araki ",
    status: "Unread",
  },
];
const $name = document.querySelector("#name");
const $author = document.querySelector("#author");
const $status = document.querySelector("#status");
const $tableBody = document.querySelector("#book-table-body");
const $form = document.querySelector("form");
console.log($form);
$form.addEventListener("submit", (e) => {
  e.preventDefault();
  addBookToLibrary();
  render();
  clearForm();
});

const $table = document
  .querySelector("table")
  .addEventListener("click", (e) => {
    const currentTarget = e.target.parentNode.parentNode.childNodes[1];
    if (e.target.innerHTML == "delete") {
      if (confirm(`are you sure you want to delete ${currentTarget.innerText}`))
        deleteBook(findBook(library, currentTarget.innerText));
    }
    if (e.target.classList.contains("status")) {
      changeStatus(findBook(library, currentTarget.innerText));
    }
    updateLocalStorage();
    render();
  });
class Book {
  constructor(name, author, status) {
    this.name = name;
    this.author = author;
    this.status = status;
  }
}

function addBookToLibrary() {
  if ($name.value.length === 0 || $author.value.length === 0) {
    alert("Please fill all the fields");
    return;
  }
  const newBook = new Book($name.value, $author.value, $status.value);
  library.push(newBook);
  console.log("book added");
  updateLocalStorage();
}
function changeStatus(book) {
  if (library[book].status === "read") {
    library[book].status = "unread";
  } else {
    library[book].status = "read";
  }
  console.log("status changed");
}

function deleteBook(currentBook) {
  library.splice(currentBook, currentBook + 1);
  console.log("book deleted");
}
function findBook(libraryArray, name) {
  if (libraryArray.length === 0 || libraryArray === null) {
    return;
  }
  for (book of libraryArray) {
    if (book.name === name) return libraryArray.indexOf(book);
  }
  console.log("book found");
}
function clearForm() {
  $name.value = "";
  $author.value = "";
  console.log("clear");
}

function updateLocalStorage() {
  localStorage.setItem("library", JSON.stringify(library));
  console.log("localStorage updated");
}

function checkLocalStorage() {
  if (localStorage.getItem("library")) {
    library = JSON.parse(localStorage.getItem("library"));
  } else {
    library = DEFAULT_DATA;
  }
  console.log("localStorage checked");
}

function render() {
  checkLocalStorage();
  $tableBody.innerHTML = "";
  library.forEach((book) => {
    const htmlBook = `
        <tr>
        <td>${book.name}</td>
        <td>${book.author}</td>
        <td><button class="status">${book.status}</button></td>
        <td><button class="delete">delete</button></td>
        </tr>
        `;
    $tableBody.insertAdjacentHTML("afterbegin", htmlBook); //
  });
  console.log("rendered");
}
render();
