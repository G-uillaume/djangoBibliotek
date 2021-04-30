import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useHistory } from 'react-router'
import { connect } from 'react-redux'
import { booksApiCall } from '../redux/books/booksActions'
import { updateOrderApiCall, ordersApiCall, deleteOrderApiCall } from '../redux/orders/ordersActions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import '../css/Update.css'

const OrderUpdate = ({ location, booksApiData, apiOrders, ordersApiData, apiBooks, updateOrder, deleteOrder}) => {
    const [booksInOrder, setBooksInOrder] = useState([])
    const [booksOutOfOrder, setBooksOutOfOrder] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [select, setSelect] = useState({ value: '0'})
    const [order, setOrder] = useState(location.state.order.books)
    const [token] = useCookies(['mytoken'])

    let history = useHistory()

    useEffect(() => {
        if (booksApiData.books.length === 0) {
            apiBooks()
        }
    }, [])

    useEffect(() => {
        setBooksInOrder(
            order.map(book => {
                return booksApiData.books.find(x => x.id === Number(book.book_id))
            })
        )
        
        
    },[booksApiData, order])

    useEffect(() => {
        let orderArray = []
        if (booksInOrder.length >= 0 && booksApiData.books.length > 0) {
            let availables = booksApiData.books.filter(book => book.quantity > 0)
            orderArray = [...availables, ...booksInOrder]
            for (let i = 0; i < orderArray.length; ++i) {
                for (let j = i + 1;  j < orderArray.length; ++j) {
                    if (orderArray[i] !== undefined && orderArray[j] !== undefined) {
                        if (orderArray[i].id === orderArray[j].id) {
                            orderArray.splice(j--, 1)
                            orderArray.splice(i--, 1)
                        }
                    }
                }
            }
        }
        setBooksOutOfOrder([...orderArray])
    }, [order, booksInOrder, booksApiData.books])

    useEffect(() => {
        if (booksOutOfOrder.length > 0) {
            setIsLoading(false)
        }
    }, [booksOutOfOrder])
    
    const addToOrder = () => {
        if (select.value !== "0") {
            let id = select.value.split('-')[0]
            let value = select.value.split('-')[1]
            setOrder([
                ...order,
                {book_id: id, book_title: value, number: 1}
            ])
        }
    }

    const deleteItem = (id) => {
        let index = order.findIndex(x => x.book_id === id)
        let copy = [...order]
        copy.splice(index, 1)
        setOrder(copy)
    }

    const removeOne = id => {
        let index = order.findIndex(x => x.book_id === id)
        // let copy = order.map(x => {
        //     return x
        // })
        let copy = [...order]
        if(copy[index].number > 1) {
            copy[index].number--
        }
        console.log("order : ", order, ", copy : ", copy)
        setOrder(copy)
    }

    const addOne = id => {
        let index = order.findIndex(x => x.book_id === id)
        // let copy = order.map(x => {
        //     return x
        // })
        let copy = [...order]
        copy[index].number++
        // console.log("order : ", order, ", copy : ", copy)
        setOrder(copy)
    }


    const update = () => {
        const copy = order.map(x => ({
            book: Number(x.book_id), number: Number(x.number)
        }))
        let body = { "books": copy}
        let order_id = location.state.order.id
        updateOrder(order_id, body, token['mytoken'])
        apiBooks()
        history.push('/orders')
        // apiOrders(token['mytoken'])
    }

    const delete_order = () => {
        const copy = order.map(x => ({
            book: Number(x.book_id), number: Number(x.number)
        }))
        let body = { "books": copy}
        let order_id = location.state.order.id
        deleteOrder(order_id, body, token['mytoken'])
        history.push('/orders')
    }

    // console.log(order)


    // if (!isLoading) {
    return (
        <>
            <div>
                <h1 id="title">Update your order</h1>
            </div>
            {!isLoading &&
            <div className="form">
                <div id="form-update">
                    {order.map(book => {
                        return (
                            <div className="order-item-field" key={book.book_id}>
                                <label htmlFor={`number${book.book_id}`}>{book.book_title}</label>
                                <div id="trash">
                                    <FontAwesomeIcon icon={faTrashAlt} onClick={() => deleteItem(book.book_id)} />
                                </div>
                                <div id="number-input">
                                    <FontAwesomeIcon onClick={() => removeOne(book.book_id)} icon={faMinus}/>
                                    <input id={`number${book.book_id}`} type="number" value={book.number} readOnly />
                                    <FontAwesomeIcon onClick={() => addOne(book.book_id)} icon={faPlus}/>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <p className="order-select">
                    <select value={select.value} onChange={e => setSelect({value: e.target.value})}>
                        <option value="0">Add a book</option>
                        {booksOutOfOrder.length && booksOutOfOrder.map(book => {
                            return (
                                <option key={book.id} value={`${book.id}-${book.title}`}>{book.title}</option>
                            )
                        })}
                    </select>
                    <button id="add-book" onClick={addToOrder} disabled={select.value === "0"}>Add book</button>
                </p>
                <div className="update-btn">
                    <button onClick={update}>Update</button>
                    <button onClick={delete_order}>Delete Order</button>
                </div>
            </div> }
            {isLoading &&
                <p className="load-or-error">Loading ...</p>
            }
        </>
    )
    // } else {
    //     return (<p>Loading ...</p>)
    // }
}

const mapStateToProps = state => {
    return {
        ordersApiData: state.orders,
        booksApiData: state.books
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        apiBooks: () => dispatch(booksApiCall()),
        updateOrder: (order_id , body, token) => dispatch(updateOrderApiCall(order_id , body, token)),
        apiOrders: (token) => dispatch(ordersApiCall(token)),
        deleteOrder: (order_id, body, token) => dispatch(deleteOrderApiCall(order_id, body, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderUpdate)
