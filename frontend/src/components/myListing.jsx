import { useLocation } from 'react-router-dom';
import { useNavigate, useParams } from "react-router-dom";
import { useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";

function MyListing(props) {

    const navigate = useNavigate();

    const handleEditItem = (id) => {
        navigate('/edit-listing/' + id)
    }

    const handleViewProduct = (id) => {
        navigate('/products/' + id)
    }

    return (
        <div id='my-listing'>
            <img src={props.image} className="fit-main-img"/>
            {/* <div id='listing-title' onClick={(event) => handleViewProduct(props.id)}> */}
            <div id='listing-title'>
                {props.name}
            </div>
            {/* <div id='edit-listing' onClick={(event) => handleEditItem(props.id)}> */}
            <div id='edit-listing'>
                Edit This Item
            </div>
        </div>
    )

}

export default MyListing;