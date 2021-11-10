import React from 'react';

const ReviewItem = (props) => {
    
    const {name,quantity,key,price} =props.product;
    //console.log(props.product.name);
    const reviewItemStyle={
        borderBottom:'1px solid lightgrey',
        marginBottom:'5px',
        paddingBottom:'5px',
        marginLeft:'200px'
    }
    //remove btn
    const handleRemoveProduct = props.handleRemoveProduct;
    return (
        <div style={reviewItemStyle} className='review-item'>
            <h4 className='product-name' key={key}>{name}</h4>
            <h5>Quantity:{quantity}</h5>
            <p><small>Price: ${price}</small></p>
            <button className="main-button" onClick={()=>handleRemoveProduct(key)}>Remove</button>
        </div>
    );
};

export default ReviewItem;