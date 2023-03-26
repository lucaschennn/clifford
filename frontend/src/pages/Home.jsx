import { useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Form from 'react-bootstrap/Form';
import Collapse from 'react-bootstrap/Collapse';
import Alert from 'react-bootstrap/Alert';


function Home() {

    const urlParams = new URLSearchParams(location.search);
    const checkout_res = urlParams.get('success');
    console.log("checkout_res: " + checkout_res);
    const { user, isAuthenticated, loginWithRedirect, isLoading, logout } = useAuth0();
    const navigate = useNavigate();
    const [showing, setShowing] = useState({custom_filters: false, products: false}) // featured or custom filters, sellers or products
    const [filters, setFilters] = useState({
        "women-owned": false,
        "minority-owned": false,
        "veteran-owned": false,
        "food": ['type-food-all'],
        "art": ['type-art-all'],
        "music": ['type-music-all']
    })
    const [thumbnails, setThumbnails] = useState([]);
    const [modal, setModal] = useState(false);
    const [businessBtn, setBusinessBtn] = useState('btn btn-primary');
    const [productBtn, setProductBtn] = useState('btn btn-outline-primary');
    const [filtersOn, setFiltersOn] = useState(false);
    const [FAM, setFAM] = useState({
        'type-food': true,
        'type-art': true,
        'type-music': true
    })
    const [checkoutSuccess, setCheckoutSuccess] = useState(null);
    useEffect(() => {
        console.log("USEEFFECT: " + checkout_res);
        setCheckoutSuccess(checkout_res);
    }, [checkout_res])
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
    

    }, [showing]);

    const handleNavigate = (event) => {
        if(!isAuthenticated) {
            setModal(true);
            return;
        }

        const id = event.currentTarget.id
        showing.products ? navigate("/products/" + id) : navigate("/sellers/" + id)
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
    const handleFilterUpdate = (e) => {
        const id = e.target.id;
        const checked = e.target.checked;
        console.log(checked)
        if(['type-food', 'type-art', 'type-music'].includes(id)) {
            setFAM((prev) => {
                return {...prev, [id]: !FAM[id]}
            })
            return;
        }
        if(id.includes('type-food')) {
            setFilters((prev) => {
                let cur_filters = new Set(prev.food);
                if(checked) {
                    cur_filters.add(id);
                    return {...prev, food: Array.from(cur_filters)}
                } else {
                    cur_filters.delete(id);
                    return {...prev, food: Array.from(cur_filters)}
                }
            })
        }
        else if(id.includes('type-art')) {
            setFilters((prev) => {
                let cur_filters = new Set(prev.food);
                if(checked) {
                    cur_filters.add(id);
                    return {...prev, art: Array.from(cur_filters)}
                } else {
                    cur_filters.delete(id);
                    return {...prev, art: Array.from(cur_filters)}
                }
            })
        }
        else if(id.includes('type-music')) {
            setFilters((prev) => {
                let cur_filters = new Set(prev.food);
                if(checked) {
                    cur_filters.add(id);
                    return {...prev, music: Array.from(cur_filters)}
                } else {
                    cur_filters.delete(id);
                    return {...prev, music: Array.from(cur_filters)}
                }
            })
        }
        else {
            setFilters((prev) => {
                return {...prev,
                    "women-owned": false,
                    "minority-owned": false,
                    "veteran-owned": false,
                }
            })
            setFilters((prev) => {
                return {...prev, [id]: true}
            })
        }
    }

    const handleFilterReset = (e) => {
        setFAM({
            'type-food': true,
            'type-art': true,
            'type-music': true
        })
        setFilters({
            "women-owned": true,
            "minority-owned": true,
            "veteran-owned": true,
            "food": ['type-food-all'],
            "art": ['type-art-all'],
            "music": ['type-music-all']
        })
        setFiltersOn(!filtersOn)
    }
    //categories from google maps
    const food_categories = [ 'All', 'American', 'Barbecue', 'Chinese', 'French', 'Hambuger', 'Indian', 'Italian', 'Japanese', 'Mexican', 'Pizza', 'Seafood', 'Steak', 'Sushi', 'Thai']
    const art_categories = ['All', 'Sculpture', 'Literature', 'Painting', 'Prints', 'Abstract', 'Other']
    const music_categories = ['All', 'Pop', 'Rock', 'Hip Hop', 'Jazz', 'R&B', 'Country', 'Electronic', 'Other']

    return (
        <div className="container">
            {checkoutSuccess == "true" &&
              <Alert bsStyle="warning" onClose = {() => setCheckoutSuccess(null) } dismissible>
                Thank you for your purchase!!
              </Alert>
            }
            {checkoutSuccess == "false" &&
              <Alert bsStyle="warning" onClose = {() => setCheckoutSuccess(null) } dismissible>
                Purchase cancelled.
              </Alert>
            }
            <div id="filters-drop">
                <div className="row justify-content-md-center" id="viewmode-toggle">
                    <div className="col-md-auto">
                        <ButtonGroup>
                            <button id="business-btn" type="button" className={businessBtn} onClick={handleDisplayBtn}>Businesses</button>
                            <button id="products-btn" type="button" className={productBtn} onClick={handleDisplayBtn}>Products</button>
                        </ButtonGroup>
                        <button className="btn btn-secondary dropdown-toggle text-white mx-2" onClick={() => setFiltersOn(!filtersOn)}>Filters</button>
                    </div>
                </div>
                <Collapse in={filtersOn}>
                    <Form>
                        <div className="row" id="filters">
                            <div className="col-3">
                                    <div key="default-radio">
                                        <Form.Check name="ownership-filter" type="radio" id="women-owned" label="Woman Owned" onChange={handleFilterUpdate}/>
                                        <Form.Check name="ownership-filter" type="radio" id="minority-owned" label="Minority Owned" onChange={handleFilterUpdate}/>
                                        <Form.Check name="ownership-filter" type="radio" id="veteran-owned" label="Veteran Owned" onChange={handleFilterUpdate}/>
                                    </div>
                            </div>
                            <div className="col-2">
                                    <div className="d-flex">
                                        <Form.Check type="checkbox" id="type-food" label="Food" defaultChecked={true} onChange={handleFilterUpdate}/>
                                        <Collapse in={FAM['type-food']}>
                                            <div className="mx-2">
                                                <Form.Check type="checkbox" id="type-food-all" label="All" defaultChecked={true} onChange={handleFilterUpdate}/>
                                                <Form.Check type="checkbox" id="type-food-american" label="American" onChange={handleFilterUpdate}/>
                                                <Form.Check type="checkbox" id="type-food-bbq" label="Barbecue" onChange={handleFilterUpdate}/>
                                                <Form.Check type="checkbox" id="type-food-chinese" label="Chinese" onChange={handleFilterUpdate}/>
                                                <Form.Check type="checkbox" id="type-food-french" label="French" onChange={handleFilterUpdate}/>
                                                <Form.Check type="checkbox" id="type-food-burgers" label="Burgers" onChange={handleFilterUpdate}/>
                                                <Form.Check type="checkbox" id="type-food-indian" label="Indian" onChange={handleFilterUpdate}/>
                                                <Form.Check type="checkbox" id="type-food-italian" label="Italian" onChange={handleFilterUpdate}/>
                                                <Form.Check type="checkbox" id="type-food-seafood" label="Seafood" onChange={handleFilterUpdate}/>
                                                <Form.Check type="checkbox" id="type-food-other" label="Other" onChange={handleFilterUpdate}/>
                                            </div>
                                        </Collapse>
                                    </div>
                            </div>
                            <div className="col-2">
                                    <div className="d-flex">
                                        <Form.Check type="checkbox" id="type-art" label="Art" defaultChecked={true} onChange={handleFilterUpdate}/>
                                        <Collapse in={FAM['type-art']}>
                                            <div className="mx-2">
                                                <Form.Check type="checkbox" id="type-art-all" label="All" defaultChecked={true}  onChange={handleFilterUpdate}/>
                                                <Form.Check type="checkbox" id="type-art-sculpture" label="Sculpture" onChange={handleFilterUpdate}/>
                                                <Form.Check type="checkbox" id="type-art-literature" label="Literature" onChange={handleFilterUpdate}/>
                                                <Form.Check type="checkbox" id="type-art-painting" label="Painting" onChange={handleFilterUpdate}/>
                                                <Form.Check type="checkbox" id="type-art-prints" label="Prints" onChange={handleFilterUpdate}/>
                                                <Form.Check type="checkbox" id="type-art-abstract" label="Abstract" onChange={handleFilterUpdate}/>
                                                <Form.Check type="checkbox" id="type-art-other" label="Other" onChange={handleFilterUpdate}/>
                                            </div>
                                        </Collapse>
                                    </div>
                            </div>
                            <div className="col-2">
                                    <div className="d-flex">
                                        <Form.Check type="checkbox" id="type-music" label="Music" defaultChecked={true} onChange={handleFilterUpdate}/>
                                        <Collapse in={FAM['type-music']}>
                                            <div className="mx-2">
                                                <Form.Check type="checkbox" id="type-music-all" label="All" defaultChecked={true} onChange={handleFilterUpdate}/>
                                                <Form.Check type="checkbox" id="type-music-pop" label="Pop" onChange={handleFilterUpdate}/>
                                                <Form.Check type="checkbox" id="type-music-rock" label="Rock" onChange={handleFilterUpdate}/>
                                                <Form.Check type="checkbox" id="type-music-hiphop" label="Hip-hop" onChange={handleFilterUpdate}/>
                                                <Form.Check type="checkbox" id="type-music-jazz" label="Jazz" onChange={handleFilterUpdate}/>
                                                <Form.Check type="checkbox" id="type-music-rb" label="R&B" onChange={handleFilterUpdate}/>
                                                <Form.Check type="checkbox" id="type-music-country" label="Country" onChange={handleFilterUpdate}/>
                                                <Form.Check type="checkbox" id="type-music-electronic" label="Electronic" onChange={handleFilterUpdate}/>
                                                <Form.Check type="checkbox" id="type-music-other" label="Other" onChange={handleFilterUpdate}/>
                                            </div>
                                        </Collapse>
                                    </div>
                            </div>
                            <button className="btn btn-primary"> Update Filters </button>
                            <button className="btn btn-outline-danger" type="reset" onClick={handleFilterReset}> Cancel </button>
                        </div>
                    </Form>
                </Collapse>
            </div>
            <div className="row">
                {!showing.custom_filters ?
                <div className="browse">
                    {showing.products?
                        thumbnails.map((product) => (
                            <div key={product.id} id={product.id} className="thumbnail" onClick={handleNavigate}>
                                <div className="placeholder-img">
                                    <img src={"images/products/"+product.product_url} className="thumbnail-img"></img>
                                </div>
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
                                <div className="placeholder-img">
                                    <img src={"images/thumbnails/"+seller.thumbnail} className="thumbnail-img"></img>
                                </div>

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