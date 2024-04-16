// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom';

// const Cart = () => {
//   const [cartItems, setCartItems] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Retrieve cart items from local storage on component mount
//     const storedCartItems = localStorage.getItem('cart');
//     if (storedCartItems) {
//       setCartItems(JSON.parse(storedCartItems));
//     }
//   }, []);

//   const handleAddQuantity = (index) => {
//     const updatedCartItems = [...cartItems];
//     updatedCartItems[index].quantity++;
//     setCartItems(updatedCartItems);
//     localStorage.setItem('cart', JSON.stringify(updatedCartItems));
//   };

//   const handleReduceQuantity = (index) => {
//     const updatedCartItems = [...cartItems];
//     updatedCartItems[index].quantity = Math.max(updatedCartItems[index].quantity - 1, 1);
//     setCartItems(updatedCartItems);
//     localStorage.setItem('cart', JSON.stringify(updatedCartItems));
//   };

//   const handleRemoveItem = (index) => {
//     const updatedCartItems = [...cartItems];
//     updatedCartItems.splice(index, 1);
//     setCartItems(updatedCartItems);
//     localStorage.setItem('cart', JSON.stringify(updatedCartItems));
//   };

//   const handleClearCart = () => {
//     setCartItems([]);
//     localStorage.removeItem('cart');
//   };

//   const handlePlaceOrder = () => {
//     // Simulate payment process
//     alert('Payment successful! Amount: 1.69rs');
//     // You can also navigate to a success page
//     // navigate('/success');
//   };

//   const handleRedirectToPlayer = () => {
//     navigate('/');
//   };

//   return (
//     <div>
//       <h1>Cart</h1>
//       {cartItems.length === 0 ? (
//         <div>
//           <p>The cart is empty. Please add something.</p>
//           <button onClick={handleRedirectToPlayer}>Back to Player</button>
//         </div>
//       ) : (
//         <div>
//           {cartItems.map((item, index) => (
//             <div key={index}>
//               <p>{item.item}</p>
//               <p>Quantity: {item.quantity}</p>
//               <button onClick={() => handleAddQuantity(index)}>+</button>
//               <button onClick={() => handleReduceQuantity(index)}>-</button>
//               <button onClick={() => handleRemoveItem(index)}>Remove</button>
//             </div>
//           ))}
//           <button onClick={handleClearCart}>Clear Cart</button>
//           <Link to='/pay'>
//           <button onClick={handlePlaceOrder}>Place Order</button>
//           </Link>
          
//         </div>
//       )}
//     </div>
//   );
// };

// export default Cart;










import data from "./data.jsx";
import { useState } from "react";
import './style.css';

export default function Accordion() {
  const [selected, setSelected] = useState(null);

  function handleSingleSelection(getCurrentId) {
    setSelected(getCurrentId === selected ? null : getCurrentId);
  }

  return (
    <>
    <div className="wrapper">
      <div className="accordion">
      <h1 className="heading">FAQ's</h1>
        {data && data.length > 0 ? (
          data.map((dataItem) => (
            <div className="item" key={dataItem.id}>
              <div onClick={() => handleSingleSelection(dataItem.id)} className="title">
                <h3>{dataItem.question}</h3>
                <span onClick={() => handleSingleSelection(dataItem.id)}>+</span>
              </div>
              {selected === dataItem.id ? (
                <div className= "content">{dataItem.answer}</div>
              )
            : null
            }
            </div>
          ))
        ) : (
          <div>No Data found!</div>
        )}
      </div>
    </div>
    </>
  );
}