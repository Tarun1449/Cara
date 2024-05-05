    import { createStore, applyMiddleware } from 'redux'; // Import createStore and applyMiddleware
    import { thunk } from 'redux-thunk'; // Import Redux Thunk middleware
    import axios from 'axios'
    // Import your reducer
    let initialState = {
        loggedIn: false,
        email: '',
        name: '',
        cart: [], // Initialize cart as an empty array
        
    };
    
    // Action Types
    const LOGIN = 'LOGIN';
    const LOGOUT = 'LOGOUT';
    const ADD_TO_CART = 'ADD_TO_CART';
    const UPDATE_CART = 'UPDATE_CART';
    
    // Action Creators
    export const login = (email, name) => ({
        type: LOGIN,
        email,
        name
    });
    
    export const updateCart = (updatedCart) => ({
        type: UPDATE_CART,
        payload: updatedCart
    });
    
    export const logout = () => ({
        type: LOGOUT
    });
    
    export const addToCart = ({ url, product, quantity }) => async(dispatch, getState) => {
        
        try {
            console.log(url);
            // Assuming token is stored in localStorage
            const response = await axios.post(
                `${url}/api/cart/add`,
                { product, quantity },
                    {
                    withCredentials:true
                }
            );
            dispatch(updateCart(response.data.cart));
            // Handle response as needed
            } catch (error) {
            console.error('Error adding item to cart:', error);
            // Handle error
            }
    };
    // Reducer
    const reducer = (state = initialState, action) => {
        switch (action.type) {
            case LOGIN:
                return {
                    ...state,
                    loggedIn: true,
                    email: action.email,
                    name: action.name
                };
            case LOGOUT:
                return {
                    ...state,
                    loggedIn: false,
                    email: '',
                    name: ''
                };
            case ADD_TO_CART:
                return {
                    ...state,
                    cart: [...state.cart, action.product]
                };

            case UPDATE_CART:
                return {
                    ...state,
                    cart: action.payload
                };
            
            default:
                return state;
        }
    };
    // Create store with thunk middleware applied
    const store = createStore(reducer, applyMiddleware(thunk));
    
    export default store;