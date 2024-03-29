import { NavLink, useLocation } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react"
import { useState } from 'react';
import SearchBar from './components/searchBar';
import Dropdown from 'react-bootstrap/Dropdown';


const NavBar = () => {

    const { user, loginWithRedirect, logout, isAuthenticated } = useAuth0();
    const location = useLocation();


    return (
      <nav className="navbar clifford-pink" id="main-nav">

        <ul className="nav">
            <li className="nav-item">
                { location.pathname == '/' || location.pathname == '/home' ?
                <NavLink className="nav-link text-white" style={{color:'#eeeeee', fontWeight: 500}} to="/">Clifford</NavLink>
                :
                <NavLink className="nav-link text-white" to="/">Clifford</NavLink>
                }
            </li>
            <li className="nav-item">
                <NavLink className="nav-link text-white" to="/about">About</NavLink>
            </li>

        </ul>

        <div className="nav abs col-2">
            <SearchBar/>
        </div>
        
        <ul className="nav">
            <li className='nav-item ms_auto'>
                <NavLink className="nav-link text-white" to="/checkout">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16"> <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/> </svg>
                </NavLink>
            </li>
            <li className="nav-item ms-auto">
                {isAuthenticated ?
                    <Dropdown>
                        <Dropdown.Toggle className="btn btn-secondary mx-2" id="profile-dropdown">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
                            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"></path>
                            </svg>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item href="/profile">
                                Profile
                            </Dropdown.Item>
                            <Dropdown.Item href="/dashboard/home">
                                Business Dashboard
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
                                Sign out
                            </Dropdown.Item>
                        </Dropdown.Menu>

                    </Dropdown>
                    :
                    <button type="button" className="btn btn-light mx-2" onClick={() => loginWithRedirect()}>Log In</button>
                }
            </li>
        </ul>
      </nav>
    );
};
/*
    <Dropdown.Item href="#/action-1">
        <NavLink className="nav-link text-black" to="/profile">Profile</NavLink>
    </Dropdown.Item>
    */

export default NavBar;