import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from './Navbar';
import { Trash } from 'lucide-react';
import axios from 'axios';
import { updateCart } from '../redux/store';
import { ToastContainer } from 'react-toastify';
import Footer from './Footer';
import { toast } from 'react-toastify';
import {ColorRing} from 'react-loader-spinner';
const Cart = ({url}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const email = useSelector(state => state.email);
  const cart = useSelector(state => state.cart);
  const loggedIn = useSelector(state => state.loggedIn);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false); 
  useEffect(() => {
    // Check if the user is logged in
    if (!loggedIn) {
      navigate('/');
    }
    // Calculate total price whenever cart items change
    let total = 0;
    cart.forEach(item => {
      total += item.product.price * item.quantity;
    });
    setTotalPrice(total);
  },[cart]);

  const handleRemoveFromCart = async (productId) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${url}/api/cart/remove`,
        { productId },
        {withCredentials:true} 
      );
      toast.success("Item removed");
      dispatch(updateCart(response.data.cart));
    } catch (error) {   
      if(error.response.message == "Cart is Empty"){
        
      }
      toast.error("Failed to Remove Product");
      console.error('Error removing product:', error);
    }
    setLoading(false);
  };

  const handleIncreaseQuantity = async (productId) => {
    
    setLoading(true);
    try {
      console.log(url);
      
      const response = await axios.post(
        `${url}/api/cart/increase`,
        { productId, quantity: 1 }, // Assuming you're increasing by 1 quantity
        {withCredentials:true} 
      );
      toast.success("Quantity Added");
      dispatch(updateCart(response.data.cart));
    } catch (error) {
      toast.error("Failed to Increase Quantity");
      console.error('Error increasing quantity:', error);
    }
    
    setLoading(false);
  };

  const handleDecreaseQuantity = async (productId) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${url}/api/cart/decrease`,
        { productId, quantity: 1 }, // Assuming you're decreasing by 1 quantity
        {withCredentials:true} 
      );
      toast.success("Quantity Decreased");
      dispatch(updateCart(response.data.cart));
    } catch (error) {
      toast.error("Failed to Decrease Quantity");
      console.error('Error decreasing quantity:', error);
    }
    setLoading(false);
  };

  return (
    <> 
      
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <div style={{position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
      <ColorRing visible={loading} height="80" width="80" ariaLabel="color-ring-loading" wrapperStyle={{}} wrapperClass="color-ring-wrapper" colors={[]} />
      </div>
      
      <div className="mx-auto flex max-w-3xl flex-col space-y-4 p-6 px-2 sm:p-10 sm:px-2" style={{minHeight:"84vh"}}>
        <h2 className="text-3xl font-bold">Your cart</h2>
        <ul className="flex flex-col divide-y divide-gray-200" style={{ width: "100%" }}>
          {cart.map((item) => (
            <li key={item.product.id} className="flex flex-col py-6 sm:flex-row sm:justify-between" style={{ width: "80%" }}>
              <div className="flex w-full space-x-4">
                <img
                  className="h-20 w-20 flex-shrink-0 rounded object-contain outline-none dark:border-transparent sm:h-32 sm:w-32"
                  src={item.product.images}
                  alt={item.product.title}
                />
                <div className="flex w-full flex-col justify-between pb-4">
                  <div className="flex w-full justify-between space-x-2 pb-2">
                    <div className="space-y-1">
                      <h3 className="text-lg font-semibold leading-snug sm:pr-8">{item.product.title}</h3>
                      <p className="text-sm">{item.color}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold">{item.quantity} X ${item.product.price}: ${item.quantity * item.product.price}</p>
                    </div>
                  </div>
                  <div className="flex divide-x text-sm" style={{ display: "flex", alignItems: "center" }}>
                    <button onClick={() => handleRemoveFromCart(item.product.id)} type="button" className="flex items-center space-x-2 px-2 py-1 pl-0">
                      <Trash size={16} />
                      <span>Remove</span>
                    </button>
                    <button type="button" onClick={() => handleDecreaseQuantity(item.product.id)} className="flex items-center space-x-1 px-2 py-1 pl-0" style={{ color: "white", width: "50px", marginRight: "10px", display: "flex", justifyContent: 'center' }}>
                      <span>-</span>
                    </button>
                    {item.quantity}
                    <button type="button" onClick={() => handleIncreaseQuantity(item.product.id)} className="flex items-center space-x-1 px-2 py-1 pl-0" style={{ width: "50px", marginLeft: "10px", display: "flex", justifyContent: 'center', }}>
                      <span>+</span>
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="space-y-1 text-right">
          <p>Total amount: <span className="font-semibold">${totalPrice}</span></p>
        </div>
        <div className="flex justify-end space-x-4">
          <Link to="/">
            <button type="button" className="rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
              Back to shop
            </button>
          </Link>
          <Link to="/checkout">
          <button type="button" className="rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
            Checkout
          </button>
          </Link>
        </div>
      </div>
      
      <Footer/>
      
    </>
  );
};

export default Cart;
