import { useLocation, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";

// note this is hardcoded LOL
function DashboardReviews() {
    let params = useParams();
    const location = useLocation();
    const [shop, setShop] = useState();
    const { user, isAuthenticated, isLoading } = useAuth0();
    console.log(location.pathname);

    const reviews = [
    {
        user: 'claireysun',
        listing: 'Carrots',
        review: 'Very delicious! Would buy again :)'
    },
    {
        user: 'faith.tangg',
        listing: 'Custom Crochet Sweater',
        review: 'super cute & fuzzy'
    },
    {
        user: 'lucaschen',
        listing: 'Strawberry Macarons',
        review: 'So tasty!! I love strawberry anything so this was great!'
    },
    {
        user: 'cowmoomoo',
        listing: 'Custom Crochet Sweater',
        review: 'The custom colors are very nice.'
    },
    {
        user: 'james03',
        listing: 'Macarons',
        review: 'Would love to see a mango flavor someday'
    },
    ]
    useEffect(() => {
        fetch(`http://localhost:8000/api/get_user?` + new URLSearchParams({
            email: user.email
        }))
        .then((response) => response.json())
        .then((data) => {
            fetch('http://localhost:8000/api/get_seller?' + new URLSearchParams({
                user_id: data.id
            }))
            .then((res) => res.json())
            .then((data) => {
                setShop(data[0].name);
            })
        })
        .catch((error) => {
            console.log("No seller found");
        })
    }, []);

    if (!reviews) {
        return (
            <div className="row w-100">
                <div className='col-8' id='dashboard-content'>
                    <h4 className="text-clifford-pink">Customer Reviews</h4>
                    <h5 className="text-muted" id="date-string">@{shop}</h5>
                    <h5 className="text-muted" id="date-string">No reviews to display.</h5>
                </div>
            </div>
        )
    }

    else {
        return (
            <div className="row w-100">
                <div className='col-8' id='dashboard-content'>
                    <h4 className="text-clifford-pink">Customer Reviews </h4>
                    <h5 className="text-muted" id="date-string">@{shop}</h5>
                    <div id='date-string'>
                        {
                            reviews.map((review, index) => (
                                <div key={index} id='review-list'>
                                    <b>{review.user}</b> left a review on your listing, <b>{review.listing}</b>:
                                    <div id='review'>
                                        {review.review}
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        )
    }

}

export default DashboardReviews;