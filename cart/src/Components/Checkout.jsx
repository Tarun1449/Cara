import React, { useEffect } from 'react'

import Navbar from './Navbar'
import {useSelector} from "react-redux"
import { useState } from 'react'
import {useDispatch} from'react-redux'
import  axios from 'axios';
import { updateCart } from '../redux/store'
import { toast } from 'react-toastify';
import {useNavigate} from 'react-router'
import { ToastContainer } from 'react-toastify';
import { ColorRing } from 'react-loader-spinner'
import Footer from './Footer'

export default function Checkout({url}) {
    const cart = useSelector(state => state.cart);
    const name = useSelector(state => state.name);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [totalPrice, setTotalPrice] = useState(0);
    const [state,setState] = useState('');
    const loggedIn = useSelector(state=>state.loggedIn);
    const [loading, setloading] = useState(false);
    const handleAddressChange = (e) => {
        setAddress(e.target.value);
        
    }
    useEffect(()=>{
      // Calculate total price whenever cart items change
      if (!loggedIn) {
        navigate('/');
      }
        let total = 0;
        cart.forEach(item => {
        total += item.product.price * item.quantity;
        });
        setTotalPrice(total);
    },[]);
    
    const handleCityChange = (e) => {
        setCity(e.target.value);
    }
    const handleStateChange =(e) =>{
       setState(e.target.value);
    }
    const handlePostalCodeChange = (e) => {
        setPostalCode(e.target.value);
    }

    const handleSubmit = async(e) => {
      setloading(true);
        e.preventDefault();
        const currentDate = new Date();
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        const formattedDate = currentDate.toLocaleDateString('en-US', options);
        
        // Handle submission logic here
        const shippingData = {
            name,
            address,
            city,
            state,
            postalCode,
            date:formattedDate,
            products:cart,
            total:totalPrice,
            OrderStatus:"confirm"
        };
        
        
        try{
        const responce = await axios.post(`${url}/api/makeOrders`,{shippingData},{
          withCredentials:true
        });
        setAddress('');
        setCity('');
        setPostalCode('');
        setState('');
        
        toast.success("Order SuccessFull", {
          onClose: () => {
            dispatch(updateCart(responce.data.cart));
            navigate("/")
            window.location.reload();
          }
        });
        
        
        
        
      }

    catch(error){
        
        const responce = error.response;
        if (responce.data.message == "Fill all required fields"){
          toast.error("Fill the required Fields");
        }else if(responce.data.message === "Cart is Empty"){
          toast.error("Cart is Empty");
        }else{
          toast.error("Internal Server Error");
        }
  }
    setloading(false);}
  return (
    <>
    <ToastContainer/>
    
    <div style={{position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}>
      <ColorRing visible={loading} height="80" width="80" ariaLabel="color-ring-loading" wrapperStyle={{}} wrapperClass="color-ring-wrapper" colors={[]} />
      </div>
    <div className="mx-auto my-4 max-w-4xl md:my-6">
      <div className="overflow-hidden  rounded-xl shadow">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Contact Info */}
          <div className="px-5 py-6 text-gray-900 md:px-8">
            <div className="flow-root">
              <div className="-my-6 divide-y divide-gray-200">
                <div className="py-6">
                  <form>
                    <div className="mx-auto max-w-2xl px-4 lg:max-w-none lg:px-0">
                      <div>
                        <h3
                          id="contact-info-heading"
                          className="text-lg font-semibold text-gray-900"
                        >
                          Contact information
                        </h3>

                        <div className="mt-4 w-full" >
                          <label
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            htmlFor="name"
                          >
                            Name
                          </label>
                          <input
                            
                            className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                            type="text"
                            placeholder={name}
                            id="name"
                            value={name}
                          ></input>
                        </div>
                      </div>
                      <hr className="my-8" />
                      <div className="mt-10">
                        <h2 className="text-lg font-semibold text-gray-900">Cash On Delivery Avaible Only</h2>
                        <h6>Pre Payment Options were Avaible Soon</h6>
                      </div>
                      <hr className="my-8" />
                      <div className="mt-10">
                        <h3 className="text-lg font-semibold text-gray-900">Shipping address</h3>

                        <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-3">
                          <div className="sm:col-span-3">
                            <label
                              htmlFor="address"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Address
                            </label>
                            <div className="mt-1">
                              <input
                                type="text"
                                id="address"
                                name="address"
                                autoComplete="street-address"
                                onChange={handleAddressChange}
                                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                              />
                            </div>
                          </div>

                          <div>
                            <label
                              htmlFor="city"
                              className="block text-sm font-medium text-gray-700"
                            >
                              City
                            </label>
                            <div className="mt-1">
                              <input
                                type="text"
                                id="city"
                                name="city"
                                onChange={handleCityChange}
                                autoComplete="address-level2"
                                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                              />
                            </div>
                          </div>

                          <div>
                            <label
                              htmlFor="region"
                              className="block text-sm font-medium text-gray-700"
                            >
                              State / Province
                            </label>
                            <div className="mt-1">
                              <input
                                type="text"
                                id="region"
                                onChange={handleStateChange}
                                name="region"
                                autoComplete="address-level1"
                                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                              />
                            </div>
                          </div>

                          <div>
                            <label
                              htmlFor="postal-code"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Postal code
                            </label>
                            <div className="mt-1">
                              <input
                                type="text"
                                onChange={handlePostalCodeChange}
                                id="postal-code"
                                name="postal-code"
                                autoComplete="postal-code"
                                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <hr className="my-8" />
                      <div className="mt-10">
                        <h3 className="text-lg font-semibold text-gray-900">Billing information</h3>

                        <div className="mt-6 flex items-center">
                          <input
                            id="same-as-shipping"
                            name="same-as-shipping"
                            type="checkbox"
                            defaultChecked
                            className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                          />
                          <div className="ml-2">
                            <label
                              htmlFor="same-as-shipping"
                              className="text-sm font-medium text-gray-900"
                            >
                              Same as shipping information
                            </label>
                          </div>
                        </div>
                      </div>

                      
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          {/* Product List */}
          <div className="bg-gray-100 px-5 py-6 md:px-8">
            <div className="flow-root">
              <ul className="-my-7 divide-y divide-gray-200" style={{display:'flex',alignItems:"center",justifyContent:"right",flexDirection:"column",width:"100%",height:"75vh",overflow:"scroll"}}>
                {cart.map((product) => (
                  <li 
                    key={product.product.id}
                    className="flex items-stretch justify-between space-x-5 py-7"
                  >
                    <div className="flex flex-1 items-stretch">
                      <div className="flex-shrink-0">
                        <img
                          className="h-20 w-20 rounded-lg border border-gray-200 bg-white object-contain"
                          src={product.product.images}
                          
                        />
                      </div>
                      <div className="ml-5 flex flex-col justify-between">
                        <div className="flex-1">
                          <p className="text-sm font-bold">{product.product.title}</p>
                          <p className="mt-1.5 text-sm font-medium text-gray-500">
                            {product.color}
                          </p>
                        </div>
                        <p className="mt-4 text-xs font-medium ">X{product.quantity}</p>
                      </div>
                    </div>
                    <div className="ml-auto flex flex-col items-end justify-between">
                      <p className="text-right text-sm font-bold text-gray-900">${product.product.price}X{product.quantity}:${product.quantity*product.product.price}</p>
                      
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <hr className="mt-6 border-gray-200" />
            <form action="#" className="mt-6">
              <div className="sm:flex sm:space-x-2.5 md:flex-col md:space-x-0 lg:flex-row lg:space-x-2.5">
                
              </div>
            </form>
            <ul className="mt-6 space-y-3" style={{width:"90%"}}>
              <li className="flex items-center justify-between text-gray-600">
              <p className="text-sm font-medium "><h4>Total</h4></p>
              </li>
              <li className="flex items-center justify-between text-gray-900">
               
                <p className="text-sm font-bold ">${totalPrice}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-10 flex justify-end border-t border-gray-200 pt-6" style={{justifyContent:"center"}}>
                        <button
                          onClick={handleSubmit}
                          type="button"
                          className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                        >
                          Order
                        </button>
                      </div>
    </div>
    
    <Footer/>
    </>
  )
    
}