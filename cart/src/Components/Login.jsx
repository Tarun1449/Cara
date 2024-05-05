import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../redux/store';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../assets/logo.png';
import { updateCart } from '../redux/store';
import {useSelector} from 'react-redux';
import { ArrowRight } from 'lucide-react'
import { ColorRing } from 'react-loader-spinner';
export default function Login({url}) {
    const [email, setEmail] = useState('');
    const cart = useSelector(state=>state.cart);
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };
  
      // Example usage
    
    const navigate = useNavigate();
    
    

    const handleSubmit = async () => {
      setLoading(true);
      const dataToSend = { email, password };
      
      try {
          // Make a request to authenticate the user
          const response = await axios.post(`${url}/api/login`, dataToSend, { withCredentials: true });
              toast.success("Login Successful. Redirecting...");
              navigate('/');
              window.location.reload(); // This line might not be necessary
      } catch (error) {
          // Handle error
          console.error('Error during login:', error);
          toast.error("An unexpected error occurred during login.");
      }
  
      setLoading(false);
  };
  
  
  // Function to get the value of the token from the cookie
  

  return (
    <>
    <ToastContainer/>
    <div style={{position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
      <ColorRing visible={loading} height="80" width="80" ariaLabel="color-ring-loading" wrapperStyle={{}} wrapperClass="color-ring-wrapper" colors={[]} />
      </div>
    <section>
   
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24" >
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          
          <div className="mb-2 flex justify-center">
          <img src={logo} width={140} height={40} class="logo"/>
          </div>
          <h2 className="text-center text-2xl font-bold leading-tight text-black">
            Login
          </h2>
          
          <form action="#" method="POST" className="mt-8">
            <div className="space-y-5">
              
              <div>
                <label htmlFor="email" className="text-base font-medium text-gray-900">
                  {' '}
                  Email address{' '}
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="email"
                    onChange={handleEmailChange}
                    placeholder="Email"
                    id="email"
                  ></input>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-base font-medium text-gray-900">
                    {' '}
                    
                    Password{' '}
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    onChange={handlePasswordChange}
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="password"
                    placeholder="Password"
                    id="password"
                  ></input>
                </div>
              </div>
              <div>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                >
                  Login <ArrowRight className="ml-2" size={16} />
                </button>
              </div>
            </div>
            <p className="mt-20 text-center text-base text-gray-600">
            Already have an account?{' '}
            <Link
              to="/SignUp"
              
              className="font-medium text-black transition-all duration-200 hover:underline"
            >
              Sign Up
            </Link>
          </p>
          </form>
        </div>
      </div>
    </section>
    </>
  )
}
