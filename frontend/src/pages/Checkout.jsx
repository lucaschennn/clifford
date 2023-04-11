//refactor this copy pasted code to fit format
//localhost:5000 is hardcoded
import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { InputGroup, FormControl, Button } from 'react-bootstrap';

const Message = ({ message }) => (
  <section>
    <p>{message}</p>
  </section>
);

export default function Checkout() {

  const [message, setMessage] = useState("");
  const [quants, setQuants] = useState({});
  const [id, setId] = useState(-1);
  const [cart, setCart] = useState([]);
  const { user, isAuthenticated, isLoading } = useAuth0();

  console.log(cart);

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setMessage("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []);

  useEffect(() => {
    if(!isLoading) {
      fetch('http://localhost:8000/api/get_user?' + new URLSearchParams({
          email: user.email
      }))
      .then((res) => res.json())
      .then((data) => {
          setId(data.id);
          return fetch('http://localhost:8000/api/get_cart?' + new URLSearchParams({
            id: data.id
          }))
      })
      .then((res) => res.json())
      .then((data) => {
        setCart(data);
        console.log(data)
      })
    }
  }, [isLoading])

  const incrementItem = (e) => {
    const idx = e.target.value;
    setCart((prev) => {
      let newItems = prev;
      newItems[idx][1] = (Number(newItems[idx][1]) + 1).toString();
      return newItems
    });
  }
  const decrementItem = (e) => {
    const idx = e.target.value;
    setCart((prev) => {
      let newItems = prev;
      newItems[idx][1] = (Number(newItems[idx][1]) - 1).toString();
      if(Number(newItems[idx][1]) < 0) {
        newItems[idx][1] = '1';
      }
      return newItems
    });
  }

  return message ? (
    <Message message={message} />
  ) : ( isAuthenticated &&
    <>
    <div className="container">
      {cart.map((product, index) => (
      <div className="row cart-entry" key={product[0].id}>
        <div className="col-2">
          <div className="checkout-image">
            <img src={"../images/products/"+product[0].product_url} className="checkout-image"></img>
          </div>
        </div>
        <div className="col-4">
          <div className="checkout-header">
            <h2 className="font-weight-bold">{product[0].name}</h2>
            <img src={"../images/thumbnails/"+product[0].business_id.thumbnail} className="fit-profile-img-checkout"></img>
            <h4 className="inline-header-checkout">{product[0].business_id.name}</h4>
            <p>{product[0].description}</p>
          </div>
        </div>
        <div className="col-2">
          <h5 className="font-weight-bold">{product[0].price > 0 ? '$' +product[0].price : "Free"}</h5>


          <div className="checkout-price">
            <InputGroup className="mb-3">
              <FormControl
                type="text"
                value={product[1]}
                onChange={(e) => setCart(e.target.value)}
              />
              <Button variant="outline-secondary" onClick={decrementItem} value={index}>
                -
              </Button>
              <Button variant="outline-secondary" onClick={incrementItem} value={index}>
                +
              </Button>
            </InputGroup>
          </div>
          <div className="checkout-quantity">

          </div>
        </div>

      </div>
      ))}
      <form action="http://localhost:8000/api/create-checkout-session" method="POST">
        <button type="submit" id="generic-button">
          Checkout
        </button>
      </form>
    </div>
    </>
  );
}