import {React,useContext} from 'react';
import logo from '../../images/logo.png';
import './Header.css';
import { Link } from 'react-router-dom';
import Button from '@restart/ui/esm/Button';
import { UserContext } from '../../App';

const Header = () => {
    const [LoggedInUser, setLoggedInUser] = useContext(UserContext);
    return (
        <div className='Header'>
            <img src={logo} alt="" />
            <nav>
                <Link to="/shop">Shop</Link>
                <Link to="/review">Order Review</Link>
                <Link to="/inventory">Manage Inventory</Link>
                <Button onClick={()=>{setLoggedInUser({})}}>Sign Out</Button>
            </nav>
        </div>
    );
};

export default Header;