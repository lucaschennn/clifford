import { useLocation, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";

function DashboardProducts() {
    let params = useParams();
    const location = useLocation();
    console.log(location.pathname);

    const { user, isAuthenticated, isLoading } = useAuth0();
    const [shop, setShop] = useState();
    const [products, setProducts] = useState([{
        product_url: '1.jpg',
        name: 'Loading',
        description: 'Loading'
    }])

    useEffect(() => {
        fetch(`http://localhost:8000/api/get_seller?` + new URLSearchParams({
            id: params.id,
        }))
        .then((response) => response.json())
        .then((data) => {
            console.log(data[0]);
            setShop(data[0]);
            fetch('http://localhost:8000/api/get_product?' + new URLSearchParams({
                seller_id: data[0].id,
                limit: 10
            }))
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setProducts(data);
            })
        })
        .catch((error) => {
            console.log("No seller found");
        })
    }, []);

    if (!products) {
        return (
            <div className="row w-100">
                <div className='col-8' id='dashboard-content'>
                    <h4 className="text-clifford-pink">My Listings</h4>
                    <h5 className="text-muted" id="date-string">@{shop.name}</h5>
                    <h5 className="text-muted" id="date-string">No listings to display.</h5>
                </div>
            </div>
        )
    }

    else {
        return (products && shop &&
            <div className="row w-100">
                <div className='col-8' id='dashboard-content'>
                    <h4 className="text-clifford-pink">My Listings</h4>
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

export default DashboardProducts;