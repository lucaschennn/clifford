//https://hygraph.com/blog/routing-in-react
import { Routes, Route, useLocation } from 'react-router-dom'
import { useAuth0 } from "@auth0/auth0-react";
import Home from './pages/Home'
import About from './pages/About'
import Profile from './pages/Profile'
import EditProfile from './pages/edit-profile'
import Sellers from './pages/Sellers'
import Products from './pages/Products'
import Dashboard from './pages/Dashboard'
import Checkout from './pages/Checkout'
import Callback from './Callback'
import NewBusiness from './pages/NewBusiness'
import NavBar from './NavBar'
import DashboardNav from './components/dashboardNav'
import NewListing from './pages/NewListing';


//configure routes
const App = () => {

 const { user, isAuthenticated, isLoading } = useAuth0();

 let location = useLocation();

 return (
    <>
      {location.pathname.includes('/dashboard')? <DashboardNav/> : <NavBar /> }
      <Routes history={history}>
         <Route path="/" element={<Home />} />
         <Route path="/search/:query" element={<Home />} />
         <Route path="/about" element={<About />} />
         <Route path="/profile" element={<Profile />} />
         <Route path="/edit-profile" element={<EditProfile user={user}/>} />
         <Route path="/auth0callback" element={<Callback />} />
         <Route path="/sellers/:id" element={<Sellers/>} />
         <Route path="/products/:id" element={<Products/>} />
         <Route path="/dashboard/" element={<Dashboard/>} />
         <Route path="/dashboard/:page" element={<Dashboard/>} />
         <Route path="/checkout" element={<Checkout/>} />
         <Route path="/register-business" element={<NewBusiness/>} />
         <Route path="/new-listing" element={<NewListing />} />
      </Routes>
    </>
 )
}

export default App