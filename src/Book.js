import React,{Component} from 'react';
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types';

class Book extends React.Component{
        
    constructor(props) {
        super(props);
/*Book compoennt containe the shelf props which will be passed fromListBooks 
        * to change the state of the book we pass data from the Book(child ) to mparent Listbooks to make the update 

        
  */     

  let shelf = this.props.shelf ?this.props.book.shelf:"none"

        this.state={
            shelf: shelf


        }


      }


      changeBookShelf(newShelf){

        this.setState({

          shelf:newShelf

        })
      }
     

      


    render(){

       
        



        return (


            <li key={this.props.book.id}>
            <div className="book">
              <div className="book-top">
                <div className="book-cover" style={{  width: 128, height: 193, backgroundImage: `url('${this.props.book.imageLinks?this.props.book.imageLinks['smallThumbnail']:'./icons/not_available_book.jpg' }')` }}></div>
                <div className="book-shelf-changer">
                  <select className="select" value={this.state.shelf}  onChange={(e)=> this.props.changeBookState(e,this,this.state.shelf)}>
                    <option value="move" disabled>Move to...</option>
                    <option value="currentlyReading" >Currently Reading</option>
                    <option value="wantToRead" >Want to Read</option>
                    <option value="read" >Read</option>
                    <option value="none">None</option>
                  </select>
                </div>
              </div>
              <div className="book-title">{this.props.book.title ? this.props.book.title: "title not known"}</div>
              <div className="book-authors">{ this.props.book.authors ? this.props.book.authors:"authors not known" }</div>
            </div>
            
          </li>

        )




    }






}


export default Book;