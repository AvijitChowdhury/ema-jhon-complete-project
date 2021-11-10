import React from 'react';
import { useForm } from "react-hook-form";
import './Shipment.css';
import { UserContext } from './../../App';
import { useContext } from 'react';

const Shipment = () => {
    const [LoggedInUser,setLoggedInUser] = useContext(UserContext);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => console.log('form submitted',data);
  
    console.log(watch("example")); // watch input value by passing the name of it
  
    return (
      /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
      <form className='ship-form' onSubmit={handleSubmit(onSubmit)}>
    
      
       
        <input {...register("name", { required: true })} defaultValue={LoggedInUser.Name}  placeholder="Your Name"/>
        {/* errors will return when field validation fails  */}
        {errors.name && <span className='error'>Name is required</span>}
        <input {...register("email", { required: true })} defaultValue={LoggedInUser.email} placeholder="Your Email"/>
        {/* errors will return when field validation fails  */}
        {errors.email && <span className='error'>Email is required</span>}
        <input {...register("address", { required: true })} placeholder="Your Address"/>
        {/* errors will return when field validation fails  */}
        {errors.address && <span className='error'>Address is required</span>}
        <input {...register("phone", { required: true })} placeholder="Your Phone Number"/>
        {/* errors will return when field validation fails  */}
        {errors.phone && <span className='error'>Phone is required</span>}
        
        <input type="submit" />
      </form>
    );
};

export default Shipment;