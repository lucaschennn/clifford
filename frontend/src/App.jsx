//https://hygraph.com/blog/routing-in-react
import { Routes, Route, useLocation } from 'react-router-dom'
import { useAuth0 } from "@auth0/auth0-react";
import Home from './pages/Home'
import About from './pages/About'
import Profile from './pages/Profile'
import EditProfile from './pages/edit-profile'
import Sellers from './pages/Sellers'
import Dashboard from './pages/Dashboard'
import Callback from './Callback'
import NavBar from './NavBar'


//configure routes
const App = () => {

 const { user, isAuthenticated, isLoading } = useAuth0();

 let location = useLocation();

 return (
    <>
      {location.pathname != '/dashboard' && <NavBar /> }
      <Routes history={history}>
         <Route path="/" element={<Home />} />
         <Route path="/about" element={<About />} />
         <Route path="/profile" element={<Profile />} />
         <Route path="/edit-profile" element={<EditProfile user={user}/>} />
         <Route path="/auth0callback" element={<Callback />} />
         <Route path="/sellers/:id" element={<Sellers/>} />
         <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>
    </>
 )
}

export default App