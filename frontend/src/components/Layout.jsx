import React from 'react'
import { useCookies } from 'react-cookie';
import { useHistory, Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { hideNotif } from '../redux/notif/notifActions';
import { ordersApiCall } from '../redux/orders/ordersActions';

const Layout = (props) => {
  const [token, removeToken] = useCookies(['mytoken'])
  const isAuthenticated = (!token['mytoken'] || token['mytoken'] === 'undefined') ? false : true

  let history = useHistory()

  console.log(props.notif.notif)

  const logout = () => {
    removeToken(['mytoken'])
    history.push('/')
  }
  return (
    <div className="background">
      <div id="circle1"></div>
      <div id="circle2"></div>
      <div id="glass">
        <aside id="side">
          <Link to="/">Books</Link>
          <Link to="/basket">My Basket <small>({props.basket.length})</small></Link>
          <Link to="/orders">My orders</Link>
          { !isAuthenticated && 
            <Link to="/login">Login</Link>
          }
          {
            isAuthenticated &&
            <button id="logout" onClick={logout}>Logout</button>
          }
        </aside>
        <article className="article">
        {props.children}
          <div className={
            props.notif.notif === null ? "notification" : "notification on"}
            onTransitionEnd={() => {
              setTimeout(() => {
                props.hideNotif()
                props.reloadOrders(token['mytoken'])
              }, 2000)
            }}
          ><h1>{props.notif.msg}</h1></div>
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
    reloadOrders: (token) => dispatch(ordersApiCall(token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)
