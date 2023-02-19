import React from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { user, isAuthenticated, isLoading, logout, getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  const handleRedirect = (event) => {
    // stop browser from changing the URL and requesting the new page
    navigate('/edit-profile')
  }

  console.log(user);
  console.log(user.id);

  return (
    isAuthenticated && (
      <div className="container">
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <div className="row border-bottom">
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Nickname: {user.nickname}</li>
            <li className="list-group-item">Email: {user.email}</li>
            <li className="list-group-item">Favorites: {user.email}</li>
          </ul>
        </div>
        <div className="profile-btn-group">
          <button type="button" className="btn btn-primary" onClick={handleRedirect}>
              Edit Profile
          </button>
          <button type="button" className="btn btn-secondary" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
              Log Out
          </button>
        </div>
      </div>

    )
  );
};

export default Profile;