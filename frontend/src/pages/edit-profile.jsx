import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { redirect } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';


const EditProfile = () => {

    const { user, isAuthenticated, isLoading, logout } = useAuth0();

    if (isLoading) {
        return <div>Loading ...</div>;
    }
    
    if(!isAuthenticated) {
        redirect('/')
    }

    useEffect(() => {
        fetch('http://localhost:8000/api/get_user?' + new URLSearchParams({
            email: user.email
        }))
        .then((res) => res.json())
        .then((data) => {
            setText(data)
        })


    }, []);

    const [ text, setText ] = useState({
        nickname: user.nickname,
        email: user.email
    });

    const [ alert, setAlert ] = useState(false)

    const handleChange = (event) => {
        const target = event.target;
        setText((prev) => ({
            ...prev,
            [target.id]: target.value
        }))
    }

    const handleUpdate = (event) => {

        if(text.email === user.email && text.nickname === user.nickname) {
            setAlert(true);
            return;
        }

        const response = confirm("Are you sure you want to update your information? You will be logged out.");

        if(!response) {
            redirect('/profile')
        }
        else {
            fetch('http://localhost:8000/api/update_user?' + new URLSearchParams({...text, old_email: user.email}))
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if(data.result == "success") {
                    user.nickname = text.nickname;
                    user.email = text.email;
                    logout();
                }
            })
        }

        /*
        axios.patch('http://localhost:5000/api/update_user', text, {'content': 'json'})
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
        })*/
    }



    //input id should correspond to text keys.
    return (
        isAuthenticated &&
        <div className="container">
            <div className="row">
                <h4> Edit Profile </h4>
                <form>
                    <label className="form-label">Nickname</label>
                    <input type="text" className="form-control" id="nickname" value={text.nickname} onChange={handleChange}></input>
                    <label className="form-label">Email Address</label>
                    <input type="text" className="form-control" id="email" value={text.email} onChange={handleChange}></input>
                </form>
            </div>
            <div className="profile-btn-group">
                <button type="button" className="btn btn-success" onClick={handleUpdate}>
                    Update
                </button>
            </div>
            {alert &&
              <Alert bsStyle="warning" onClose = {() => setAlert(false) } dismissible>
                No fields were changed!
              </Alert>
            }
        </div>
    )
}

export default EditProfile;