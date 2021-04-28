import React, { useEffect } from 'react'
import '../css/Orders.css'
import { connect } from 'react-redux'
import { ordersApiCall } from '../redux/orders/ordersActions'
import { useCookies } from 'react-cookie'
import Order from './Order'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'

const Orders = ({ordersApiData, apiOrders}) => {

    const [token] = useCookies(['mytoken'])
    let history = useHistory()
    const isAuthenticated = (!token['mytoken'] || token['mytoken'] === 'undefined') ? false : true
    useEffect(() => {
        if (ordersApiData.orders.length === 0 && isAuthenticated) {
            apiOrders(token['mytoken'])
        }
    }, [token, apiOrders])
    console.log(isAuthenticated)
    // useEffect(() => {
    //     if (!token['mytoken'] || token['mytoken'] === 'undefined') {
    //         history.push('/login')
    //     }
    // }, [token, history])

    const displayOrdersData = ordersApiData.ordersIsLoading ? (
        <p className="load-or-error">Loading ...</p>
    )
    : ordersApiData.ordersError ? (
        <p className="load-or-error">{ordersApiData.ordersError}</p>
    )
    : (
        ordersApiData.orders.map(order => {
            return (
                <Order key={order.id} order={order} />
            )
        })
    )
    
    return (
        <>
            <h1 id="title">My orders</h1>
            {isAuthenticated &&
            <div className="cards">
                {displayOrdersData}
            </div>
            }
            {!isAuthenticated &&
                <Link to='/login'>Login now to see your orders!</Link>
            }
        </>
    )
}

const mapStateToProps = state => {
    return {
        ordersApiData: state.orders
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        apiOrders: (token) => dispatch(ordersApiCall(token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders)
