import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const EditProfile = () => {

    const { user, isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
    console.log(user);

    const navigate = useNavigate();

    
    if(!isAuthenticated) {
        navigate('/')
    }

    useEffect(() => {
        if(user) {
            console.log(user.email)
            fetch('http://localhost:5000/api/get_user?' + new URLSearchParams({
                email: user.email
            }))
            .then((res) => res.json())
            .then((data) => {
                setText(data)
            })
        }

    }, []);

    const [ text, setText ] = useState({
        nickname: user.nickname,
        email: user.email
    });

    const handleChange = (event) => {
        const target = event.target;
        setText((prev) => ({
            ...prev,
            [target.id]: target.value
        }))
    }

    const handleUpdate = (event) => {

        fetch('http://localhost:5000/api/update_user?' + new URLSearchParams({...text, old_email: user.email}))
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            if(data.result == "success") {
                user.nickname = text.nickname;
                user.email = text.email;
                loginWithRedirect();
            }
        })
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
        </div>
    )
}

export default EditProfile;