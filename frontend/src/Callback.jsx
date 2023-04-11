import { useAuth0 } from "@auth0/auth0-react"

function Callback() {

    const { user, isAuthenticated } = useAuth0();

    if(isAuthenticated) {
        console.log(user.email);
        console.log(user.username);
        fetch("http://localhost:8000/api/insert/user")
        .then(response => response.json())
        .then((data) => {
            console.log(data);
        })
    }

    return (<></>)
}

export default Callback;