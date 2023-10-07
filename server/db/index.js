const client = require('./client');

const {
  fetchProducts,
  createProduct
} = require('./products');

const {
  createUser,
  authenticate,
  findUserByToken
} = require('./auth');

const {
  fetchLineItems,
  createLineItem,
  updateLineItem,
  deleteLineItem,
  updateOrder,
  fetchOrders
} = require('./cart');


const seed = async()=> {
  const SQL = `
    DROP TABLE IF EXISTS line_items;
    DROP TABLE IF EXISTS products;
    DROP TABLE IF EXISTS orders;
    DROP TABLE IF EXISTS users;

    CREATE TABLE users(
      id UUID PRIMARY KEY,
      created_at TIMESTAMP DEFAULT now(),
      username VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(100) NOT NULL,
      is_admin BOOLEAN DEFAULT false NOT NULL
    );

    CREATE TABLE products(
      id UUID PRIMARY KEY,
      created_at TIMESTAMP DEFAULT now(),
      category VARCHAR(20) NOT NULL,
      name VARCHAR(100) UNIQUE NOT NULL,
      size VARCHAR(100) NOT NULL,
      description VARCHAR(255),
      img VARCHAR(255) NOT NULL,
      price INTEGER NOT NULL
      
    );

    CREATE TABLE orders(
      id UUID PRIMARY KEY,
      created_at TIMESTAMP DEFAULT now(),
      is_cart BOOLEAN NOT NULL DEFAULT true,
      user_id UUID REFERENCES users(id) NOT NULL
    );

    CREATE TABLE line_items(
      id UUID PRIMARY KEY,
      created_at TIMESTAMP DEFAULT now(),
      product_id UUID REFERENCES products(id) NOT NULL,
      order_id UUID REFERENCES orders(id) NOT NULL,
      quantity INTEGER DEFAULT 1,
      CONSTRAINT product_and_order_key UNIQUE(product_id, order_id)
    );

  `;
  await client.query(SQL);

  const [moe, lucy, ethyl] = await Promise.all([
    createUser({ username: 'moe', password: 'm_password', is_admin: false}),
    createUser({ username: 'lucy', password: 'l_password', is_admin: false}),
    createUser({ username: 'ethyl', password: '1234', is_admin: true})
  ]);
  await Promise.all([
    createProduct({ 
      name: 'Flames Skateboard Deck', 
      category: 'deck', 
      size: '7.75" 8.00" 8.25" 8.50"', 
      description: 'Monster trucks, a certain famous tv chef, and now a Skeightboard skateboard all have flames as a shared look.' ,
      img: 'https://shop.ccs.com/cdn/shop/products/Flames-Blue-1_6c3b5dfa-ff9a-4b3e-a856-ff8bf2ac464e.jpg?v=1650585169',
      price: 3995
    }),
    createProduct({ 
      name: 'Spectrum Color-Up Skateboard Deck', 
      category: 'deck', 
      size: '8.50"', 
      description: 'Toy Machine 30th Anniversary Graphic',
      img: 'https://shop.ccs.com/cdn/shop/files/827059434897-1.jpg?v=1689891736',
      price: 7695
    }),
    createProduct({ 
      name: 'SML Bluff Park Tom Knox Skateboard Wheels', 
      category: 'wheels', 
      size: '53mm', 
      description: 'Tom Knox Pro Model',
      img: 'https://shop.ccs.com/cdn/shop/files/BQ69E17-1_1280x.jpg?v=1690844262',
      price: 3695
    }),
    

  ]);
  // let orders = await fetchOrders(ethyl.id);
  // let cart = orders.find(order => order.is_cart);
  // let lineItem = await createLineItem({ order_id: cart.id, product_id: foo.id}); // creating order default
  // lineItem.quantity++;
  // await updateLineItem(lineItem);
  // lineItem = await createLineItem({ order_id: cart.id, product_id: bar.id});
  // cart.is_cart = false;
  // await updateOrder(cart);
};

module.exports = {
  fetchProducts,
  fetchOrders,
  fetchLineItems,
  createLineItem,
  updateLineItem,
  deleteLineItem,
  updateOrder,
  authenticate,
  findUserByToken,
  seed,
  client
};
