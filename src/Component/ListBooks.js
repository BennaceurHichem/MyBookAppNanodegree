import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import * as BooksAPI from "../BooksAPI";
import Button from "@material-ui/core/Button";
import "../App.css";

import { makeStyles } from "@material-ui/core/styles";

import history from "../history";

import Book from "./Book";

class ListBooks extends Component {
  handleChangeBookState = (e, book, oldShelf) => {
    //this function is executed when the user change the state of a book

    const newShelf = e.target.value;

    book.setState({
      shelf: newShelf
    });

    //now the only thing to do is remoing this book from the oldShelf list in App and adding it to the new shelf list

    //call the handler in App component which will update the list of books by shelf
    this.props.updateBooks(book, oldShelf, newShelf);
  };

  render() {
    return (
      <div className="list-books">
        {this.props.books.map(book => {
          console.log("book : " + book);

          //iterate the nested oject to get needed attributes(title,id,authors ...)

          return (
            <Book
              key={book.id}
              book={book}
              changeBookState={this.handleChangeBookState}
              shelf={this.props.shelf}
            />
          );
        })}
      </div>
    );
  }
}

export default ListBooks;
