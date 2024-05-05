import React, { useEffect, useState } from 'react'
import Navbar from './Navbar';
import  axios from 'axios';
import Footer from './Footer';
import {useNavigate} from 'react-router';
import {useSelector} from 'react-redux';

const Orders = ({orders}) => {
  
  const loggedIn = useSelector(state => state.loggedIn);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchOrder(){
      if(!loggedIn){
        navigate("/");
      }
    }
  fetchOrder();
  
  
  }, [])
  const a = async()=>{
  
  }
  return (
    <>
      
      <div className="mx-auto my-4 max-w-6xl px-2 md:my-6 md:px-0" style={{minHeight:"79vh"}}>
        <h2 className="text-3xl font-bold">Previous Orders</h2>
        <div className="mt-3 text-sm">
          Check the status of recent and old orders & discover more products
        </div>
        {orders.map(order=>(
        <>
        <div className="mt-8 flex flex-col overflow-hidden rounded-lg border border-gray-300 md:flex-row" style={{ height: "500px" }}>
        <div className="w-full border-r border-gray-300 bg-gray-100 md:max-w-xs">
          <div className="p-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-1">
              {[
                ['Order ID', order.id],
                ['Date', order.date],
                ['Total Amount',"$"+order.total],
                ['Order Status', 'Confirmed'],
                ['Address' ,order.address],
                ['City',order.city],
                ['State',order.state],
                ['PostalCode',order.postalCode]
              ].map(([key, value]) => (
                <div key={key} className="mb-4">
                  <div className="text-sm font-semibold">{key}</div>
                  <div className="text-sm font-medium text-gray-700">{value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          <div className="p-8">
            <ul className="-my-7 divide-y divide-gray-200" style={{width:"100%",display:'flex',flexDirection:"column"}}>
              {order.products.map((product) => (
                <li style={{width:"80%"}}
                  key={product.product.id}
                  className="flex flex-col justify-between space-x-5 py-7 md:flex-row"
                >
                  <div className="flex flex-1 items-stretch">
                    <div className="flex-shrink-0">
                      <img
                        className="h-20 w-20 rounded-lg border border-gray-200 object-contain"
                        src={product.product.images}
                        
                      />
                    </div>
                    <div className="ml-5 flex flex-col justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-bold text-gray-900">{product.product.title}</p>
                      </div>
                      <p className="mt-4 text-sm font-medium text-gray-500">x {product.quantity}</p>
                    </div>
                  </div>
                  <div className="ml-auto flex flex-col items-end justify-between">
                    <p className="text-right text-sm font-bold text-gray-900">${product.product.price}</p>
                  </div>
                </li>
              ))}
            </ul>
            <hr className="my-8 border-t border-t-gray-200" />
          </div>
        </div>
      </div>
        
        </>
         ))}  
        
      </div>
      
      <Footer/>
    </>
  )
}

export default Orders