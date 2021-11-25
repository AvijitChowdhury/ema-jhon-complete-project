import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@restart/ui/esm/Button';
import { React, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import logo from '../../images/logo.png';
import './Header.css';

const Header = () => {
    const [LoggedInUser, setLoggedInUser] = useContext(UserContext);
    const name = LoggedInUser?.displayName;
    return (
        <div className='Header'>
            <img src={logo} alt="" />
            <nav>
                <Link to="/shop">Shop</Link>
                <Link to="/review">Order Review</Link>
                <Link to="/inventory">Manage Inventory</Link>
                <p style={{color:"white",fontSize:'20px',padding:'5px',marginRight:'15px',marginLeft:'30px'}}>{name}</p> 
                {LoggedInUser.email&&
                <Button style={{ height:'50px'}} onClick={()=>{setLoggedInUser({})}}><FontAwesomeIcon icon={faSignOutAlt}/>  SignOut </Button>
                 }
                
                
                 {
                     !LoggedInUser.email&&
                     <Link to="/login">Login</Link>
                 }
                
            </nav>
        </div>
    );
};

export default Header;