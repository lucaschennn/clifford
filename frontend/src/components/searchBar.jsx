import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup'
import { useState, useEffect } from 'react';

function SearchBar() {

    const [text, setText] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        let val = e.target.value;
        setText(val);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(text === "") {
            return;
        }

        navigate(`/search/${text}`);
    }

    const cancelSearch = () => {
        setText("")
        navigate("/")
    }

    //this fetch should happen on the search route/component
    /*
    fetch('http://localhost:5000/api/search?' + new URLSearchParams({
        query: "carrots",
        products: true
     }))
     .then(response => response.json())
     .then((data) => {
         console.log(data);
         setText(JSON.stringify(data));
     })
     */
    return (
        <Form onSubmit={handleSubmit}>
            <InputGroup id="search-bar">
                <Form.Control
                placeholder="Search"
                aria-label="Search"
                aria-describedby="search"
                value={text}
                onChange={handleChange}
                />
                <Button type="submit" id="search-btn" aria-label="Search Button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"></path>
                    </svg>
                </Button>
                {text !== "" && 
                    <btn className="btn btn-outline-secondary bg-transparent" id="cancel-search" aria-label="Cancel Search" onClick={cancelSearch}>
                        &#10006;
                    </btn>
                }
            </InputGroup>
        </Form>
    )
}

export default SearchBar;