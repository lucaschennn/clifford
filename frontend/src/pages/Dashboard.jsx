
import { useAuth0 } from "@auth0/auth0-react";
import { useParams } from "react-router-dom";

function Dashboard() {

    let params = useParams();
    const { user, isAuthenticated} = useAuth0();
    const date = new Date();

    return ( isAuthenticated &&
        <div className="row w-100">
            <div className='col-8' id='dashboard-content'>
                <h4 className="text-clifford-pink"> Welcome back, {user.name}!</h4>
                <h5 className="text-muted" id="date-string">{date.toDateString()}</h5>
            </div>
        </div>
    )
}

export default Dashboard;