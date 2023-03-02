import { NavLink } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react"

const NavBar = () => {

    const { user, loginWithRedirect, isAuthenticated } = useAuth0();

    return (
      <nav className="navbar ">
        <ul className="nav">
            <li className="nav-item">
                <NavLink className="nav-link" to="/">Clifford</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="/about">About</NavLink>
            </li>
            <li className="nav-item">
                {isAuthenticated ?
                    <NavLink className="nav-link" to="/profile">Profile</NavLink>
                    :
                    <button type="button" className="btn btn-light" onClick={() => loginWithRedirect()}>Log In</button>
                }

            </li>
        </ul>
      </nav>
    );
};

export default NavBar;