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
 


  }
componentDidMount(){
  console.log('hello from componnt didMount in ListBooks')

  
  BooksAPI.getAll().then((book) => {
    console.log(book)

        
          this.setState( (previousState)=>({

              books :[ ...previousState.books,book],

          })
          )

  }).catch((err) => {
      console.log("error in getting books from the db ")
  });


 
}


  render() {
    return (

      <div className="app">



<Router history={history}>
<Switch>

      <Route exact path='/search' render={() => (
               
          <SearchBar books={this.state.books}/>




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
                        
   
                       { <ListBooks books={this.state.books} shelf="currentlyReading"/> } 
   
   
   
                       </ol>
                     </div>
                   </div>
                   <div className="bookshelf">
                     <h2 className="bookshelf-title">Want to Read</h2>
                     <div className="bookshelf-books">
                       <ol className="books-grid">
                        {/*  ["wantToRead", "currentlyReading", "read"]  */ }
                        { <ListBooks books={this.state.books} shelf="wantToRead"/> } 
                       </ol>
                     </div>
                   </div>
                   <div className="bookshelf">
                     <h2 className="bookshelf-title">Read</h2>
                     <div className="bookshelf-books">
                       <ol className="books-grid">
                       { <ListBooks books={this.state.books} shelf="read"/> } 
                       </ol>
                     </div>
                   </div>
                 </div>
               </div>
               <div className="open-search">
                 <button onClick={() => history.push('/search')} >Search a Book </button>
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
