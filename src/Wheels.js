import React from 'react';
import { Link } from 'react-router-dom';

const Wheels = ({ products, cartItems, createLineItem, updateLineItem, auth})=> {
  const wheels = products.filter(product=> product.category === 'wheels')
  if(!wheels){
    return null
  }
  return (
    <div>
      <h2>Wheels</h2>
      <ul>
        {
          wheels.map( wheel => {
            const cartItem = cartItems.find(lineItem => lineItem.product_id === wheel.id);
            return (
              <li key={ wheel.id }>
                { wheel.name }
                {
                  auth.id ? (
                    cartItem ? <button onClick={ ()=> updateLineItem(cartItem)}>Add Another</button>: <button onClick={ ()=> createLineItem(wheel)}>Add</button>
                  ): null 
                }
                {
                  auth.is_admin ? (
                    <Link to={`/products/${wheel.id}/edit`}>Edit</Link>
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

export default Wheels;
