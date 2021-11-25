import React from 'react';

const Inventory = () => {
  

    const handleAddProduct=()=>{
        const product = {};
        fetch('https://damp-cove-13433.herokuapp.com/addProduct' ,{
            method:'POST',
            headers:{
                'Content-Type':'application/json',

            },
            body:JSON.stringify(product)
        })
        .then(res=>res.json())
        .then(data =>console.log(data))
    }

    return (
        <div>
            <form action="">
                <p><span>Name: </span><input type="text"></input></p>
                <p><span>Price: </span><input type="text"></input></p>
                <p><span>Quantity: </span><input type="text"></input></p>
                <p><span>Product Image: </span><input type="file"></input></p>
                <button onClick={handleAddProduct} class="btn-success">Add Product</button>
            </form>
            
        </div>
    );
};

export default Inventory;