import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useHistory, useLocation } from 'react-router';
import { UserContext } from '../../App';
import './Login.css';
import { CreateUserWithEmailAndPassword, handleFbSignIn, handleGoogleSignIn, initializeLoginFramework, resetPassword, SignInWithEmailAndPassword, signOutButton } from './LoginManager';





function Login() {
  const [newUser,setNewUser]= useState(false);
  const [user,setUser] = useState({
    isSignedIn:false,
    Name:'',
    Email:'',
    Password:'',
    Photo:'',
    
  });
  console.log(user);
 
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
  //  console.log(res);
    const {Name,Email,Photo} = res;
    // setUser(displayName,email,photoURL);
    // setLoggedInUser(displayName,email,photoURL);
   // console.log(Name,Email,Photo);
    setUser({Name,Email,Photo});
    setLoggedInUser({Name,Email,Photo});
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
    // signed in
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
        user?.isSignedIn ?<Button variant="info" onClick={SignOut}>Sign Out</Button>
        :<Button variant="info" onClick={googleSignIn}><FontAwesomeIcon icon={faSignInAlt}/> Sign In</Button>
      }
      <br />
      <Button onClick={FbSignIn}><FontAwesomeIcon icon={faSignInAlt}/> Sign In Using Facebook</Button>
      {
          user?.isSignedIn&&
          <div>
          <h2>Welcome {user?.Name}</h2>
          <h3>Email: {user?.Email}</h3>
          <img src={user?.Photo} alt="" />          
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
          <Button variant="primary"  type="submit" onClick={handleSubmit} style={{marginRight:'100px'}}>
            {newUser ? 'Sign Up' : 'Sign In'}
          </Button>
          
          <Button variant="danger" onClick={()=>resetPassword(user.Email)}>Forgot or Reset Password </Button>
          <p style={{color:'red'}}>{user?.error}</p>
          
          {user?.success && <p style={{color:'green'}}>User {newUser ?'created' :'Logged In'} Succesfully</p>}
          </Form>
    </div>
  );
}

export default Login;
