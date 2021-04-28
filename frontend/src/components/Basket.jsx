import React, {useEffect, useState} from 'react'
import '../css/Basket.css'
import BasketItem from './BasketItem'
import { removeFromBasket, updateBasket } from '../redux/basket/basketActions'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';

const Basket = ({basketState, addBasket, delBasket}) => {
    // useEffect(() => {
    //     let arr = basketState.basket.map(x => {
    //         return {book_id: x.id, book_title: x.title, number: 1}
    //     })
    //     setOrderTemp({
    //         ...orderTemp,
    //         books: arr
    //     })
    //     setIsLoading(false)
    // }, [])
    return (
        <>
            <h1 id="title">My basket</h1>
            
            {basketState.basket && basketState.basket.length != 0 && 
            <>
            <div className="basket-cards">
            { basketState.basket.map(book => {
                return (
                    <BasketItem key={book.id} book={book} />
                )
            })}
            </div>
            <button id="validate-order" onClick={() => console.log(basketState.basketFormat)}>Order</button>
            </>
            }
            {!basketState.basket.length &&
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
