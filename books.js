import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import React, { useState } from "react";
import './books.css'
import {Link} from "react-router-dom"
import Header from "./header";


const BooksQuery = gql`
  query getBooks{
    books {
      id
      name
      genre
      authorname
    }
  }
`;

const AuthorsQuery = gql`
query getAuthors {
    authors{
      id
      name
      age
    }
  }
`;







        function DisplayAuthors(){
          const {loading, error, data } = useQuery(AuthorsQuery);
          if (loading) {
           return (<option disabled>Loading...</option>)
          }
           if (error) return `Error! ${error.message}`;
          else{
            return data.authors.map(author => {
              return( <option key={ author.id } value={author.name}>{ author.name }</option> );
          });
        }
      }         
                        
        
        
          
        
        function Books(props){
          
          return(
            <div>
            <Header/>
            <div>
               <div className='col-sm-12 author'>
               <form name = "myForm" onSubmit={props.onSubmit} className="boxfield">  
               <h1 className='text'>{props.title}</h1>

               <label>Book Name</label>
            <input className="inputfield" type="text" name="name" defaultValue={props.name}  onChange={e => props.setName(e.target.value)} placeholder=' Book name' required /><br/>
            
            <label>Genre</label>
            <input className="inputfield" type="text" name="genre" 
            defaultValue={props.genre} onChange={e => props.setGenre(e.target.value)} 
            placeholder="Genre" required /><br/>

              <label>Author</label>
              <select name="authorname" className="inputfield"
               defaultValue={props.authorname}  
               onChange={ (e) => props.setAuthorname( e.target.value ) } >
                <option>Select author</option>
                <DisplayAuthors/>
            </select>
                <button type="submit"
                 className='mainButton' >{props.button}</button>
              
          

               </form>

               </div>

            </div>
            </div>
          )
        }
      
      export default Books;

                          