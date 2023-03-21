import Nav from 'react-bootstrap/Nav';

function Dashboard() {
    return (
        <div className="row">
            <div className='col-2' id='dashboard-sidebar'>

                <Nav defaultActiveKey="/home" className="flex-column">
                    <h5 className='m-2'>Dashboard</h5>
                    <div id="dashboard-profile-icon">
                        <img id="dashboard-profile-icon-img" src="/images/thumbnails/sample_1.jpg"/>
                    </div>
                    <Nav.Link href="/home">Active</Nav.Link>
                    <Nav.Link eventKey="link-1">Link</Nav.Link>
                    <Nav.Link eventKey="link-2">Link</Nav.Link>
                </Nav>
            </div>
            <div className='col-4'>
                <p>asdf</p>
                <p>asdf</p>
                <p>asdf</p>
                <p>asdf</p>
                <p>asdf</p>
                <p>asdf</p>
                <p>asdf</p>
                <p>asdf</p>
                <p>asdf</p>
            </div>

        </div>
    )
}

export default Dashboard;