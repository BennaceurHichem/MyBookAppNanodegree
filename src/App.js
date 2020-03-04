import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './ListBooks'
import SearchBar from './SearchBar'
import * as BooksAPI from './BooksAPI'
import Button from '@material-ui/core/Button';

import history from './history' 
 
import {
  Router,
  Switch,
  Route,
  Link
} from "react-router-dom";



class App extends React.Component {
 


  state = {
    books : [],
    currentlyReading: [],
      wantToRead: [],
      read: [],
      none: [], 
 


  }




  refreshPage =()=>{

    window.location.reload(false);

  }
componentDidMount(){
  console.log('hello from componnt didMount in ListBooks')

  
  BooksAPI.getAll().then((books) => {
    console.log(books)

        
          this.setState( (previousState)=>({

              books :[ ...previousState.books,books],
              currentlyReading: books.filter(book => book.shelf === 'currentlyReading'),
              wantToRead: books.filter(book => book.shelf === 'wantToRead'),
              read: books.filter(book => book.shelf === 'read'),

          })
          )


          console.log("currently readin books :"+this.state.currentlyReading.map((b)=>b.title))

  }).catch((err) => {
      console.log("error in getting books from the db ")
  });
  


 
}

 updateBooks = (book,oldShelf,newShelf)=>{

console.log("updateBooks is called ")

console.log("shelf book in updateBooks: "+book.props.book.shelf)
console.log("oldShelf book in updateBooks: "+this.state[oldShelf])
console.log("oldShelf book in updateBooks: "+newShelf)

console.log("updtae : "+ BooksAPI.update(book.props.book,newShelf))

 BooksAPI.update(book.props.book,newShelf)


if(!oldShelf){
  this.setState(previous => ({
    [newShelf] : previous[newShelf].concat(book.props.book),

}));

}else{
  if(newShelf || newShelf==="none"){

    this.setState(previous => ({
      [newShelf] : previous[newShelf].concat(book.props.book),
      [oldShelf]: previous[oldShelf].filter(shelfBook => shelfBook.id !== book.props.book.id)
  
  }));


  }else{

    this.setState(previous => ({
      [oldShelf]: previous[oldShelf].filter(shelfBook => shelfBook.id !== book.props.book.id)
  
  }));


  }
  
}



}

 


  render() {
    return (

      <div className="app">



<Router history={history}>
<Switch>

      <Route exact path='/search' render={() => (
               
          <SearchBar books={this.state.books} updateBooks={this.updateBooks}/>




               )} />

     
      <Route  path='/' render={() => (
               
          
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
                        
   
                       { <ListBooks books={this.state.currentlyReading} shelf="currentlyReading" chnagedShelf={this.changeBookState} updateBooks={this.updateBooks}/> } 
   
   
   
                       </ol>
                     </div>
                   </div>
                   <div className="bookshelf">
                     <h2 className="bookshelf-title">Want to Read</h2>
                     <div className="bookshelf-books">
                       <ol className="books-grid">
                        {/*  ["wantToRead", "currentlyReading", "read"]  */ }
                        { <ListBooks books={this.state.wantToRead} shelf="wantToRead" changedShelf={this.changeBookState} updateBooks={this.updateBooks}/> } 
                       </ol>
                     </div>
                   </div>
                   <div className="bookshelf">
                     <h2 className="bookshelf-title">Read</h2>
                     <div className="bookshelf-books">
                       <ol className="books-grid">
                       { <ListBooks books={this.state.read} shelf="read" chnagedShelf={this.changeBookState} updateBooks={this.updateBooks}/> } 
                       </ol>
                     </div>
                   </div>
                 </div>
               </div>
               <div className="open-search">
                 <button onClick={() => history.push('/search')} >Add a Book </button>
               </div>
             </div>
     
     
     
                    )
                  
                    
                    
                    } />
</Switch>

</Router>
         
        
    





        




        
      </div>




    )
  }
}

export default App
