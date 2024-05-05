import React from 'react'
import Navbar from './Navbar';
import { useEffect } from 'react';
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router';
import { Link } from 'react-router-dom';
const Profile = () => {
    const loggedIn = useSelector(state=>state.loggedIn);
    const navigate = useNavigate();
    const name = useSelector(state=>state.name);
    const email = useSelector(state=>state.email);
    useEffect(() => {
        if(!loggedIn){
            navigate('/');
        }
    }, [])
    
  return (
    <>
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
                            htmlFor="name" style={{fontSize:"30px"}}
                          >
                            Name :{name}<br></br><br></br>
                            Email :{email}
                          </label>
                        </div>
                        </div>
                      </div>
                  </form>
                  <Link to='/orders'>
                  <button 
              type="button"
              
              className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Previous Orders
            </button>
            </Link>
                </div>
              </div>
            </div>
          </div>
    </>
  )
}

export default Profile;