import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import Button from '@material-ui/core/Button';
import './App.css'

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import history from './history';

import Book from './Book'



class ListBooks extends Component{


      state= {

        bookShelf : [],

      }



      handleChangeBookState = (e,book)=>{
            //this function is executed when the user change the state of a book 
  
            BooksAPI.update(book,e.target.value)



      }

    

render(){

return (


  <div className="list-books">
            
                {
                  
                this.props.books.map( (book)=>{
                  console.log("book : "+book)

                  
                               return  Object.keys(book).map( (key)=>{
                                    //iterate the nested oject to get needed attributes(title,id,authors ...)


                                      if(book[key].shelf==this.props.shelf){
                                        return ( 
                                                           
                                          
                                          <Book book={book[key]} changeBookState ={this.handleChangeBookState} shelf={this.props.shelf}/>
                                          )
                                      }
                               
                                    
                                    
                                  


                                  
                                })




                   







                })

                      

                }
                      
</div>
    
         
    )



}






}



export default ListBooks;