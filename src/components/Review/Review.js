import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import happyimage from '../../images/giphy.gif';
import { getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';

const Review = () => {
  
    const [cart,setCart] =useState([]);
    const [orderPlaced,setOrderPlaced] = useState(false);
    const history = useHistory();
    
    const handleProceedOrder =()=>{
        //console.log('clicked place order');
        // setCart([]);
        // setOrderPlaced(true);
        // processOrder();
        history.push('/shipment');
    };

    const handleRemoveProduct =(productKey)=>{
        //for checking whether it is working or not
        console.log('remove btn clicked',productKey);
        const newCart = cart.filter(pd=>pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }
   
    useEffect(()=>{
        //cart
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
      
       // console.log(productKeys);
       // console.log(fakeData);

        // let cartProducts = [];
        // for(let i=0 ;i< productKeys.length ;i++){
        //     console.log(productKeys[i]);
        //     for(let j=0 ;j< fakeData.length ;j++){
        //         if(fakeData[j].key===productKeys[i]){
        //             cartProducts.push(fakeData[j]);
        //         }
        //     }
        
        // }
        // console.log(cartProducts);

        fetch('https://damp-cove-13433.herokuapp.com/productByKeys',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(productKeys)
        }).then(res=>res.json())
        .then(data=>setCart(data));

        // const cartProducts = productKeys.map((key )=>{
        //     const product = fakeData.find(pd=> pd.key===key);
        //     product.quantity = savedCart[key];
        //     console.log(product.quantity);
        //     console.log(product);
        //     return product;      
        // });
        // console.log(cartProducts);
        // setCart(cartProducts);
    },[]);


    let thankyou ;
    if(orderPlaced){
        thankyou= <img src={happyimage} alt="" />;
    }
    return (
        <div className="twin-container">
          <div className="product-container">
          <h2>Cart Items:{cart.length}</h2>
            {
                cart.map(pd=><ReviewItem key={pd.key} product={pd} handleRemoveProduct={handleRemoveProduct}></ReviewItem>)
            }
            {
                thankyou
            }
          </div>
          <div className="cart-container">
              <Cart cart={cart}>
                  <button className="main-button" onClick={handleProceedOrder}>Proceed Checkout</button>
              </Cart>
          </div>
        </div>
    );
};

export default Review;