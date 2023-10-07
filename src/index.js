import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Link, HashRouter, Routes, Route, useNavigate } from 'react-router-dom';
import api from './api';
import Decks from './Decks';
import Wheels from './Wheels';
import Orders from './Orders';
import Cart from './Cart';
import Login from './Login';
import Home from './Home';
import Products from './Products';
import CreateUser from './CreateUser';

const App = ()=> {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [lineItems, setLineItems] = useState([]);
  const [auth, setAuth] = useState({});
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const attemptLoginWithToken = async()=> {
    await api.attemptLoginWithToken(setAuth);
  }

  useEffect(()=> {
    auth.id ?? navigate('/')
    attemptLoginWithToken();
    const fetchData = async()=> {
      await api.fetchProducts(setProducts);
    };
    fetchData();
  }, []);


  useEffect(()=> {
    if(auth.id){
      const fetchData = async()=> {
        await api.fetchOrders(setOrders);
      };
      fetchData();
    }
  }, [auth]);

  useEffect(()=> {
    if(auth.id){
      const fetchData = async()=> {
        await api.fetchLineItems(setLineItems);
      };
      fetchData();
    }
  }, [auth]);


  const createLineItem = async(product)=> {
    await api.createLineItem({ product, cart, lineItems, setLineItems});
  };

  const updateLineItem = async(lineItem)=> {
    await api.updateLineItem({ lineItem, cart, lineItems, setLineItems });
  };

  const updateOrder = async(order)=> {
    await api.updateOrder({ order, setOrders });
  };

  const removeFromCart = async(lineItem)=> {
    await api.removeFromCart({ lineItem, lineItems, setLineItems });
  };

  const cart = orders.find(order => order.is_cart) || {};

  const cartItems = lineItems.filter(lineItem => lineItem.order_id === cart.id);

  const cartCount = cartItems.reduce((acc, item)=> {
    return acc += item.quantity;
  }, 0);

  const login = async(credentials)=> {
    await api.login({ credentials, setAuth });
  }

  const logout = ()=> {
    api.logout(setAuth);
  }

  return (<>
    <div>
      {
        auth.id ? (
          <>
            <nav>
              <Link to='/'> <h1>Go Skeightboard</h1> </Link>
              <Link to='/products'>All Products </Link>
              <Link to='/decks'>Decks </Link>
              <Link to='/wheels'>Wheels </Link>
              <Link to='/orders'> Your Orders ({ orders.filter(order => !order.is_cart).length })</Link>
              <Link to='/cart'>Cart ({ cartCount })</Link>
              <span>
                Welcome { auth.username }!
                <button onClick={()=>{logout(); navigate('/')}}>Logout</button>
              </span>
            </nav>
          </>
        ):(
          <div>
            
            <Login login={ login }/>
            <Link to={'/create-user'}></Link>
          </div>
        )
      }
    </div>
    <Routes>
      <Route path='/' element={ <Home /> }
      />
      <Route path='products' element={ <Products
                auth = { auth }
                products={ products }
                cartItems = { cartItems }
                createLineItem = { createLineItem }
                updateLineItem = { updateLineItem }
              /> }
      />
      <Route path='decks' element={ <Decks
                auth = { auth }
                products={ products }
                cartItems = { cartItems }
                createLineItem = { createLineItem }
                updateLineItem = { updateLineItem }
              /> }
      />
      <Route path='wheels' element={ <Wheels
                auth = { auth }
                products={ products }
                cartItems = { cartItems }
                createLineItem = { createLineItem }
                updateLineItem = { updateLineItem }
              /> }
      />
      <Route path='cart' element={ <Cart
                cart = { cart }
                lineItems = { lineItems }
                products = { products }
                updateOrder = { updateOrder }
                removeFromCart = { removeFromCart }
              />  }
      />
      <Route path='orders' element={ <Orders
                orders = { orders }
                products = { products }
                lineItems = { lineItems }
              />  }
      />
    </Routes>
  </>);
};

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<HashRouter><App /></HashRouter>);
