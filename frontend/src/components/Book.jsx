import React, { useEffect } from 'react'
import '../css/Book.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { updateBasket } from '../redux/basket/basketActions'

const Book = ({book, basketState, addBasket}) => {
    let author = book.author != null ? book.author.split(', ').reverse().join(' ') : 'Unknown'
    // console.log(basketState.basket)

    const add = (book) => {
        if (!basketState.basket.includes(book)) {
            addBasket(book)
        }
    }

    return (
        <div className="card">
            <img src="https://via.placeholder.com/150" alt=""></img>
            <div className="card-content">
                <h2>{book.title}</h2>
                <h3>Author : {author}</h3>
                <p>Genre : {book.genre.replace('_', ' ')}</p>
                <div className="progress">
                    <p>Ratings</p>
                    <progress value={book.ratings} min="0" max="100"></progress>
                    <p>{book.ratings}%</p>
                </div>
            </div>
            <div className="card-footer">
                <FontAwesomeIcon icon={faShoppingCart} onClick={() => add(book)} />
                <Link to={{
                    pathname: `/details/${book.id}`,
                    state: {
                        book
                    }
                }} >
                    <FontAwesomeIcon icon={faAngleDoubleRight} />
                </Link>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        basketState: state.basket
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addBasket: (book) => dispatch(updateBasket(book)) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Book)
