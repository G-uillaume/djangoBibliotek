import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

const BasketItem = ({book, setBookNumber}) => {

    const [number, setNumber] = useState(1)
    let author = book.author != null ? book.author.split(', ').reverse().join(' ') : 'Unknown'

    useEffect(() => {
        setBookNumber(book.id, number)
    }, [number])

    const addOne = () => {
        if (number < book.quantity) {
            setNumber(number+1)
        }
    }

    const removeOne = () => {
        setNumber(number-1)
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
                {/* <i className="fas fa-plus"></i> */}
                <input type="number" className="number-item" placeholder={number} min="1" max={book.quantity} />
                <FontAwesomeIcon icon={faMinus} onClick={removeOne} />
                {/* <i className="fas fa-minus"></i> */}
            </div>
            <div id="basket-trash">
                <FontAwesomeIcon icon={faTrashAlt} />
            </div>
        </div>
    )
}

export default BasketItem
