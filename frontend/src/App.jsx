//https://hygraph.com/blog/routing-in-react
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Profile from './pages/Profile'
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
      </Routes>
    </>
 )
}

export default App