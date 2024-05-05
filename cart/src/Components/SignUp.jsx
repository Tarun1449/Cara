import React, { useState } from 'react';
import axios from 'axios';

import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ArrowRight } from 'lucide-react'
import logo from '../assets/logo.png'
import { ColorRing } from 'react-loader-spinner';
export default function SignUp({url}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name,setname] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setloading] = useState(false);
    const handleEmailChange = (e) => {

        setEmail(e.target.value);
        
    };

    const handlePasswordChange = (e) => {
        
        setPassword(e.target.value);
        
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        
    };
    const handleNameChange =(e) =>{
        
        setname(e.target.value);
        
    }
    const navigate = useNavigate();
    const handleSubmit = async () => {
      setloading(true);
      if (password === confirmPassword) {
          const dataToSend = { name, email, password };
          try {
              const response = await axios.post(`${url}/api/signup`, dataToSend);
              console.log(response.data);
              toast.success("SignUP Successful. Redirecting to login page...", {
                  onClose: () => navigate('/Login')
              });
          } catch (error) {
              if (error.response) {
                  const status = error.response.status;
                  const errorMessage = error.response.data.message;
                  if (status === 400 && errorMessage === 'User already exists.') {
                      toast.error("User already exists.");
                  } else if (status === 500 && errorMessage === 'Internal server error.') {
                      toast.error("Internal Server Error");
                  } else if (status === 400 && errorMessage === 'Email, name, and password are required.') {
                      toast.warning("Please fill all the required fields.");
                  } else {
                      toast.error("An unexpected error occurred.");
                  }
              } else {
                  toast.error("An error occurred while connecting to the server.");
              }
          }
      } else {
          toast.error("Password and Confirm Password didn't match.");
      }
      setloading(false);
  };
  return (
    <>
    <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
    <ColorRing visible={loading} height="80" width="80" ariaLabel="color-ring-loading" wrapperStyle={{}} wrapperClass="color-ring-wrapper" colors={[]} />
</div>
    <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    
    <section>
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <div className="mb-2 flex justify-center">
          <img src={logo} width={140} height={40} class="logo"/>
              
            
          </div>
          
          <form action="#" method="POST" className="mt-8">
            <div className="space-y-5">
              <div>
                <label htmlFor="name" className="text-base font-medium text-gray-900 t-a-l">
                  {' '}
                  First Name{' '}
                </label>
                <div className="mt-2">
                  <input
                    onChange={handleNameChange}
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="First Name"
                    id="name"
                  ></input>
                </div>
              </div>
              <div>
                <label htmlFor="email" className="text-base font-medium text-gray-900">
                  {' '}
                  Email address{' '}
                </label>
                <div className="mt-2">
                  <input
                  onChange={handleEmailChange}
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="email"
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
              <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-base font-medium text-gray-900">
                    {' '}
                    Confirm Password{' '}
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    onChange={handleConfirmPasswordChange}
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="password"
                    placeholder="Password"
                    id="password"
                  ></input>
                </div>
              </div>
              <div>
                <button
                onClick={handleSubmit}
                  type="button"
                  className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                >
                  Create Account <ArrowRight className="ml-2" size={16} />
                </button>
              </div>
            </div>
            <h4 className=" text-center text-1xl font-bold leading-tight text-black" style={{marginTop:"50px"}}>
            Sign up to create account
          </h4>
          <p className="mt-3 text-center text-base text-gray-600">
            Already have an account?{' '}
            <Link to='/Login'>
              Sign In
            </Link>
          </p>
          </form>
          <div className="mt-3 space-y-3">
          </div>
        </div>
        
      </div>
    </section>
    </>
  )
}
