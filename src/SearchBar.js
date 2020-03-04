import React, { Component } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
  import Button from '@material-ui/core/Button';
  import * as BooksAPI from './BooksAPI'
  import Book from './Book'
  import ListBooks from './ListBooks'
import history from './history'


class SearchBar extends Component{

state  = {

  searchWords : '',
  initialItems: [],
  necessaryData : [],
  /*check if the keyword is valid or not, it will be used to not displaying any book in case of access to the api problem */
  isValid: true,


}
/*
filterList = (value) => {
  let books = this.props.books;
  let booksExtracted = []

  let booksFiltered =  []



  this.setState(() => ({
    searchWords: value.trim()
  }))

books.map((book)=>{
  Object.keys(book).map((key)=>{

    booksExtracted.push(book[key])
  })


})
  


   booksExtracted.filter(function(item){
    console.log("item title : "+ item.title.toString().toLowerCase())
    console.log("value : "+value)
    console.log("condition::   "+item.title.toString().toLowerCase()===value.toLowerCase())
    
    console.log("taille de book filtered:     "+booksExtracted.length)
    return ( (item.title.toString().toLowerCase()===value.toLowerCase()) || (item.authors.toString().toLowerCase()===value.toLowerCase()) )




    
  });
  console.log("taille de book filtered"+booksFiltered.length)
  this.setState({necessaryData: booksExtracted});
}
*/




updateSearch = (search)=>{

   
  this.setState(() => ({
    searchWords: search.trim(),
    isValid:true
  }))
 console.log("search words "+this.state.searchWords)

 

  BooksAPI.search(this.state.searchWords).then((book)=>{

    var arrayOfSearchedBooks = []



Object.keys(book).map( (key)=>{

  arrayOfSearchedBooks.push(book[key])
})


    console.log("taille of Array of searchedBooks after filtring ::   "+arrayOfSearchedBooks.length)
    console.log("livre in search:  "+book)


      //store filtered array by title and authors only in necessaryData list state
    this.setState( {
      necessaryData : arrayOfSearchedBooks
                })




  }).catch((err) => {

      this.setState({

        isValid:false
      })
    console.log("error in getting books from the db ")});




}
  






handleChangeBookState = (e,book)=>{

  console.log("handleChangeBook called in ListBooks")

console.log("selected value : "+e.target.value)
console.log("bookID  in handleChange : "+book.id)
  BooksAPI.update(book,e.target.value)



}



    render(){

     
    console.log("type of necessary data :"+typeof this.state.necessaryData)

         
        return ( 


        
          <div className="search-books">
          <div className="search-books-bar">
            <button className="close-search" onClick={() => {history.push('/')}}>Close</button>
            <div className="search-books-input-wrapper">
          
              <input type="text" placeholder="Search by title or author"   onChange={(event) => this.updateSearch(event.target.value)}/>

            </div>
          </div>
          { 
          
          (this.state.searchWords.length !==0 && this.state.isValid) &&(
              <div className="search-books-results">
              <ol className="books-grid">

                          {  
                  
                  this.state.necessaryData.map((book) => {
                   
                      return (
                    
                        <Book book={book}  changeBookState ={this.handleChangeBookState} shelf={this.props.shelf}/>
                      
                      )
                    
                   
                       
      }) 
                  
                  
                  
                  
                  }
                                              
                 </ol>
                </div>








          )}

          {(this.state.searchWords.length===0 || !this.state.isValid) &&(



                  <div className="emptysearch">
                        <h1>Nothing to show </h1>
                    
                    </div>


          )}
         
        </div>
      )
    








    }
    
}



export default SearchBar;
