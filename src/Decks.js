import React from 'react';
import { Link } from 'react-router-dom';

const Decks = ({ products, cartItems, createLineItem, updateLineItem, auth})=> {
  const decks = products.filter(product=> product.category === 'deck')
  if(!decks){
    return null
  }
  return (
    <div>
      <h2>Decks</h2>
      <ul>
        {
          decks.map( deck => {
            const cartItem = cartItems.find(lineItem => lineItem.product_id === deck.id);
            return (
              <li key={ deck.id }>
                {/* <img src={`${ deck.img }`}/> */}
                { deck.name }
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
              </li>
            );
          })
        }
      </ul>
    </div>
  );
};

export default Decks;
