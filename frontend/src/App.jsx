import React from 'react'
import {Navigate, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import ShopPage from "./pages/Shop";
import CartPage from "./pages/Cart";
import BagDetails from "./pages/BagDetails"
import ProfilePage from './pages/ProfilePage';

import {useAuth} from "./context/AuthContext"

const App = () => {
  const {isAuthenticated} = useAuth();

  return (
    <Router>
      <Routes>
        < Route path="/" element={<LandingPage/>}/>
        < Route path="/login" element={<LoginPage/>}/>
        < Route path="/signup" element={<SignupPage/>}/>
        < Route path="/bags" element={<ShopPage/>}/>
        <Route path='/bags/:id' element={<BagDetails/>}/>
        <Route path="/profile" element={<ProfilePage />} />


        {/*Protected Route for Cart*/}
        <Route path="/cart" element={isAuthenticated ? <CartPage /> : <Navigate to="/" />}/>

        <Route path='*' element={<h1>404 - Page Not Found </h1>} />
      </Routes>
    </Router>
  )
}

export default App;