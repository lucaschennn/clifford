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
      fetch('http://localhost:5000/api/get_user?' + new URLSearchParams({
          email: user.email
      }))
      .then((res) => res.json())
      .then((data) => {
          setId(data.id);
          return fetch('http://localhost:5000/api/get_cart?' + new URLSearchParams({
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


  return message ? (
    <Message message={message} />
  ) : ( isAuthenticated &&
    <>
    <div class="container">
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
                onChange={(e) => setValue(e.target.value)}
              />
              <Button variant="outline-secondary" onClick={() => console.log(hi)}>
                -
              </Button>
              <Button variant="outline-secondary" onClick={() => console.log(hi)}>
                +
              </Button>
            </InputGroup>
          </div>
          <div className="checkout-quantity">

          </div>
        </div>

      </div>
      ))}
      <form action="http://localhost:5000/api/create-checkout-session" method="POST">
        <button type="submit">
          Checkout
        </button>
      </form>
    </div>
    </>
  );
}