import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

function Sellers() {
    let params = useParams();
    const [data, setData] = useState({})
    const [products, setProducts] = useState([])
    
    useEffect(() => {
        fetch(`http://localhost:5000/api/get_seller?` + new URLSearchParams({
            id: params.id,
        }))
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            setData(data[0])
            fetch('http://localhost:5000/api/get_product?' + new URLSearchParams({
                seller_id: data[0].id,
                limit: 10
            }))
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setProducts(data);
            })
        })
    }, [])

    return (
        <div className="container seller-profile">
            <div className="row">
                <h4 className="display-4">{data.name}</h4>
                <img src={"../images/thumbnails/"+data.thumbnail} className="seller-profile-img"></img>
                <p>{data.description}</p>
            </div>
            <div className="row">
                <h4> Featured Products </h4>
                <div id="products" className="browse">
                    {
                        products.map((product) => (
                            <div key={product.id} id={product.id} className="thumbnail">
                                <img src={"../images/products/"+product.product_url} className="thumbnail-img"></img>
                                <h5 className="display-5">
                                    {product.name}
                                </h5>
                                <p>{product.description}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Sellers;