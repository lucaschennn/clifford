import { useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ButtonGroup from 'react-bootstrap/ButtonGroup';


function Home() {
    const { user, isAuthenticated, loginWithRedirect, isLoading, logout } = useAuth0();
    const navigate = useNavigate();
    const [showing, setShowing] = useState({custom_filters: false, products: false}) // featured or custom filters, sellers or products
    const [filters, setFilters] = useState({
        "women-owned": false,
        "minority-owned": false,
        "veteran-owned": false,
        "food": ['All'],
        "art": ['All'],
        "music": ['All']
    })
    const [thumbnails, setThumbnails] = useState([]);
    const [modal, setModal] = useState(false);
    const [businessBtn, setBusinessBtn] = useState('btn btn-primary');
    const [productBtn, setProductBtn] = useState('btn btn-outline-primary');
    console.log("updated! " + showing.products)
    useEffect(() => {
        console.log("running useeffect again")
        let url;
        if(!showing.products) {
            url = 'http://localhost:5000/api/get_featured?mode=businesses&'
        }
        else {
            url = 'http://localhost:5000/api/get_featured?mode=products&'
        }

        if(isAuthenticated) { // looking at featured
            fetch('http://localhost:5000/api/get_user?' + new URLSearchParams({
                email: user.email
            }))
            .then((res) => res.json())
            .then((data) => {
                fetch(url + new URLSearchParams(data))
                .then((res) => res.json())
                .then((data) => {
                    console.log(data)
                    setThumbnails(data)
                    console.log(thumbnails);
                })        
            })
        }
        else {
            console.log(url + 'prefs=null')
            fetch(url + 'prefs=null')
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                setThumbnails(data)
                console.log(thumbnails);
            }) 
        }
    

    }, [isLoading, showing]);

    const handleNavigate = (event) => {
        if(!isAuthenticated) {
            setModal(true);
            return;
        }

        const id = event.currentTarget.id
        navigate("/sellers/" + id)
    }
    const handleModalClose = () => {
        setModal(false);
    }
    const handleDisplayBtn = (event) => {
        const id = event.target.id;
        if(id === "business-btn") {
            setBusinessBtn('btn btn-primary');
            setProductBtn('btn btn-outline-primary');
            setShowing((prev) => {
                return {...prev, products: false}
            })
        } else {
            setProductBtn('btn btn-primary');
            setBusinessBtn('btn btn-outline-primary');
            setShowing((prev) => {
                return {...prev, products: true}
            })
        }
    }

    //categories from google maps
    const food_categories = [ 'All', 'American', 'Barbecue', 'Chinese', 'French', 'Hambuger', 'Indian', 'Italian', 'Japanese', 'Mexican', 'Pizza', 'Seafood', 'Steak', 'Sushi', 'Thai']
    const art_categories = ['All', 'Sculpture', 'Literature', 'Painting', 'Prints', 'Abstract', 'Other']
    const music_categories = ['All', 'Pop', 'Rock', 'Hip Hop', 'Jazz', 'R&B', 'Country', 'Electronic', 'Other']

    return (
        <div className="container">
            <div className="row justify-content-center" id="viewmode-toggle">
                <div className="col-2">
                    <ButtonGroup>
                        <button id="business-btn" type="button" className={businessBtn} onClick={handleDisplayBtn}>Businesses</button>
                        <button id="products-btn" type="button" className={productBtn} onClick={handleDisplayBtn}>Products</button>
                    </ButtonGroup>
                </div>
            </div>
            <div className="row">
                {!showing.custom_filters ?
                <div className="browse">
                    {showing.products?
                        thumbnails.map((product) => (
                            <div key={product.id} id={product.id} className="thumbnail" onClick={handleNavigate}>
                                <img src={"images/products/"+product.product_url} className="thumbnail-img"></img>
                                <h5 className="display-5">
                                    {product.name}
                                </h5>
                                <p className="text-muted"><em>{product.price ? '$' + product.price : "Free"}</em></p>
                                <p>{product.description}</p>
                            </div>
                        ))

                        :
                        thumbnails.map((seller) => (
                            <div key={seller.id} id={seller.id} className="thumbnail" onClick={handleNavigate}>
                                <img src={"images/thumbnails/"+seller.thumbnail} className="thumbnail-img"></img>
                                <h5 className="display-5">
                                    {seller.name}
                                </h5>
                                <p className="text-muted"><em>{seller.category}</em></p>
                                <p>{seller.description}</p>
                                {
                                    seller.keywords &&
                                    <p><em>{JSON.parse(seller.keywords).keywords.map(word => `${word}, `)}...</em></p>
                                }
                            </div>
                        ))
                    }
                    
                </div>
                :
                <p>other</p>
                }
            </div>
            <Modal show={modal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                <Modal.Title>Register/login in to view!</Modal.Title>
                </Modal.Header>
                <Modal.Body>Creating an account takes just a few seconds!</Modal.Body>
                <Modal.Footer>
                <Button variant="primary" onClick={loginWithRedirect}>
                    Create Account
                </Button>
                <Button variant="secondary" onClick={handleModalClose}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Home;