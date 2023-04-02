import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Alert from 'react-bootstrap/Alert';


function Products() {
    let params = useParams();
    const [products, setProducts] = useState([{
        product_url: '1.jpg',
        name: 'Loading',
        description: 'Loading'
    }])
    const [seller, setSeller] = useState([{
        thumbnail: 'sample_1.jpg',
        name: 'Loading'
    }]);
    const [btnText, setBtnText] = useState("Add to Cart");
    const [id, setId] = useState(-1);
    const { user, isAuthenticated, isLoading } = useAuth0();
    const [ alert, setAlert ] = useState(false)
    
    useEffect(() => {

        fetch('http://localhost:5000/api/get_product?' + new URLSearchParams({
            product_id: params.id,
        }))
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            setProducts(data);
            console.log(products[0])
            return data;
        })
        .then((data) => {
            console.log(products[0])
            fetch('http://localhost:5000/api/get_seller?' + new URLSearchParams({
                id: data[0].business_id,
            }))
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setSeller(data);
            })
        })
    }, [])
    useEffect(() => {
        if(!isLoading) {
            fetch('http://localhost:5000/api/get_user?' + new URLSearchParams({
                email: user.email
            }))
            .then((res) => res.json())
            .then((data) => {
                setId(data.id);
            })
        }

    }, [isLoading]);

    const onBtnHover = () => {
        setBtnText(`$${products[0].price}`);
    }

    const onBtnLeave = () => {
        setBtnText("Add to cart");
    }

    const handleCartBtn = async (e) => {
        fetch('http://localhost:5000/api/update_cart', {
            method: 'POST',
            body: JSON.stringify({userid: id, productid: products[0].id}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            if(data.status === 'success') {
                setAlert(true);
            }
        });
    }

    return (
        isAuthenticated &&
        <div className="container">
            {alert &&
              <Alert onClose = {() => setAlert(false) } dismissible>
                Item successfully added to cart!
              </Alert>
            }
            <div className="row">
                <div className="col-2">
                    <div className="alt-img">
                    </div>
                    <div className="alt-img">
                    </div>
                    <div className="alt-img">
                    </div>
                </div>
                <div className="col-5">
                    <div className="main-img">
                        <img src={"../images/products/"+products[0].product_url} className="fit-main-img"></img>
                    </div>
                </div>
                <div className='col-4' id="product-description">
                    <div className="description-seller">
                        <img src={"../images/thumbnails/"+seller[0].thumbnail} className="fit-profile-img"></img>
                        <h4 className="display-5 inline-header">{seller[0].name}</h4>
                    </div>
                    <div className="description-body">
                        <h3>
                            {products[0].name}
                        </h3>
                        <h5 className="display-5 price-text">
                            {products[0].price == 0? "Free" : `$${products[0].price}`}
                        </h5>
                        <p>
                            {products[0].description}
                        </p>
                    </div>
                    <div className="description-purchase">
                        <button className="btn btn-primary fadein" id="purchase-btn" onClick={handleCartBtn} onMouseEnter={onBtnHover} onMouseLeave={onBtnLeave}>{btnText}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Products;