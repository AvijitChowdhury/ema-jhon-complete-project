import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart} from '@fortawesome/free-solid-svg-icons'
import './Product.css';
import { Link } from 'react-router-dom';

const Product = (props) => {
    //console.log(props);
    const {img,name,seller,price,stock,key} =props.product;
    return (
        <div className='product'>
            <div className="pdImage" > 
                <img src={img} alt="" />
            </div>
            <div>
                <h3 className="product-name"><Link to={"/product/"+key} style={{textDecoration:'none'}}>{name}</Link></h3>
                <br/>
                <p><small>By: {seller}</small></p>
            
                <p>${price}</p>
                
                <p><small>Only {stock} left --Order soon</small></p> 
                {/* conditional rendering    */}
                {props.showAddToCart && <button onClick={()=> props.handleAddProduct(props.product)} className="main-button"><FontAwesomeIcon icon={faShoppingCart} />add to cart</button> }         
        
            </div>
        </div>
    );
};

export default Product;