import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function DashboardNav() {

return (
    <div id='dashboard-sidebar'>
    <Navbar>
        <Nav defaultActiveKey="/" className="flex-column">
            <Nav.Link href="/" className="clifford-text">Clifford</Nav.Link>
            <div id="dashboard-profile-icon"></div>
            <Nav.Link href="/dashboard/home">Dashboard</Nav.Link>
            <Nav.Link href="/dashboard/products">Products</Nav.Link>
            <Nav.Link eventKey="/dashboard/reviews">Reviews</Nav.Link>
            <Nav.Link eventKey="/dashboard/analytics">Analytics</Nav.Link>
            <Nav.Link eventKey="/dashboard/settings">Settings</Nav.Link>
        </Nav>
    </Navbar>
    </div>
)

}

export default DashboardNav;