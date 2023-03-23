import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

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

    return (
        <div className="container">
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
                        <div className="profile-img">
                            <img src={"../images/thumbnails/"+seller[0].thumbnail} className="fit-profile-img"></img>
                        </div>
                        <h4 className="display-5 inline-header">{seller[0].name}</h4>
                    </div>
                    <div className="description-body">
                        <h3>
                            {products[0].name}
                        </h3>
                        <p>
                            {products[0].description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Products;