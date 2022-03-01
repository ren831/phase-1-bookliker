document.addEventListener("DOMContentLoaded", function () {});

const baseUrl = "http://localhost:3000/books";
const bookList = document.querySelector("#list");
const showPanel = document.querySelector("#show-panel");
const myUser = { id: 1, username: "pouros" };

fetch(baseUrl)
  .then((response) => response.json())
  .then((booksArr) => {
    booksArr.forEach((book) => {
      turnBookIntoLi(book);
    });
  });

let turnBookIntoLi = (book) => {
  let bookLi = document.createElement("li");
  bookLi.innerText = book.title;
  bookList.append(bookLi);

  bookLi.addEventListener("click", (e) => {
    showPanel.innerHTML = "";

    let BookTittle = document.createElement("h1");
    BookTittle.innerText = book.title;

    let bookSubtitle = document.createElement("h2");
    bookSubtitle.innerText = book.subtitle;

    let bookDescription = document.createElement("p");
    bookDescription.innerText = book.description;

    let bookAuthor = document.createElement("p");
    bookAuthor.innerText = book.author;

    let bookImage = document.createElement("img");
    bookImage.src = book.img_url;

    let likersList = document.createElement("ul");
    likersList.id = "users-list";

    let likeButton = document.createElement("button");
    likeButton.innerText = "like";

    if (book.users.length > 0) {
      book.users.forEach((user) => {
        let likeUser = document.createElement("li");
        likeUser.innerText = user.username;
        likeUser.id = user.username;

        likersList.append(likeUser);
      });
    }

    showPanel.append(
      bookImage,
      BookTittle,
      bookAuthor,
      bookSubtitle,
      bookDescription,
      likersList,
      likeButton
    );

    likeButton.addEventListener("click", (event) => {
      book.users.push(myUser);
      fetch(`${baseUrl}/${book.id}`, {
        method: "Patch",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          users: book.users,
        }),
      })
        .then((response) => response.json())
        .then((updatedBook) => {
          book.users = updatedBook.users;
          let newUserli = document.createElement("li");
          newUserli.innerText = myUser.username;
          likersList.append(newUserli);
        });
    });
  });
};
