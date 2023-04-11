import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { useParams } from "react-router-dom";
import UpdateBox from './updateBox';

function DashboardHome() {

    const location = useLocation();
    console.log(location.pathname);


    let params = useParams();
    const { user, isAuthenticated } = useAuth0();
    const date = new Date();

    // TODO: QUERY
    const activities = 
        ['claireysun favorited your listing: ___', 
        'James03 purchased 2 items from your listing: ____',
        'beepboop left a review on your listing: ___',
        'another line here'];

    return (  isAuthenticated && 
        <div className="row w-100">
            <div className='col-8' id='dashboard-content'>
                <h4 className="text-clifford-pink"> Welcome back, {user.nickname}!</h4>
                <h5 className="text-muted" id="date-string">{date.toDateString()}</h5>
                <div id="update-boxes-container">
                    {/* TODO: QUERY */}
                    <UpdateBox title='What&#39;s New' items={['bobby', 'hadz', 'com']}/> 
                    <UpdateBox title='Recent Sales' items={['bobbyzzz', 'hadz', 'com']}/> 
                </div>
                <div id='recent-activity-text'>
                        <b>Older Updates:</b>
                        {activities && activities.map((item, index) =>
                                <ul key={index}>
                                    {item}
                                </ul>
                        )}
                </div>
            </div>   
        </div>
    )

}

export default DashboardHome;