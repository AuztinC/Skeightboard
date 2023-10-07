import React from 'react';
import { Link } from 'react-router-dom';

const Decks = ({ products, cartItems, createLineItem, updateLineItem, auth})=> {
  const decks = products.filter(product=> product.category === 'deck')
  if(!decks){
    return null
  }
  return (<>
  <div className='products'>
    <h2>Decks</h2>
    <div className='list-cont'>
        {
          decks.map( deck => {
            const cartItem = cartItems.find(lineItem => lineItem.product_id === deck.id);
            return (
              <div key={ deck.id } className='list-item'>
                <img src={`${ deck.img }`} className='list-img'/>
                <h3>{ deck.name }</h3>
                {
                  auth.id ? (
                    cartItem ? <button onClick={ ()=> updateLineItem(cartItem)}>Add Another</button>: <button onClick={ ()=> createLineItem(deck)}>Add</button>
                  ): null 
                }
                {
                  auth.is_admin ? (
                    <Link to={`/products/${deck.id}/edit`}>Edit</Link>
                  ): null
                }
              </div>
            );
          })
        }
    </div>
  </div>
  </>);
};

export default Decks;
