import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';

function DashboardNav() {

    const location = useLocation();
    console.log(location.pathname);


    const isActive = (page) => {
        switch(page) {
            case "home":
                return location.pathname === "/dashboard/home"?
                true : false;
            case "products":
                return location.pathname === "/dashboard/products"?
                true : false;
            case "reviews":
                return location.pathname === "/dashboard/reviews"?
                true : false;
            case "analytics":
                return location.pathname === "/dashboard/analytics"?
                true : false;
            case "settings":
                return location.pathname === "/dashboard/settings"?
                true : false;
        }

    }

    return (
        <div id='dashboard-sidebar'>
        <Navbar>
            <Nav defaultActiveKey="/" className="flex-column">
                <Nav.Link href="/" className="clifford-text">Clifford</Nav.Link>
                <div id="dashboard-profile-icon"></div>
                <Nav.Link disabled={isActive("home")} href="/dashboard/home" className="side-nav-link">Dashboard</Nav.Link>
                <Nav.Link disabled={isActive("products")}  href="/dashboard/products" className="side-nav-link">Products</Nav.Link>
                <Nav.Link disabled={isActive("reviews")}  href="/dashboard/reviews" className="side-nav-link">Reviews</Nav.Link>
                <Nav.Link disabled={isActive("analytics")}  href="/dashboard/analytics" className="side-nav-link">Analytics</Nav.Link>
                <Nav.Link disabled={isActive("settings")}  href="/dashboard/settings" className="side-nav-link">Settings</Nav.Link>
            </Nav>
        </Navbar>
        </div>
    )

}

export default DashboardNav;