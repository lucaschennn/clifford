//https://hygraph.com/blog/routing-in-react
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Profile from './pages/Profile'
import Callback from './Callback'
import NavBar from './NavBar'

//configure routes
const App = () => {
 return (
    <>
      <NavBar />
      <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/about" element={<About />} />
         <Route path="/profile" element={<Profile />} />
         <Route path="/auth0callback" element={<Callback />} />
      </Routes>
    </>
 )
}

export default App