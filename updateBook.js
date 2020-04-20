import React from 'react';
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import  { useState } from "react";
import './books.css';
import {  Link} from "react-router-dom";
import Books from './books';


const BooksQuery = gql`
  query getBooks{
    books {
      id
      name
      genre
      
    }
  }
`;

const createBook = gql`
  mutation createBook(
    $name: String!
    $genre: String!
    $authorname: String!
  ) {
    createBook(
      name: $name
      genre: $genre
      authorname: $authorname
    ) {
      id
    }
  }
`;


const AuthorsQuery = gql`
  {
    authors{
      id
      name
      age
    }
  }
`;


const updateBooks= gql`
  mutation updateBook($id: ID!
    $name: String!
    $genre: String!
    $authorname:String ){
      updateBook(id:$id
        name:$name
        genre: $genre
        authorname:$authorname)
  }
`

function DisplayAuthors(){
  const { loading, error, data } = useQuery(AuthorsQuery);
  if(loading){
      return( <option disabled>Loading authors</option> );
  }
  if(error) return `Error! ${error.message}`; 

  else {
    return data.authors.map(author => {
        return( <option key={ author.id } value={author.name}>{ author.name }</option> );
    });
}
}

function UpdateBooks(props) {

 
        const { loading, error, data } = useQuery(BooksQuery);
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [genre, setGenre] = useState("");
    const [authorname, setAuthorname] = useState("");

    const [createABook] = useMutation(createBook, {
      variables: {
        name: name,
        genre: genre,
        authorname: authorname,
      },
      //refetchQueries: [ "getBooks"]
      refetchQueries: [{query: BooksQuery}]
    });

    const addForm=(e)=>{
      e.preventDefault();
      createABook().catch(error=>{
        console.log(error);
      });
      setName(name);
      setGenre(genre);
      setAuthorname(authorname)
      console.log(name)
      console.log(genre)
      console.log(authorname)
    }

    const [updateBook] = useMutation(updateBooks, {
        variables: {
          id: id,
          name: name,
          genre:genre,
          authorname: authorname,
          
        },
        refetchQueries: [ "getBooks"]
      });

 

      if (loading) 
    return <h3>Loading...</h3>
    if (error) return `Error! ${error.message}`;

    return (
      
        
                <div >
                {props.page == "add" &&
                <Books
                setName = {setName}
                setGenre = {setGenre}
                setAuthorname = {setAuthorname}
                onSubmit = {addForm}
                button = "Add"
                title = "Add Book"
                name = {name}
                genre = {genre}
                authorname = {authorname}
                />
                }
               
               {props.page == "update" &&
          data.books.map(book => {
           const id = props.match.params.id
            if(id == book.id){
             
              const updateForm = (e) => {
                e.preventDefault();
                updateBook().catch(error => {
                  console.log(error);
                });
                setId(book.id);
                if(name == ""){
                  setName(book.name);
                }else{
                  setName(name);
                }
                if(genre == ""){
                  setGenre(book.genre);
                }else{
                  setGenre(genre);
                }
                if(authorname == ""){
                  setAuthorname(book.authorname);
                }else{
                  setAuthorname(authorname);
                }
                alert("Book Updated")
              }   

                return(
                  <div>
                    
                <Books
                setName = {setName}
                setGenre = {setGenre}
                setAuthorname = {setAuthorname}
                onSubmit = {updateForm}
                button = "Update"
                title = "Update Book"
                name = {book.name}
                genre = {book.genre}
                authorname = {book.authorname}
                />
              
                    </div>
                )


                }}
                )}
              
               }
                
        </div>
    )






}

export default UpdateBooks;



