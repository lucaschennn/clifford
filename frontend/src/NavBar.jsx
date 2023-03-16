import { NavLink } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react"
import SearchBar from './components/searchBar';

const NavBar = () => {

    const { user, loginWithRedirect, isAuthenticated } = useAuth0();

    return (
      <nav className="navbar clifford-pink">

        <ul className="nav">
            <li className="nav-item">
                <NavLink className="nav-link text-black" to="/">Clifford</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link text-black" to="/about">About</NavLink>
            </li>

        </ul>

        <div className="nav abs">
            <SearchBar/>
        </div>
        
        <ul class="nav">
            <li className="nav-item ms-auto">
                {isAuthenticated ?
                    <NavLink className="nav-link text-black" to="/profile">Profile</NavLink>
                    :
                    <button type="button" className="btn btn-light" onClick={() => loginWithRedirect()}>Log In</button>
                }
            </li>
        </ul>
      </nav>
    );
};

export default NavBar;