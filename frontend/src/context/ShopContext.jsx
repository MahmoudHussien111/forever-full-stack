import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
export const ShopContext = createContext();
const ShopContextProvider = (props) => {

    const curency = '$';
    const backend = import.meta.env.VITE_BACKEND_URL;
    const delivery_fee = 10;
    const [search, setSearch] = useState('');
    const [products, setProducts] = useState([]);
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState('');
    const navigate = useNavigate();

    const fetchAllProducts = async () => {
        try {
            const response = await axios.get(backend + "/api/product/list");
            if (response.data.success) {
                setProducts(response.data.products);
                
            } else {
                console.log(response.data.message)
            }
            
        } catch (error) {
            console.log(error)
        }
    }

    const CartLength = () => {
        let totalItems = 0;

        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalItems += cartItems[items][item];
                    }
                } catch (err) {
                    console.log(err);
                }
            }
        }

        return totalItems;
    }

    const addToCart = async (itemId, size) => {

        if (!size) {
            toast.error('Select Size Please');
            return;
        }

        let cartData = structuredClone(cartItems);

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }

        setCartItems(cartData)

        if (token) {
            try {
                await axios.post(backend + '/api/cart/add', {itemId, size}, {headers: {token}})
            } catch (error) {
                console.log(error);
                toast.error(error.message)
            }
        }
    }

    const updateQuantity = async (itemId,size,quantity) => {
        const cartCopy = structuredClone(cartItems);

        cartCopy[itemId][size] = quantity;

        setCartItems(cartCopy)

        if (token) {
            try {
                await axios.post(backend + '/api/cart/update',{itemId, size, quantity}, {headers:{token}});
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }
    }

    const getUserCart = async (token) => {
        try {
            const response = await axios.post(backend + '/api/cart/get',{},{headers:{token}});
            if (response.data.success) {
                setCartItems(response.data.cartData);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    const getCartAmount = () => {
        if (products.length > 0) {
            let totalAmount = 0;
            for (const items in cartItems) {
                let ItemInfo = products.find((product => product._id === items));
                for (const item in cartItems[items]) {
                    if (cartItems[items][item] > 0) {
                        totalAmount += ItemInfo.price * cartItems[items][item];
                    }
                }
            }
            return totalAmount;
        }
    }

    useEffect(() => {
        fetchAllProducts();
    }, [])

    useEffect(() => {
        if (!token && localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'));
            getUserCart(localStorage.getItem('token'));
        }
    }, [])

    const value = {
        products, curency, delivery_fee,
        search, setSearch, showSearch, setShowSearch, cartItems, setCartItems, addToCart, CartLength,updateQuantity, getCartAmount, navigate,
        token, setToken, backend
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider