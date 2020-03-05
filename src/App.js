import React from "react";
// import * as BooksAPI from './BooksAPI'
import "./App.css";
import ListBooks from "./Component/ListBooks";
import SearchBar from "./Component/SearchBar";
import * as BooksAPI from "./BooksAPI";
import Button from "@material-ui/core/Button";

import history from "./history";

import { Router, Switch, Route, Link } from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      currentlyReading: [],
      wantToRead: [],
      read: [],
      none: []
    };

    this.updateSearch = this.updateSearch.bind(this);
    this.updateBooks = this.updateBooks.bind(this);
  }

  refreshPage = () => {
    window.location.reload(false);
  };
  componentDidMount() {
    console.log("hello from componnt didMount in ListBooks");

    BooksAPI.getAll()
      .then(books => {
        console.log(books);

        this.setState(previousState => ({
          books: [...previousState.books, books],
          currentlyReading: books.filter(
            book => book.shelf === "currentlyReading"
          ),
          wantToRead: books.filter(book => book.shelf === "wantToRead"),
          read: books.filter(book => book.shelf === "read")
        }));

        console.log(
          "currently readin books :" +
            this.state.currentlyReading.map(b => b.title)
        );
      })
      .catch(err => {
        console.log("error in getting books from the db ");
      });
  }



async updateBooks(book, oldShelf, newShelf) {
    console.log("updateBooks is called ");

    console.log("oldShelf book in updateBooks: " + oldShelf);
    console.log("newShelf book in updateBooks: " + newShelf);
    const books = this.state[newShelf];
    const isExist = this.state.books && books.find(shelfBook => shelfBook.id === book.id);

    await BooksAPI.update(book.props.book, newShelf);

  //  if (oldShelf && newShelf && newShelf !=="none") {
if(!isExist){

  
    this.setState(previous => ({
      [newShelf]: previous[newShelf].concat([{ ...book.props.book, ...{ shelf: newShelf } }]),
      [oldShelf]: previous[oldShelf].filter(
        shelfBook => shelfBook.id !== book.props.book.id
      )
    }));

  

}
  
      
  //  }/* else { */
    

    //}
  };

  async updateSearch(search, searchBar) {
    var arrayOfSearchedBooks = [];
    var result = [];
    var response = [];
    var allBookIDs = [];

    var myBooks = [];
    var livre = [];

    this.state.books.map(book => {
      Object.keys(book).map(key => {
        livre.push({ id: book[key].id, shelf: book[key].shelf });
        allBookIDs.push(book[key].id);
      });
    });
    console.log("allBookIds : " + allBookIDs);
    searchBar.setState(() => ({
      searchWords: search.trim(),
      isValid: true
    }));

    response = await BooksAPI.search(searchBar.state.searchWords);

    result = Array.isArray(response) ? response : [];

    result.map(book => {
      arrayOfSearchedBooks.push(book);
    });

    console.log("myBooks :" + myBooks);

    arrayOfSearchedBooks
      .filter(book => allBookIDs.includes(book.id))
      .map(book => {
        console.log("book id :" + book.id);
        book.shelf = livre.find(element => element.id === book.id)
          ? livre.find(element => element.id === book.id).shelf
          : "none";

        console.log(
          "book shelf :" + livre.find(element => element.id === book.id).shelf
        );
      });

    if (
      arrayOfSearchedBooks === undefined ||
      arrayOfSearchedBooks.length == 0
    ) {
      searchBar.setState({
        isValid: false
      });
    }

    //store filtered array by title and authors only in necessaryData list state
    searchBar.setState({
      necessaryData: arrayOfSearchedBooks
    });

    this.setState({
      none: result.filter(book => !allBookIDs.includes(book.id))
    });
  }

  render() {
    return (
      <div className="app">
        <Router history={history}>
          <Switch>
            <Route
              exact
              path="/search"
              render={() => (
                <SearchBar
                  books={this.state.books}
                  updateBooks={this.updateBooks}
                  updateSearch={this.updateSearch}
                />
              )}
            />

            <Route
              path="/"
              render={() => (
                <div className="list-books">
                  <div className="list-books-title">
                    <h1>MyReads</h1>
                  </div>
                  <div className="list-books-content">
                    <div>
                      <div className="bookshelf">
                        <h2 className="bookshelf-title">Currently Reading</h2>
                        <div className="bookshelf-books">
                          <ol className="books-grid">
                            {
                              <ListBooks
                                books={this.state.currentlyReading}
                                shelf="currentlyReading"
                                chnagedShelf={this.changeBookState}
                                updateBooks={this.updateBooks}
                              />
                            }
                          </ol>
                        </div>
                      </div>
                      <div className="bookshelf">
                        <h2 className="bookshelf-title">Want to Read</h2>
                        <div className="bookshelf-books">
                          <ol className="books-grid">
                            {/*  ["wantToRead", "currentlyReading", "read"]  */}
                            {
                              <ListBooks
                                books={this.state.wantToRead}
                                shelf="wantToRead"
                                changedShelf={this.changeBookState}
                                updateBooks={this.updateBooks}
                              />
                            }
                          </ol>
                        </div>
                      </div>
                      <div className="bookshelf">
                        <h2 className="bookshelf-title">Read</h2>
                        <div className="bookshelf-books">
                          <ol className="books-grid">
                            {
                              <ListBooks
                                books={this.state.read}
                                shelf="read"
                                chnagedShelf={this.changeBookState}
                                updateBooks={this.updateBooks}
                              />
                            }
                          </ol>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="open-search">
                    <button onClick={() => history.push("/search")}>
                      Add a Book{" "}
                    </button>
                  </div>
                </div>
              )}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
