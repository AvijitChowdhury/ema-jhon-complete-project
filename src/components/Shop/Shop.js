import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import Product from '../Product/Product';
import Cart from './../Cart/Cart';
import './Shop.css';


const Shop = () => {
    //const first10 = fakeData.slice(0,10);
   // const [products,setProducts] = useState(first10);
   const [products,setProducts] = useState([]);
    //car count
    const [cart , setCart] = useState([]);

    useEffect(()=>{
        fetch('https://damp-cove-13433.herokuapp.com/products')
        .then(res=>res.json())
        .then(data=>setProducts(data))
    },[]);

    useEffect(()=>{
        const savedCart = getDatabaseCart();
        //console.log(savedCart);
        const productKeys = Object.keys(savedCart);
       if(products.length>0){
        const previousCart = productKeys.map(existingKey=>{
           // const product= fakeData.find(pd =>pd.key === existingKey);
           const product = products.find(pd=>pd.key===existingKey);
            product.quantity = savedCart[existingKey];
            return product;
            
        });
        console.log(previousCart);
        setCart(previousCart);
       }
   
    },[products]);

    const handleAddProduct = (product)=>{
        //console.log('Product- added',product);
        const toBeAddedKey=product.key; 
        const sameProduct = cart.find(pd=>pd.key === toBeAddedKey);
        let count = 1;
        let newCart;
        if(sameProduct){
             count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd=>pd.key!== toBeAddedKey);
            newCart = [...others,sameProduct];
        }else{
            product.quantity = 1;
            newCart = [...cart,product];
        }
       // const newCart = [...cart , product];
        setCart(newCart);

        //product count
        // const sameProduct = newCart.filter(pd => pd.key === product.key);
        // const count = sameProduct.length;
        addToDatabaseCart(product.key,count);
    }

    return (
        <div className='twin-container'>
            <div className="product-container">
                {
                    products.map(pd=><Product 
                        key={pd.key}
                        showAddToCart={true}
                        handleAddProduct={handleAddProduct}
                        product={pd}></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                <Link to="/review"><button className="main-button">Review Order</button></Link>
                </Cart>
            </div>
          
         
        </div>
    );
};

export default Shop;