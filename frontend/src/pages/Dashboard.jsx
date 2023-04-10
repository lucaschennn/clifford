import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import DashboardProducts from '../components/dashboardProducts';
import DashboardNav from '../components/dashboardNav';
import DashboardHome from '../components/dashboardHome';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import { useParams } from "react-router-dom";

function Dashboard() {

    const location = useLocation();
    console.log(location.pathname);

    let params = useParams();
    const { user, isAuthenticated } = useAuth0();
    const date = new Date();

    switch(location.pathname) {
        case "/dashboard/products":
            return (isAuthenticated &&
                <DashboardProducts />)
        case "/dashboard/reviews":
            return <DashboardHome />
        case "/dashboard/analytics":
            return <DashboardHome />
        case "/dashboard/settings":
            return <DashboardHome />
    }

    return ( isAuthenticated && <DashboardHome />
    )
}

export default Dashboard;