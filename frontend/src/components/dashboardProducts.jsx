import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import MyListing from './myListing';

function DashboardProducts() {

    const location = useLocation();
    console.log(location.pathname);


    return (
        <div className="row w-100">
            <div className='col-8' id='dashboard-content'>
                <h4 className="text-clifford-pink"> My Listings</h4>
                {/* TODO: QUERY */}
                <h5 className="text-muted" id="date-string">@shopnamehere</h5>
                <div id="my-listings-container">
                    {/* TODO: QUERY */}
                    <MyListing image='../images/products/1.jpg' name='Carrots' id='3'/>
                </div>
            </div>
        </div>
    )

}

export default DashboardProducts;