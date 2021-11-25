
import { createContext, useState } from 'react';
//react rounter
import {
  BrowserRouter as Router, Route, Switch
} from "react-router-dom";
import './App.css';
import Header from './components/Header/Header';
import Inventory from './components/Inventory/Inventory';
import Login from './components/Login/Login';
import NotFound from './components/NotFound/NotFound';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import ProductDetail from './components/ProductDetail/ProductDetail';
import Review from './components/Review/Review';
import Shipment from './components/Shipment/Shipment';
import Shop from './components/Shop/Shop';


export const UserContext = createContext();

function App() {
  
  const [LoggedInUser , setLoggedInUser] = useState({});

  return (
    
    <UserContext.Provider value={[LoggedInUser,setLoggedInUser]}>
      { <h3>Email: {LoggedInUser?.email}</h3>
      }
      <Router>
        <Header></Header>
        <Switch>
          <Route path="/shop">
            <Shop></Shop>
          </Route>
          <Route path='/review'>
              <Review></Review>
          </Route>
          
          <PrivateRoute path="/inventory">
              <Inventory></Inventory>
          </PrivateRoute>
          
          <Route path="/login">
              <Login></Login>
          </Route>
          <PrivateRoute path="/shipment"> 
                <Shipment></Shipment>
          </PrivateRoute>

          <Route exact path="/">
            <Shop></Shop>
          </Route>
          <Route path="/product/:productKey">
            <ProductDetail></ProductDetail>

          </Route>
          <Route path="*">
            <NotFound></NotFound>
          </Route>
        </Switch>
      </Router>

     

    </UserContext.Provider>
  );
}

export default App;
