import './App.css';
import Books from './components/Books'
import Basket from './components/Basket'
import Details from './components/Details'
import Login from './components/Login'
import Orders from './components/Orders'
import OrderUpdate from './components/OrderUpdate'
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import { Provider } from 'react-redux'
import store from './redux/store'
import Layout from './components/Layout';

function Router() {
  return (
    <CookiesProvider>
      <Provider store={store}>
        <BrowserRouter>
        <Layout>
          <Switch>
            <Route exact path='/' component={Books} />
            <Route path='/basket' component={Basket} />
            <Route path='/details/:id' component={Details} />
            <Route path='/orders' component={Orders} /> 
            <Route path='/update' component={OrderUpdate} />
            <Route path='/login' component={Login} />
          </Switch>
        </Layout>

        </BrowserRouter>
      </Provider>
    </CookiesProvider>
  )
}

function App() {
  

  return (
    <Router />
  );
}

export default App;
