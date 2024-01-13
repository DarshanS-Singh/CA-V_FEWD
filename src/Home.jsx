import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Form from './Components/Form'; // Assuming BookForm is the appropriate component for registration.
import axios from 'axios';

function Home() {
  const [bookList, setBookList] = useState([]);
  const [searchQuery, updateSearchQuery] = useState('');

  useEffect(() => {
    axios.get("https://reactnd-books-api.udacity.com/books", {
      headers: {
        'Authorization': 'whatever-you-want'
      }
    })
    .then(response => {
      setBookList(response.data.books);
      console.log(bookList);
    })
    .catch(error => {
      console.log(error);
    });
  }, []);

  function handleSearchInputChange(e) {
    updateSearchQuery(e.target.value);
  }

  return (
    <>
      <div className='top'>
        <h1> Kalvium Books </h1>
        <div className='search-container'>
          <img src="https://www.freepnglogos.com/uploads/search-png/search-icon-line-icon-icon-24.png" alt="Search icon" className='search-icon' />
          <input type="search" className='search-input' onChange={handleSearchInputChange} placeholder='Search Book' />
        </div>
        <Link to="/Form"> <button className='register-button'> Register </button> </Link>
      </div>
      <div className='content'>
        {
          bookList
            .filter((item) => item.title.toLowerCase().includes(searchQuery.toLowerCase()))
            .map((book) => {
              return (
                <div key={book.id} className='book'>
                  <img src={book.imageLinks.thumbnail} alt="Book cover" />
                  <div className='book-info'>
                    <p className='title'><b> {book.title} </b></p>
                    <p className='rating'> {book.averageRating} ⭐ Free</p>
                    <p className='pages'> {book.pageCount} Pages </p>
                  </div>
                </div>
              );
            })
        }
      </div>
    </>
  );
}

export default Home;
