import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

function Products() {
    let params = useParams();
    const [products, setProducts] = useState([])
    const [seller, setSeller] = useState([]);
    
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
        <>
        </>
    )
}

export default Products;