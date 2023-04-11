import { useState, useEffect } from 'react';

function About() {
    let [text, setText] = useState("Loading...");

    useEffect(() => {
        
        fetch('http://localhost:8000/api/search?' + new URLSearchParams({
           query: "carrots",
           products: true
        }))
        .then(response => response.json())
        .then((data) => {
            console.log(data);
            setText(JSON.stringify(data));
        })
        
    }, [])

    return (
        <div className="About">
            <p>
                {text}
            </p>
        </div>
    )
}

export default About;