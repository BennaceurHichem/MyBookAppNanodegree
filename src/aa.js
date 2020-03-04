import React, { Component } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
  import Button from '@material-ui/core/Button';
  import * as BooksAPI from './BooksAPI'

import history from './history'
class SearchBar extends Component{

state  = {

  searchWords : '',
  necessaryData : []


}

updateSearch = (search)=>{

  this.setState(() => ({
    searchWords: search.trim()
  }))

    BooksAPI.search(this.state.searchWords).then((book)=>{
      Object.keys(book).map( (key)=>{


        console.log(" a title : "+book[key].title+"authors "+JSON.stringify(book[key].authors))
        this.setState({
  
    
          necessaryData : necessaryData.concat({title : book[key].title,authors:book[key].authors})
    
      }
        )


      })
        

    }).catch((err) => {
      console.log("error in getting books from the db ")
  });
 


}
  





componentDidMount(){

 
}



    render(){

     
    console.log("type of necessary data :"+typeof this.state.necessaryData)

         
        return ( 


        
          <div className="search-books">
          <div className="search-books-bar">
            <button className="close-search" onClick={() => {history.push('/')}}>Close</button>
            <div className="search-books-input-wrapper">
              {


              }
              <input type="text" placeholder="Search by title or author"   onChange={(event) => this.updateSearch(event.target.value)}/>

            </div>
          </div>
          { this.state.necessaryData.length  &&(



          <div className="search-books-results">
           <ol className="books-grid">
                          {this.state.necessaryData.map((book) => {
                                console.log("a book : "+ book)
                              //here you should ad the Object.ey 
                              /*

                                console.log("book : "+book)
                                return (<li key={book[key].id} className='contact-list-item'>
                                
                                  <div className='book-details'>
                                    <p>{book[key].title}</p>
                                    <p>{book[key].author}</p>
                                  </div>
                                
                                </li>)
                                */



                           

                          
                  })}
                                              
                                            </ol>
                                            </div>






          )}
         
        </div>
      )
    








    }
    
}



export default SearchBar;
