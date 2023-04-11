import { useNavigate, useParams } from "react-router-dom";
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import { useState } from 'react';

function NewBusiness() {

    const [shopname, setShopname] = useState();
    const [profilephoto, setPFP] = useState();
    const [description, setDescription] = useState();
    const [tags, setTags] = useState();
    let params = useParams();
    const navigate = useNavigate();

    const handleSubmit = () => {
        if(!shopname || !profilephoto || !description || !tags) {
            console.log("error: Please fill in all fields");
        } else {
            // 
        }
    }

    return (
        <div className="container" id='form-register'>
            <div className="input-group">

                <div className="input-group mb-3">
                    <div className="input-group-prepend"><span className="input-group-text" id="basic-addon1">@</span></div>
                    <input type="text" className="form-control" placeholder="Shop Name" aria-label="Shop Name" aria-describedby="basic-addon1" />
                </div>

                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="inputGroup-sizing-default">Description</span>
                    </div>
                    <input type="text" className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" />
                </div>

                <div className="input-group">
                    <div className="input-group-prepend"><span className="input-group-text" id="basic-addon1">Add Tags</span></div>
                    <select multiple data-role="tagsinput" />
                </div>
                
                <form action="http://localhost:8000/api/register-new-business" method="POST">
                    <button type="submit" id="generic-button" onClick={() => handleSubmit()}>
                    Register Business
                    </button>
                </form>
            </div>
        </div>
    );
}

export default NewBusiness;