import React from 'react'
import '../css/Details.css'

const Details = (props) => {
    let book = props.location.state.book
    // console.log(book.title)
    return (
        <>
            <h1 id="title">Details</h1>
            <div className="details">
                <h2>{book.title}</h2>
                <h3>{book.author}</h3>
                <p id="description">{book.description}</p>
                <p>{book.height} pages - {book.publisher}</p>
                </div>
        </>
    )
}

export default Details
