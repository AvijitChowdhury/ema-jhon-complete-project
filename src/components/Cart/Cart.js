import React from 'react';


const Cart = (props) => {
    const cart = props.cart;
   // console.log(cart);


    //we can use reduce for total
    //const total = cart.reduce((total,product)=>total+product.price,0);
    //total calculatin using for loop
    let total = 0;
    for(let i= 0 ;i< cart.length ;i++){
        const product =cart[i];
        total= total + product.price*product.quantity;
        
    }

    //shipping
    let shipping = 0;
    if(total > 35){
        shipping=0;
    }
    if(total>15){
        shipping = 4.9;
    }
    else if(total>0){
        shipping=12.99;
    }

//tax
    const tax =Math.round( total /10);

    const grandTotal = (total + shipping+ Number(tax)).toFixed(2);

    const formatNumber=(num)=>{
         const precission = num.toFixed(2);
         return Number(precission);
    }

    return (
        <div>
            <h4>Order Summary</h4>
            <h5>Items Ordered:{cart.length}</h5>
            <p>Product Price: {formatNumber(total)}</p>
            <p><small>Shipping Cost:{shipping}</small></p>
            <p><small>Tax + VAT: {tax}</small></p>
            <p className='btn-danger'>Total Price:{grandTotal}</p>
            <br />
            {
                props.children
            }
            
        </div>
    );
};

export default Cart;