import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link} from 'react-router-dom'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import logo from "../assets/logo.png"
import { fetchCartData, login, updateCart } from '../redux/store';
import { IoMdCart } from "react-icons/io";
import { useEffect } from 'react';
import { Menu, X } from 'lucide-react'
import axios from 'axios';
import { CgProfile } from "react-icons/cg";

export function Navbar({url}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loggedIn = useSelector(state => state.loggedIn);
  const cart = useSelector(state=>state.cart);
  const [totalQuantity, setTotalQuantity] = useState(0);

  useEffect(() => {
    
    // Calculate total quantity when cart changes
    const calculateTotalQuantity = () => {
        
        let total = 0;
        cart.forEach(item => {
            total += item.quantity;
        });
        setTotalQuantity(total);
    };

    calculateTotalQuantity(); // Calculate initial total quantity
}, [cart]);

const out = async () => {
  try {
    await axios.get(`${url}/api/logout`, { withCredentials: true });

    // Perform any additional logout-related actions (e.g., redirecting the user)
    // Redirect the user to the login page or any other page
    window.location.reload();
  } catch (error) {
    console.error('Error during logout:', error);
    
  }
};

  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }
  const menuItems = [
    {
      name: 'Home',
      des:'',
      link: "/",
    },
    {
      name: 'About',
      des:'',
      link: '/about',
    },
    {
      name: 'Contact',
      des:'',
      link: '/about'
    },
    loggedIn && {
      name:<CgProfile fontSize={30}/>,
      des:'',
      link:'/profile'
    },
    loggedIn && { // Conditionally add cart item if logged in
      name: <IoMdCart fontSize={30} />,
      des: totalQuantity,
      link: '/cart'
    }
  ];

  return (
    <div className="sticky top-0 z-50 w-full bg-white right z-999 opacity-100"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
        <div className="inline-flex items-center space-x-2">
          <span>
          <Link to="/"><img src={logo} width={140} height={40} classname="logo"/></Link>
          
          </span>
        </div>
        <div className="hidden lg:block">
          <ul className="inline-flex space-x-8">
            {menuItems.map((item,indx) => (
              <li key={indx}>
                <Link
                  to={item.link}
                  className="text-sm font-semibold text-gray-800 hover:text-gray-900"
                >
                  <label style={{display:"flex"}}> {item.name}{item.des}</label>
                 
                </Link>
                
              </li>
            ))}
          </ul>
        </div>
        
        <div className="hidden lg:block">
        {loggedIn ? (
            <button
              type="button"
              onClick={out}
              className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              LogOut
            </button>
            
          ) : (
            <Link to={"/SignUp"}>
              <button
                type="button"
                className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                SignUp
              </button>
            </Link>
          )}
        </div>
        <div className="lg:hidden">
          <Menu onClick={toggleMenu} className="h-6 w-6 cursor-pointer" />
        </div>
        {isMenuOpen && (
          <div className="absolute inset-x-0 top-0 z-50 origin-top-right transform p-2 transition lg:hidden">
            <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="px-5 pb-6 pt-5">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center space-x-2">
                    <span>
                    <Link to='/'><img src={logo} width={140} height={40} class="logo"/></Link>
                    </span>
                  </div>
                  <div className="-mr-2">
                    <button
                      type="button"
                      onClick={toggleMenu}
                      className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                      <span className="sr-only">Close menu</span>
                      <X className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </div>
                <div className="mt-6">
                  <nav className="grid gap-y-4">
                    {menuItems.map((item) => (
                      
                      <div>
                     <label>
                     <Link                       
                        to={item.link}
                        className="-m-3 flex items-center rounded-md p-3 text-sm font-semibold hover:bg-gray-50"
                      >
                        <span className="ml-3 text-base font-medium text-gray-900">
                          {item.name}
                        </span>    
                         
                        <span className="ml-3 text-base font-medium text-gray-900">
                         {item.des}
                        </span>
                        </Link> 
                        </label>
                      </div>
                      
                    ))}
                  </nav>
                </div>
                {loggedIn ? (
            <button
              type="button"
              onClick={out}
              className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              LogOut
            </button>
          ) : (
            <Link to={"/SignUp"}>
              <button
                type="button"
                className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                SignUp
              </button>
            </Link>
            
          )}
          
              </div>
            </div>
          </div>
          
        )}
      </div>
    </div>
    
  )
}

export default Navbar