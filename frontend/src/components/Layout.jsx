import React from 'react'
import { useCookies } from 'react-cookie';
import { useHistory, Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { hideNotif } from '../redux/notif/notifActions';
import { emptyOrders, ordersApiCall } from '../redux/orders/ordersActions';
import { emptyBasket } from '../redux/basket/basketActions';

const Layout = ({notif, basket, children, hideNotif, reloadOrders, emptyBasket, emptyOrders}) => {
  const [token, removeToken] = useCookies(['mytoken'])
  const isAuthenticated = (!token['mytoken'] || token['mytoken'] === 'undefined') ? false : true
  console.log(basket.basket.length)
  let history = useHistory()

  console.log(history.location.pathname)

  const logout = () => {
    removeToken(['mytoken'])
    emptyBasket()
    emptyOrders()
    history.push('/')
  }
  return (
    <div className="background">
      <div id="circle1"></div>
      <div id="circle2"></div>
      <div id="glass">
        <aside id="side">
          <Link to="/">Books</Link>
          <Link to="/basket">My Basket <small>({basket.basket.length})</small></Link>
          <Link to='/orders'>My orders</Link>
          { !isAuthenticated && 
            <Link to="/login">Login</Link>
          }
          {
            isAuthenticated &&
            <button id="logout" onClick={logout}>Logout</button>
          }
        </aside>
        <article className="article">
        {children}
          <div className={
            notif.notif === null ? "notification" : "notification on"}
            onTransitionEnd={() => {
              setTimeout(() => {
                hideNotif()
                reloadOrders(token['mytoken'])
              }, 2000)
            }}
          ><h1>{notif.msg}</h1></div>
        </article>
      </div>
    </div>
    )
}

const mapStateToProps = state => {
  return {
    notif: state.notif,
    basket: state.basket,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    hideNotif: () => dispatch(hideNotif()),
    reloadOrders: (token) => dispatch(ordersApiCall(token)),
    emptyBasket: () => dispatch(emptyBasket()),
    emptyOrders: () => dispatch(emptyOrders())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)
