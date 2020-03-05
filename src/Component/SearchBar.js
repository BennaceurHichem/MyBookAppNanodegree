import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import * as BooksAPI from "../BooksAPI";
import Book from "./Book";
import ListBooks from "./ListBooks";
import history from "../history";
import PropTypes from "prop-types";

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchWords: "",

      necessaryData: [],
      /*check if the keyword is valid or not, it will be used to not displaying any book in case of access to the api problem */
      isValid: true
    };
  }

  

  handleChangeBookState = (e, book, oldShelf) => {
    //this function is executed when the user change the state of a book

    let newShelf = e.target.value;
    console.log("new shelf from searchBar page :" + newShelf);

    book.setState({
      shelf: newShelf
    });

    //now the only thing to do is remoing this book from the oldShelf list in App 
    //and adding it to the new shelf list

    //call the handler in App component which will update the list of books by shelf
    this.props.updateBooks(book, oldShelf, newShelf);
  };

  render() {
    console.log("type of necessary data :" + typeof this.state.necessaryData);

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={event =>
                this.props.updateSearch(event.target.value, this)
              }
            />
          </div>
        </div>
        {this.state.searchWords.length !== 0 && this.state.isValid && (
          <div className="search-books-results">
            <ol className="books-grid">
              {this.state.necessaryData.map(book => {
                return (
                  <Book
                    key={book.id}
                    book={book}
                    changeBookState={this.handleChangeBookState}
                    shelf={book.shelf}
                  />
                );
              })}
            </ol>
          </div>
        )}

        {(this.state.searchWords.length === 0 || !this.state.isValid) && (
          <div className="emptysearch">
            <h1>Nothing to show </h1>
          </div>
        )}
      </div>
    );
  }
}

export default SearchBar;


SearchBar.propTypes = {
  updateBooks : PropTypes.func,
  updateSearch:PropTypes.func,
  book:PropTypes.array


};