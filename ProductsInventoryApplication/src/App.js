import './index.css'
import './App.css';
import Home from './Pages/Home';
import './Pages/Home.css';
import './Pages/SignIn.css';
import './Pages/Register.css';
import './Pages/Products.css';
import './Pages/UserInfo.css';
import Register from './Pages/Register'
import Signin from './Pages/SignIn';
import AddProduct from './Pages/AddProduct';
import UserInfo from './Pages/UserInfo';
import Product from './Pages/Product';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import React from 'react';
import UpdateProduct from './Pages/UpdateProduct';
import NavBar from './Pages/NavBar';
import SignedInNavBar from './Pages/SignedInNavBar';
import './Pages/NavBar.css';
import { useSelector } from 'react-redux';
const Products = React.lazy(() => import('./Pages/Products'))
function App() {
  let signedin = useSelector((state) => { return state.signedin })
  return (
    <Router>
      {signedin ? < SignedInNavBar /> : <NavBar />}
      <Switch>
        <Route exact path='/' component={Home} />

        <Route path='/signin' component={Signin} />
        <Route path='/register' component={Register} />
        <Route path='/addproduct' component={AddProduct} />
        <Route path='/userinfo' component={UserInfo} />
        <Route path='/products/update/:id' component={UpdateProduct} />
        <Route path='/products/:id' component={Product} />
        <Route path="/products" render={() => (
          <React.Suspense fallback={<h1>Products Inventory is Loading....</h1>}>
            <Products /></React.Suspense>
        )} />

      </Switch>

    </Router>



  );
}

export default App;
