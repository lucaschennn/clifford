import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useAuth0 } from "@auth0/auth0-react";

function Dashboard() {

    const { user, isAuthenticated} = useAuth0();
    const date = new Date();

    return ( isAuthenticated &&
        <div className="row w-100">
            <div id='dashboard-sidebar'>
                <Navbar>
                    <Nav defaultActiveKey="/" className="flex-column">
                        <Nav.Link href="/" className="clifford-text">Clifford</Nav.Link>
                        <div id="dashboard-profile-icon"></div>
                        <Nav.Link href="/home">Dashboard</Nav.Link>
                        <Nav.Link href="/home">Products</Nav.Link>
                        <Nav.Link eventKey="link-1">Reviews</Nav.Link>
                        <Nav.Link eventKey="link-2">Analytics</Nav.Link>
                        <Nav.Link eventKey="link-2">Settings</Nav.Link>
                    </Nav>
                </Navbar>
            </div>
            <div className='col-8' id='dashboard-content'>
                <h4 className="text-clifford-pink"> Welcome back, {user.name}!</h4>
                <h5 className="text-muted" id="date-string">{date.toDateString()}</h5>
            </div>
        </div>
    )
}

export default Dashboard;