import { useState, useEffect } from 'react';

function Home() {
    const [showing, setShowing] = useState('featured')
    const [filters, setFilters] = useState({
        "women-owned": false,
        "minority-owned": false,
        "veteran-owned": false,
        "food": ['All'],
        "art": ['All'],
        "music": ['All']
    })

    fetch('http://localhost:5000/api/get_user?' + new URLSearchParams(filters))
    .then((res) => res.json())
    .then((data) => {
        setText(data)
    })

    const categories = ['featured', '']
    //categories from google maps
    const food_categories = [ 'All', 'American', 'Barbecue', 'Chinese', 'French', 'Hambuger', 'Indian', 'Italian', 'Japanese', 'Mexican', 'Pizza', 'Seafood', 'Steak', 'Sushi', 'Thai']
    const art_categories = ['All', 'Sculpture', 'Literature', 'Painting', 'Prints', 'Abstract', 'Other']
    const music_categories = ['All', 'Pop', 'Rock', 'Hip Hop', 'Jazz', 'R&B', 'Country', 'Electronic', 'Other']

    return (
        <div className="container">
            <div className="row" id="header">
                Clifford
            </div>
            <div className="row">
                {showing === 'featured' ?
                <p>featured</p>
                :
                <p>other</p>
                }
            </div>
        </div>
    )
}

export default Home;