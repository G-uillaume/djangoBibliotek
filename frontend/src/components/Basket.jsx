import React, {useEffect, useState} from 'react'
import '../css/Basket.css'
import BasketItem from './BasketItem'
import { removeFromBasket, updateBasket } from '../redux/basket/basketActions'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';

const Basket = ({basketState, addBasket, delBasket}) => {
    const [orderTemp, setOrderTemp] = useState({books: []})
    const [isLoading, setIsLoading] = useState(true)
    console.log(orderTemp)
    useEffect(() => {
        let arr = basketState.map(x => {
            return {book_id: x.id, book_title: x.title, number: 1}
        })
        setOrderTemp({
            ...orderTemp,
            books: arr
        })
        setIsLoading(false)
    },[])

    const setBookNumber = (book_id, number_of_book) => {
        if (!isLoading) {
            let book = orderTemp.books.findIndex(x => x.book_id === book_id)
            orderTemp.books[book].number = number_of_book
            console.log(book)
            setOrderTemp({
                books: [...orderTemp.books]

            })
            console.log(orderTemp)
        }
    }

    return (
        <>
            <h1 id="title">My basket</h1>
            
            {basketState && basketState.length != 0 && 
            <>
            <div className="basket-cards">
            { basketState.map(book => {
                return (
                    <BasketItem key={book.id} book={book} setBookNumber={setBookNumber} />
                )
            })}
            </div>
            <button id="validate-order" onClick={() => console.log(orderTemp)}>Order</button>
            </>
            }
            {!basketState.length &&
                <Link to="/">Order a book now!</Link>
            }
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        basketState: state.basket,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addBasket: (book) => dispatch(updateBasket(book)),
        delBasket: (book) => dispatch(removeFromBasket(book))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Basket)
