import './App.css';
import './index.css'; // Import Tailwind CSS styles
import Home from './Components/Home';
import Login from './Components/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Cart from './Components/Cart';
import SignUp from './Components/SignUp';
import Propage from './Components/Propage.jsx';
import Error from './Components/Error.jsx'; // Renamed to avoid conflict with Error object
import { useDispatch } from "react-redux";
import { useEffect } from 'react';
import { ColorRing } from 'react-loader-spinner';
import axios from 'axios';
import Profile from './Components/Profile';
import {  login } from './redux/store';
import { updateCart } from './redux/store';
import Orders from './Components/Orders.jsx'
import About from './Components/About'
import { useState } from 'react';
import Checkout from './Components/Checkout.jsx';
import { ToastContainer, toast } from 'react-toastify';
import Navbar from './Components/Navbar.jsx';


function App() {
  //This is my backend URL which is hosted remove it paste localhost on this
  const url  = "https://caraexpress.onrender.com";
  const [orders,setOders] = useState([]);
  const dispatch = useDispatch();
  const [loading, setloading] = useState(false);

  const getdata = async()=>{
    
    const response2 = await axios.post(`${url}/api/details`, null, {
      withCredentials: true
    });
    const user = response2.data.existingUser;
    
    dispatch(login(user.email, user.name));
    setOders(user.orders);
    dispatch(updateCart(user.cart));
  }
  // const fetchCartData = async () => {
    
  //   try {
      
  //     const response = await axios.post(`${url}/api/cart`,null,  {
  //       withCredentials:true
  //     });
      
      
  //   } catch (error) {
  //     console.error('Error fetching cart data:', error);
  //   }
  // };
  
  // async function fetchOrder(){

  //   try {
      
  //     const response = await axios.get(`${url}/api/previousOrders`, {
  //       withCredentials:true
  //     });
      
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  useEffect(() => {
    
    
    const sendTokenToServer = async () => {
      setloading(false);
      try {
          const response = await axios.post(`${url}/api/verifyToken`, null, {withCredentials:true});
          
          await getdata();
          
      } catch (error) {
        console.log("Hatt")
        setloading(true);
      }
      setloading(true);
  };
  sendTokenToServer();
  
  }, []);

  return (
    <>
    {loading ? (<>
      <BrowserRouter>
    <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
   
    <section></section>
        <Navbar url={url}/>
      <Routes>
        <Route path='/' element={<Home url={url}/>} />
        <Route path='/Cart' element={<Cart url={url}/>} />
        <Route path='/SignUp' element={<SignUp url={url}/>} />
        <Route path='/Login' element={<Login url={url}/>} />
        <Route path="/Product/:productId" element={<Propage url={url}/>} />
        <Route path="/orders" element={<Orders orders={orders}/>}></Route>
        <Route path="/about" element={<About/>}/>
        <Route path='/checkout' element={<Checkout url={url}/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path="*" element={<Error/>} />
      </Routes>
    </BrowserRouter>

    </>):(<>
      <div style={{position: "fixed", top: "20%", left: "50%", transform: "translate(-50%, -50%)" }}>
      <ColorRing  height="80" width="80" ariaLabel="color-ring-loading" wrapperStyle={{}} wrapperClass="color-ring-wrapper" colors={[]} />
      </div>
    </>)}
   
    </>
  );
}

export default App;
