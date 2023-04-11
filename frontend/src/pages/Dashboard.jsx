import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import DashboardProducts from '../components/dashboardProducts';
import DashboardNav from '../components/dashboardNav';
import DashboardHome from '../components/dashboardHome';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import DashboardReviews from '../components/dashboardReviews';

function Dashboard() {

    const location = useLocation();
    console.log(location.pathname);

    let params = useParams();
    const { user, isAuthenticated } = useAuth0();
    const date = new Date();
    const [shop, setShop] = useState();
    const navigate = useNavigate();

    const handleRegisterBusiness = () => {
        navigate('/register-business/')
    }

    useEffect(() => {
        fetch(`http://localhost:8000/api/get_seller?` + new URLSearchParams({
            id: params.id,
        }))
        .then((response) => response.json())
        .then((data) => {
            console.log(data[0]);
            setShop(data[0]);
        })
    });

    // if (shop) {
    if (True) {
        switch(location.pathname) {
            case "/dashboard/products":
                return (isAuthenticated &&
                    <DashboardProducts />)
            case "/dashboard/reviews":
                return <DashboardReviews />
            case "/dashboard/analytics":
                return <DashboardHome />
            case "/dashboard/settings":
                return <DashboardHome />
        }
    
        return ( isAuthenticated && <DashboardHome /> )
    }
    else {
        return (
            <div className="row w-100">
                <div className='col-8' id='dashboard-content'>
                    <h4 className="text-clifford-pink">Looks like you don't have a business yet!</h4>
                    <button id='generic-button' onClick={(event) => handleRegisterBusiness()}>Register New Business</button>
                </div>
            </div>
        )
    }
}

export default Dashboard;