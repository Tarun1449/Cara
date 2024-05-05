import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../redux/store';
import Navbar from './Navbar';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './Footer';
import { ColorRing } from 'react-loader-spinner';
import SimpleImageSlider from 'react-simple-image-slider';
function ProPage({url}) {
    const { productId } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1); // State for quantity
    const loggedIn = useSelector(state => state.loggedIn);
    const dispatch = useDispatch();
    const [images,setImages] = useState([]);
    const [loading,setLoading] = useState(true);
    const [loader,setloader] = useState(false);
    const checkLoggedIn =() => {

        if (!loggedIn) {
            toast.info("Please Login First", {
                onClose: () => navigate('/Login') // Pass a function to onClose
            });
            return false;
        }
        return true;
    }

    useEffect(() => {
        
        async function fetchData() {
          setLoading(false);
            try {
                const response = await axios.get(`${url}/api/getProducts/${productId}`);
                setProduct(response.data);
                setImages(response.data.images)
                setLoading(true);
            } catch (error) {
                console.error('Error fetching product:', error);
                navigate('/error');
            }
        }
        fetchData();
        
    }, [productId, navigate, loggedIn]);

    const handleAddToCart = async () => {
        
        if(checkLoggedIn()){
          
          try{
            setloader(true);
            const res = await dispatch(addToCart({url ,product,quantity}));
            toast.success("Added to Cart");
            setQuantity(1);
            setloader(false);
          }catch(error){
            toast.error("Error while adding to cart");
          }
        }
        
    };

    const handleIncreaseQuantity = () => {
      
        setQuantity(prevQuantity => prevQuantity + 1);
        
    };

    const handleDecreaseQuantity = () => {
      
        if (quantity > 1) {
            setQuantity(prevQuantity => prevQuantity - 1);
        }
        
    };
  return (
    <>
    
    <div style={{  marginTop:"20%",position:"fixed",width:"100%",display:"flex",justifyContent:"center"}}>
      <ColorRing visible={loader} height="80" width="80" ariaLabel="color-ring-loading" wrapperStyle={{}} wrapperClass="color-ring-wrapper" colors={[]} />
      </div>
    <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    {loading ?(
      <>
      <div className="mx-auto max-w-7xl px-4 md:px-8 2xl:px-16">
          <div className="block grid-cols-9 items-start gap-x-10 pb-10 pt-7 lg:grid lg:pb-14 xl:gap-x-14 2xl:pb-20">
            <div className="col-span-5 grid grid-cols-2 gap-2.5">
              {images.map(indx => (
                <div key={indx} className="col-span-1 transition duration-150 ease-in hover:opacity-90">
                  <img
                    src={indx}
                    alt="Nike Air Max 95 By You--0"
                    className="w-full object-cover"
                  />
                </div>
              ))}
            </div>
            <div className="col-span-4 pt-8 lg:pt-0">
              <div className="mb-7 border-b border-gray-300 pb-7">
                <h2 className="text-heading mb-3.5 text-lg font-bold md:text-xl lg:text-2xl 2xl:text-3xl">
                  {product.title}
                </h2>
                <p className="text-body text-sm leading-6  lg:text-base lg:leading-8">
                  {product.description}
                </p>
                <div className="mt-5 flex items-center ">
                  <div className="text-heading pr-2 text-base font-bold md:pr-0 md:text-xl lg:pr-2 lg:text-2xl 2xl:pr-0 2xl:text-4xl">
                    ${product.price}
                  </div>
                  <span className="font-segoe pl-2 text-sm text-gray-400 line-through md:text-base lg:text-lg xl:text-xl">
                      {product.price+10}
                  </span>
                </div>
              </div>
              
              <div className="space-s-4 3xl:pr-48 flex items-center gap-2 border-b border-gray-300 py-8  md:pr-32 lg:pr-12 2xl:pr-32">
                <div className="group flex h-11 flex-shrink-0 items-center justify-between overflow-hidden rounded-md border border-gray-300 md:h-12">
                  <button
                    className="text-heading hover:bg-heading flex h-full w-10 flex-shrink-0 items-center justify-center border-e border-gray-300 transition duration-300 ease-in-out focus:outline-none md:w-12"
                    
                    onClick={handleIncreaseQuantity}
                  >
                    +
                  </button>
                  <span className="duration-250 text-heading flex h-full w-12  flex-shrink-0 cursor-default items-center justify-center text-base font-semibold transition-colors ease-in-out  md:w-20 xl:w-24">
                    {quantity}
                  </span>
                  <button 
                  onClick={handleDecreaseQuantity}
                  className="text-heading hover:bg-heading flex h-full w-10 flex-shrink-0 items-center justify-center border-s border-gray-300 transition duration-300 ease-in-out focus:outline-none md:w-12">
                    -
                  </button>
                </div>
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="h-11 w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                  Add to cart
                </button>
              </div>
              
              <div className="shadow-sm ">
                <header className="flex cursor-pointer items-center justify-between border-t border-gray-300 py-5 transition-colors md:py-6">
                  <h2 className="text-heading pr-2 text-sm font-semibold leading-relaxed md:text-base lg:text-lg">
                    Product Details
                  </h2>
                  <div className="relative flex h-4 w-4 flex-shrink-0 items-center justify-center">
                    <div className="bg-heading h-0.5 w-full rounded-sm" />
                    <div className="bg-heading absolute bottom-0 h-full w-0.5 origin-bottom scale-0 transform rounded-sm transition-transform duration-500 ease-in-out" />
                  </div>
                </header>
                <div>
                  <div className="pb-6 text-sm leading-7 text-gray-600 md:pb-7">
                    Our Customer Experience Team is available 7 days a week and we offer 2 ways to get
                    in contact.Email and Chat . We try to reply quickly, so you need not to wait too
                    long for a response!.
                  </div>
                </div>
              </div>
              <div className="">
                <header className="flex cursor-pointer items-center justify-between border-t border-gray-300 py-5 transition-colors md:py-6">
                  <h2 className="text-heading pr-2 text-sm font-semibold leading-relaxed md:text-base lg:text-lg">
                    Additional Information
                  </h2>
                </header>
              </div>
              <div className="">
                <header className="flex cursor-pointer items-center justify-between border-t border-gray-300 py-5 transition-colors md:py-6">
                  <h2 className="text-heading pr-2 text-sm font-semibold leading-relaxed md:text-base lg:text-lg">
                    Customer Reviews
                  </h2>
                </header>
              </div>
            </div>
          </div>
        </div>
    </>
    ):(
      <>
      <div style={{  marginTop:"3%",position:"fixed",width:"100%",display:"flex",justifyContent:"center"}}>
      <ColorRing  height="80" width="80" ariaLabel="color-ring-loading" wrapperStyle={{}} wrapperClass="color-ring-wrapper" colors={[]} />
      </div>
      
      </>
    )}
      
     
    <Footer/>
    </>
  )
}
export default ProPage;
