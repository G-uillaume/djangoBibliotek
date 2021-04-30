import React, { useState, useEffect } from 'react'
import '../css/Books.css'
import Book from './Book'
import { connect } from 'react-redux'
import { booksApiCall } from '../redux/books/booksActions'
import { faBookmark } from '@fortawesome/free-solid-svg-icons'

const Books = ({booksApiData, apiBooks}) => {
    const [input, setInput] = useState('')
    const [books, setBooks] = useState([])
    console.log(booksApiData)
    useEffect(() => {
        if (booksApiData.books.length == 0) {
            apiBooks()
        }
    }, [apiBooks])

    useEffect(() => {
        setBooks(
            booksApiData.books.filter(book => {
                return (book.title.toLowerCase().includes(input.toLowerCase()) 
                || (book.author && book.author.toLowerCase().includes(input.toLowerCase()))
                || book.genre.toLowerCase().includes(input.toLowerCase()))
            })
        )
    }, [input, booksApiData.books])
    
    const handleChange = (e) => {
        setInput(e.target.value)
    }


    const displayBooksApiData = booksApiData.isLoading ? (
        <p className="load-or-error">Loading ...</p>
    )
    : booksApiData.error ? (
        <p className="load-or-error">{booksApiData.error}</p>
    )
    : (
        booksApiData.books.map(book => {
            return (
                <Book key={book.id} book={book} />
            )
        })
    )

    return (
        <>
            <h1 id="title">Books</h1>
            <input onChange={handleChange} value={input} id="search" type="text" placeholder="Search" />
            <div className="cards">
                {
                    booksApiData.isLoading ? (
                        <p className="load-or-error">Loading ...</p>
                    )
                    : booksApiData.error ? (
                        <p className="load-or-error">{booksApiData.error}</p>
                    )
                    : (
                        books.map(book => {
                            return (
                                <Book key={book.id} book={book} />
                                
                            )
                        })
                    )
                }
            </div>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        booksApiData: state.books
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        apiBooks: () => dispatch(booksApiCall())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Books)