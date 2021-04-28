import React from 'react'
import '../css/Order.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog } from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router-dom'

const Order = ({order}) => {
    return (
        <div className="order-card">
            <div className="card-content">
                <h2>{order.user}</h2>
                <ul>
                    {order.books.map((book) => (
                        <li key={book.book_id}>{book.book_title} (quantity: {book.number})</li>
                    ))}
                </ul>
                <p>Date of order: {order.created_at}</p>
            </div>
            <div className="card-footer">
                <Link to={{ 
                    pathname: `/update/${order.id}`,
                    state: {
                        order
                    }
                }} >
                    <FontAwesomeIcon icon={faCog} />
                </Link>
            </div>
        </div>
    )
}

export default Order
