import React, { Component } from 'react';
import {Link} from "react-router-dom"

import './books.css';
class  Header extends Component {
  constructor(props) {
    super(props);
    this.state = { variable: 0 };
  }

  render() {
    return (
            <div className="container">
      <div className="topNav">

              <Link to="/getData" ><a className='navbut'>GetData</a></Link>
              <Link to="/booksList" ><a className='navbut'>BooksList</a></Link>
              <Link to="/addBook" ><a className='navbut'>AddBook</a></Link>
              <Link to="/addAuthor" ><a className='navbut'>AddAuthor</a></Link>
              <Link to="/" ><a className='navbut'>Home</a></Link>
              
      </div>
      </div>
    );
  }
}

export default  Header;

