import { initializeApp } from 'firebase/app';
import { createUserWithEmailAndPassword, FacebookAuthProvider, getAuth, GoogleAuthProvider, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import firebaseConfig from './firebase-config';





export const initializeLoginFramework = ()=>{
    initializeApp(firebaseConfig);
}


//Google sign in
export const handleGoogleSignIn = ()=>{
    const provider = new GoogleAuthProvider();
    // console.log('clicked');
    const auth = getAuth();
    // return signInWithPopup(auth, provider)
    //   .then((result) => {
    //     // console.log(result);
    //     const {displayName,email,photoURL} = result.user;
    //     const signedIn={
    //       isSignedIn:true,
    //       Name:displayName,
    //       Email:email,
    //       Photo:photoURL,
    //       success:true,
    //     }
    //     //setUser(signedIn);
    //     return signedIn;
    //     console.log(displayName,email,photoURL);
    //   }).catch((error) => {
    //     console.log(error);
    //     console.log(error.message);
    //   });
    return signInWithPopup(auth, provider).then(result=>{
      const {displayName,email,photoURL} = result.user;
          const signedIn={
            isSignedIn:true,
            Name:displayName,
            Email:email,
            Photo:photoURL,
            success:true,
          }
          //setUser(signedIn);
          return signedIn;
    })
      
  }

  //Sign out
  export  const signOutButton = ()=>{
    const auth = getAuth();
    return signOut(auth).then((result) => {
      // Sign-out successful
      const SignOutuser ={
        isSignedIn:false,
        Name:'',
        Email:'',
        photoURL:'',
        error:'',
        success:false,
      }
     // setUser(SignOutuser);
     return SignOutuser;
      console.log(result);

    }).catch((error) => {
      // An error happened.
      console.log(error);
    });
  }

  //fb sign in
 export const handleFbSignIn = ()=>{
    const fbprovider = new FacebookAuthProvider();
    const auth = getAuth();
    return signInWithPopup(auth, fbprovider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;
    
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;
        user.success = true;
        return user;
        // console.log('fb sign in',user);
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = FacebookAuthProvider.credentialFromError(error);
        console.log(errorMessage,credential);
    
        // ...
      });
  }



  export const CreateUserWithEmailAndPassword= (name,email,password)=>{
    const auth = getAuth();
    return createUserWithEmailAndPassword(auth,email, password)
      .then((userCredential) => {
        
        // Signed in 
        const user = userCredential.user;
        // ...
        const newUserInfo={...user};
        newUserInfo.error = '';
        newUserInfo.success =  true;
        //setUser(newUserInfo);
        updateUserProfile(name); 
        verifyEmail();
        return newUserInfo;
        
        
        // console.log(user);
      })
      .catch((error) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // // ..
        // console.log(errorCode,errorMessage);
        
        const newUserInfo = {};
        newUserInfo.error= error.message;
        newUserInfo.success = false;
        return newUserInfo;
       // setUser(newUserInfo);

      });
  }

  export const SignInWithEmailAndPassword = (email,password)=>{
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        const newUserInfo={...user};
        newUserInfo.error = '';
        newUserInfo.success =  true;
        // setUser(newUserInfo);
        // setLoggedInUser(newUserInfo);
        // history.replace(from);
        return newUserInfo;
        //console.log('signed in userInfo',user);
      })
      .catch((error) => {
        const newUserInfo = {};
        newUserInfo.error= error.message;
        newUserInfo.success = false;
        //setUser(newUserInfo);
        return newUserInfo;
      });
  }



  //update user name
  
  export const updateUserProfile= (name)=>{
    const auth = getAuth();
    updateProfile(auth.currentUser, {
      displayName:name,
    }).then(() => {
      // Profile updated!
      console.log('user profile updated succesfully');
      // ...
    }).catch((error) => {
      // An error occurred
      console.log(error);
      // ...
    });
  }

  //verify email
  const verifyEmail = ()=>{
      const auth = getAuth();
      sendEmailVerification(auth.currentUser)
        .then(() => {
          // Email verification sent!
          // ...
        });
  }


export const resetPassword = (email)=>{
  const auth = getAuth();
  sendPasswordResetEmail(auth, email)
    .then(() => {
      // Password reset email sent!
      // ..
    })
    .catch((error) => {
      console.log(error);
      // ..
    });
}
  