import React, {useEffect, useState} from 'react'
import { useCookies } from 'react-cookie'
import '../css/Basket.css'
import BasketItem from './BasketItem'
import { removeFromBasket, updateBasket } from '../redux/basket/basketActions'
import { connect } from 'react-redux'
import { Link, useHistory } from 'react-router-dom';
import { addOrderApiCall } from '../redux/orders/ordersActions'
import { booksApiCall } from '../redux/books/booksActions'

const Basket = ({basketState, makeOrder, reloadBooks}) => {

    const [token] = useCookies(['mytoken'])
    let history = useHistory()

    const orderNow = () => {
        if (!token['mytoken'] || token['mytoken'] === 'undefined') {
            history.push('/login')
        } else {
            makeOrder(basketState.basketFormat, token['mytoken'])
            reloadBooks()
            history.push('/orders')
        }
    }
    console.log(history)
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
            <button id="validate-order" onClick={orderNow}>Order</button>
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
        delBasket: (book) => dispatch(removeFromBasket(book)),
        makeOrder: (body, token) => dispatch(addOrderApiCall(body, token)),
        reloadBooks: () => dispatch(booksApiCall())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Basket)
