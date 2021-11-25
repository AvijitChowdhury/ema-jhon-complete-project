import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';


const ProductDetail = () => {
    const {productKey} = useParams();
    const [product,setProduct] = useState({});

    useEffect(()=>{
        fetch('https://damp-cove-13433.herokuapp.com/product/'+productKey)
        .then(res=>res.json())
        .then(data=>setProduct(data))
    },[productKey]);

   // const product  = fakeData.find(pd=> pd.key===productKey);
  //  console.log(product);
    return (
        <div>
            <h2>Id: {productKey} |  Your Product Detail :</h2>
            
            <Product showAddToCart={false} product={product}></Product>
        </div>
    );
};

export default ProductDetail;