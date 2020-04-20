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

const deleteBook = gql`
  mutation deleteBook($id: ID!) {
    deleteBook(id: $id)
  }
`;
const deleteAuthor = gql`
  mutation deleteAuthor($id: ID!) {
    deleteAuthor(id: $id)
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


function BooksTag() {
        const [deleteABook] = useMutation(deleteBook);
       /* const [updateABook]=useMutation(updateBook);*/
  const { loading, error, data } = useQuery(BooksQuery );
  if (loading) return <p>Loading</p>;
  if (error) return <p>error </p>;
        return (
          <div className="mytable">
                <table id='books'> 
          <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Genre</th>
              <th>AuthorName</th>
              <th>Delete</th>
              <th>Update</th>
              
          </tr>
          
                  {data.books.map(book=>(
                          <tr key={`$book.id`}>
                            <td>{book.id}</td>
                                <td>{book.name}</td>
                                <td>{book.genre}</td>
                                <td>{book.authorname}</td>
                                <td><button onClick={event => {
                        event.preventDefault();
                        console.log("delete book:", book.name);
                        deleteABook({
                          variables: {
                            id: book.id
                          },
                          refetchQueries: ["getBooks"]
                        }).catch(error => {
                          alert("Cannot Delete this Book");
                        });
                      }}
                                >Delete</button ></td>
                                <td><Link to ={{pathname:`/updateBook/${book.id}`}}><button  className="btn btn-success" style={{margin:'5px',width:'100px'}}>Update Here</button></Link></td>
                                
                           </tr>
                  ))}
          
          </table>
          </div>
        );

}   

function AuthorsData(){
  
    
        //const [deleteAuthor] = useMutation(deleteAuthorMutation)
        const [deleteAAuthor] = useMutation(deleteAuthor);
      
                  const { loading, error, data } = useQuery(AuthorsQuery);
                  if (loading) return 'Loading...';
                  if (error) return `Error! ${error.message}`;
                
                  return (
                  
                  <div className="Authors">
                      
                      <h1 className="h">Authors List</h1>
      
                      <div className="mytable">
                      <table id='books'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Age</th>
              <th>Delete</th>
              <th>Update</th>
            </tr>
          </thead>
          {data.authors.map(author => (
          <tbody>
            <tr key={author.id}>
            <td>{author.id}</td>
          <td>{author.name}</td>
          <td>{author.age}</td>
          <td><button onClick={event => {
                              event.preventDefault();
                              console.log("delete author:", author.name);
                              deleteAAuthor({
                                variables: {
                                  id: author.id
                                },
                                refetchQueries: ["getAuthors"]
                              }).catch(error => {
                                alert("Cannot Delete this author");
                              });
                            }}
                                      >Delete</button ></td>
                                      <td><button type ="submit">Update</button></td>
          </tr>
            </tbody>
          ))}
            </table>
            </div>
            </div>
          )
      }

      function GetData()  {
        
        return(
                <div>
                <BooksTag/>
                <AuthorsData/>

                </div>

        )
        }

        export default GetData;