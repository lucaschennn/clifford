import { useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { redirect } from 'react-router-dom';

function Home() {

    const { user, isAuthenticated, isLoading, logout } = useAuth0();

    const [showing, setShowing] = useState('featured')
    const [filters, setFilters] = useState({
        "women-owned": false,
        "minority-owned": false,
        "veteran-owned": false,
        "food": ['All'],
        "art": ['All'],
        "music": ['All']
    })
    const [thumbnails, setThumbnails] = useState([]);

    useEffect(() => {
        if(!isLoading) {
            fetch('http://localhost:5000/api/get_user?' + new URLSearchParams({
                email: user.email
            }))
            .then((res) => res.json())
            .then((data) => {
                fetch('http://localhost:5000/api/get_featured?' + new URLSearchParams(data))
                .then((res) => res.json())
                .then((data) => {
                    console.log(data)
                    setThumbnails(data)
                    console.log(thumbnails);
                })        
            })
        }
    }, [isLoading]);


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
                <div className="browse">
                    {
                        thumbnails.map((seller) => (
                            <div key={seller.id} className="thumbnail">
                                <img src={"images/thumbnails/"+seller.thumbnail} className="thumbnail-img"></img>
                                <h5 className="display-5">
                                    {seller.name}
                                    
                                </h5>
                                <p className="text-muted"><em>{seller.category}</em></p>
                                <p>blah blah blah blah blah blah blah blah blah blah blah blah blah blah</p>
                                <p><em>{JSON.parse(seller.keywords).keywords.map(word => `${word}, `)}...</em></p>
                            </div>
                        ))
                    }

                    {
                        thumbnails.map((seller) => (
                            <div key={seller.id} className="thumbnail">
                                <img src={"images/thumbnails/"+seller.thumbnail} className="thumbnail-img"></img>
                                <h5 className="display-5">
                                    {seller.name}
                                    
                                </h5>
                                <p className="text-muted"><em>{seller.category}</em></p>
                                <p>blah blah blah blah blah blah blah blah blah blah blah blah blah blah</p>
                                <p><em>{JSON.parse(seller.keywords).keywords.map(word => `${word}, `)}...</em></p>
                            </div>
                        ))
                    }
                    
                </div>
                :
                <p>other</p>
                }
            </div>
        </div>
    )
}

export default Home;