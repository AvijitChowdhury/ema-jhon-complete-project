import React, { useContext } from 'react';
import './Login.css';
import { initializeApp } from 'firebase/app';
import firebaseConfig from './firebase-config';
import { GoogleAuthProvider } from "firebase/auth";
import { getAuth, signInWithPopup} from "firebase/auth";
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import {Form} from 'react-bootstrap';
import {  signInWithEmailAndPassword } from "firebase/auth";

import { UserContext } from '../../App';
import { useHistory, useLocation, Redirect } from 'react-router';
import { handleFbSignIn, handleGoogleSignIn, initializeLoginFramework, signOutButton ,CreateUserWithEmailAndPassword, SignInWithEmailAndPassword } from './LoginManager';


function Login() {
  const [newUser,setNewUser]= useState(false);
  const [user,setUser] = useState({
    isSignedIn:false,
    Name:'',
    Email:'',
    Password:'',
    Photo:'',
    
  });
  //firebase authentication
  //initializeApp(firebaseConfig);
  initializeLoginFramework();

//useContext
  const [LoggedInUser,setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };



//google sign in
const googleSignIn = ()=>{
  handleGoogleSignIn()
  .then(res=>{
    handleResponse(res,true);
  })
}
const SignOut = ()=>{
  signOutButton()
  .then(res=>{
    handleResponse(res,false);
  })
}
const FbSignIn = ()=>{
  handleFbSignIn()
  .then(res=>{
    handleResponse(res,true);
   })
}

const handleResponse = (res , redirect)=>{
  setUser(res);
  setLoggedInUser(res);
  if(redirect){
    history.replace(from);
  }
}

  //form controls
  const handleBlur=(event)=>{
  
  
    console.log(event.target.name,event.target.value);
    let isFieldValid = true;
    if(event.target.name==="email"){
      //const isEmailValid = /\S+@\S+\.\S+/.test(event.target.value);
      // console.log(isEmailValid);
      isFieldValid=/\S+@\S+\.\S+/.test(event.target.value);
      
     
    }
    if(event.target.name==="password"){
      const isPassValid = event.target.value.length>6;
      const passHasNum = /\d{1}/.test(event.target.value);
      // console.log(isPassValid && passHasNum);
      isFieldValid=isPassValid && passHasNum;
    }
    if(isFieldValid){
      const newUserInfo = {...user};
      newUserInfo[event.target.name] = event.target.value;
      setUser(newUserInfo);
    }
  }


//submit button
  const handleSubmit= (event)=>{
    console.log(user.Email,user.Password);
    if(newUser && user.Email && user.Password){
        CreateUserWithEmailAndPassword(user.Name,user.Email,user.Password)
        .then(res=>{
          handleResponse(res,true);
        })
    }
    //signed in
    if(!newUser && user.Email && user.Password){
        SignInWithEmailAndPassword(user.Email,user.Password)
        .then(res=>{
          handleResponse(res,true);
        })
    }
    event.preventDefault();
  }

  return (
    <div className='Login'>
      <br />
      {
        user.isSignedIn ?<Button variant="info" onClick={SignOut}>Sign Out</Button>
        :<Button variant="info" onClick={googleSignIn}>Sign In</Button>
      }
      <br />
      <Button onClick={FbSignIn}>Sign In Using Facebook</Button>
      {
          user.isSignedIn&&
          <div>
          <h2>Welcome {user.Name}</h2>
          <h3>Email: {user.Email}</h3>
          <img src={user.Photo} alt="" />          
          </div>
      }
      <h2>Our Own Authentication</h2>
      {/* <p>Name: {user.Name}</p>
      <p>Email: {user.Email}</p>
      <p>Password: {user.Password}</p> */}
        <Form >
        <Form.Group className="mb-3" controlId="formBasicCheckbox" onChange={()=>{setNewUser(!newUser)}}>
            <Form.Check type="checkbox" label="New User Sign Up" /></Form.Group>
        {newUser && <Form.Group className="mb-3 box " controlId="formBasicEmail">
            <Form.Label>Name </Form.Label>
              <Form.Control type="Name" placeholder="Enter Your Name" name="Name" onBlur={handleBlur} />
          </Form.Group> }
          <Form.Group className="mb-3 box " controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" name="Email" onBlur={handleBlur} />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="md-3 box" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" name="Password"  onBlur={handleBlur}/>
            </Form.Group><br/>
          {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group> */}
          <Button variant="primary"  type="submit" onClick={handleSubmit}>
            {newUser ? 'Sign Up' : 'Sign In'}
          </Button>
          <p style={{color:'red'}}>{user.error}</p>
          
          {user.success && <p style={{color:'green'}}>User {newUser ?'created' :'Logged In'} Succesfully</p>}
          </Form>
    </div>
  );
}

export default Login;
