
import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { gql, useQuery } from '@apollo/client'



const FIND_BOOK = gql`
query findBook($bookAuthor: String!) {
  allBooks(author: $bookAuthor) {
    title,
    author,
    published,
    genres
  }
}
`

const ALL_BOOKS = gql`
query {
  allBooks {
    title,
    author,
    published
  }  
}
`


const ALL_AUTHORS = gql`
query {  
  allAuthors {
    name,
    born,
    bookCount
  }
}
`


const App = () => {
  const [page, setPage] = useState('authors');

  const authorsResult = useQuery(ALL_AUTHORS);
  const booksResult = useQuery(ALL_BOOKS);
  
  if (authorsResult.loading || booksResult.loading) {
    return <div>loading...</div>
  }

  if(!authorsResult.loading || !booksResult.loading) {
    return (
      <div>
        <div>
          <button onClick={() => setPage('authors')}>authors</button>
          <button onClick={() => setPage('books')}>books</button>
          <button onClick={() => setPage('add')}>add book</button>
        </div>
  
        <Authors
          authorsData={authorsResult.data.allAuthors}
          show={page === 'authors'}
        />
  
        <Books
          booksData={booksResult.data.allBooks}
          show={page === 'books'}
        />
  
        <NewBook
          show={page === 'add'}
        />
  
      </div>
    )
  }
  
}

export default App