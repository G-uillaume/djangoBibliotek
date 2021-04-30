import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { removeFromBasket, setNumber } from '../redux/basket/basketActions'
import { connect } from 'react-redux'

const BasketItem = ({book, setNumber, basket, removeFromBasket}) => {

    const [numberInput, setNumberInput] = useState(1)
    let author = book.author != null ? book.author.split(', ').reverse().join(' ') : 'Unknown'

    useEffect(() => {
        setNumber(book.id, numberInput)
    }, [numberInput])
    console.log(basket.basketFormat.books)
    const addOne = () => {
        if (numberInput < book.quantity) {
            setNumberInput(numberInput+1)
        }
    }

    const removeOne = () => {
        if (numberInput > 1) {
            setNumberInput(numberInput-1)
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
                <FontAwesomeIcon icon={faPlus} onClick={addOne} />
                <input type="number" className="number-item" placeholder={numberInput} min="1" max={book.quantity} readOnly/>
                <FontAwesomeIcon icon={faMinus} onClick={removeOne} />
            </div>
            <div id="basket-trash">
                <FontAwesomeIcon icon={faTrashAlt} onClick={() => {
                    removeFromBasket(book)
                    }
                    } />
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        basket: state.basket
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setNumber: (book_id, number) => dispatch(setNumber(book_id, number)),
        removeFromBasket: (book) => dispatch(removeFromBasket(book))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BasketItem)
