import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ColorRing } from 'react-loader-spinner';
import Navbar from './Navbar';
import Hero from './Hero';
import Features from './Features';
import Product from './Product';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './Footer';

const Home = ({ url }) => {
    const [products, setProducts] = useState([]);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [images, setImages] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                setDataLoaded(false);
                const response = await axios(`${url}/api/getProducts`);
                setProducts(response.data.products);
                setImages([response.data.products[0].images[0], response.data.products[8].images[0], response.data.products[12].images[0]]);
                setDataLoaded(true);
                
            } catch (error) {
                setDataLoaded(true);
                toast.error("Error in Fetching Products");
                console.error('Error fetching products:', error);
            }
        }

        fetchData();
    }, []); // Added 'url' as a dependency

    return (
        <>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick pauseOnFocusLoss draggable pauseOnHover/>
            {dataLoaded ? (
                <>
                    
                    <Hero images={images} />
                    <Features />
                    <h1 className='P' id='p' style={{ textAlign: "center" }}>Featured Products</h1>
                    <p className='mb-10' style={{ textAlign: "center" }}>New Collection New Design</p>
                    <div id='products'>
                        {products.map((product, index) => (
                            <Product key={index} indx={product.id} url={product.images} title={product.title} price={product.price} />
                        ))}
                    </div> 
                    <Footer />
                </>
            ) : (
                <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                    <ColorRing height="80" width="80" ariaLabel="color-ring-loading" wrapperStyle={{}} wrapperClass="color-ring-wrapper" colors={[]} />
                </div>
            )}
        </>
    );
};

export default Home;
