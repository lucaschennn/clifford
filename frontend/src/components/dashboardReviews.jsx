import { useLocation, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";

// note this is hardcoded LOL
function DashboardReviews() {
    let params = useParams();
    const location = useLocation();
    const [shop, setShop] = useState();
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
        fetch(`http://localhost:8000/api/get_seller?` + new URLSearchParams({
            id: params.id,
        }))
        .then((response) => response.json())
        .then((data) => {
            console.log(data[0]);
            setShop(data[0]);
        }
    )})

    if (!reviews) {
        return (
            <div className="row w-100">
                <div className='col-8' id='dashboard-content'>
                    <h4 className="text-clifford-pink">Customer Reviews</h4>
                    <h5 className="text-muted" id="date-string">@{shop.name}</h5>
                    <h5 className="text-muted" id="date-string">No reviews to display.</h5>
                </div>
            </div>
        )
    }

    else {
        return (shop &&
            <div className="row w-100">
                <div className='col-8' id='dashboard-content'>
                    <h4 className="text-clifford-pink">Customer Reviews </h4>
                    <h5 className="text-muted" id="date-string">@{shop.name}</h5>
                    <div id="my-listings-container">
                        {
                            products.map((product) => (
                                <MyListing image='../images/products/1.jpg' name={product.name} id={product.id} url={product.url}/>
                            ))
                        }
                    </div>
                </div>
            </div>
        )
    }

}

export default DashboardReviews;