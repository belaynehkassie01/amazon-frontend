import React, { useContext, useState } from 'react'
import classes from './Payment.module.css'
import LayOut from '../../Components/LayOut/LayOut'
import { DataContext } from '../../Components/DataProvider/DataProvider'
import ProductCard from "../../Components/Product/ProductCard";
import { useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import CurrencyFormat from '../../Components/CurrencyFormat/CurrencyFormat';
import { axiosInstance } from '../../Api/axios';
import { ClipLoader } from 'react-spinners';
import { db } from '../../Utility/firebase';
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

function Payment() {

     const [{user, basket},dispatch] = useContext(DataContext)
     const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount
     }, 0)
    const total = basket.reduce((amount, item) => {
     return item.price * item.amount + amount
  }, 0)
  
  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);
  
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

const handleChange = (event) => {
  // Listen for changes in the CardElement
  // and display any errors as the customer types their card details
 event?.error?.message? setCardError(event?.error?.message):setCardError('')
};

  const handlePayment = async (e) => {
    e.preventDefault()
    try {
      setProcessing(true);
    //1.backend or function ---> contact to the client secret
      const response = await axiosInstance({
        method: "POST",
        url: `/payment/create?total=${total * 100}`,
      })
      // console.log(response.data);
      const clientSecret = response.data?.clientSecret;
    //2. client side (react side configuration)
      const {paymentIntent} = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)
        }
      });
      // FIX 1: Changed 'confirmation' to 'paymentIntent'
      console.log(paymentIntent); // Changed from console.log(confirmation);
      
    //3. after the configuration --> order firestore database
    
      await db.collection('users').doc(user?.uid).collection('orders').doc(paymentIntent.id).set({
        basket: basket,
        amount: paymentIntent.amount,
        created: paymentIntent.created,
      });

      //Empty the basket
      // FIX 2: Define Type or use string directly
      // Option A: Define Type object
      const Type = {
        EMPTY_BASKET: 'EMPTY_BASKET'
        // Add other action types if needed
      };
      
      dispatch({ type: Type.EMPTY_BASKET });
      // OR Option B: Use string directly
      // dispatch({ type: 'EMPTY_BASKET' });

      setProcessing(false);
      navigate('/orders',{state:{msg:"You have placed new order"}})
      // console.log("payment success");
    } catch (error) {
      // console.log(error);
      setProcessing(false);
    }
  }
  
  return (
    <LayOut>
      {/* header */}
      <div className={ classes.Payment_header}>Checkout ({totalItem}) items</div>
      
      {/* payment method */}
      <section className={classes.Payment}>
        {/* address */}
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{ user?.email}</div>
            <div></div>
            <div></div>
          </div>
        </div>
        <hr />
        {/* product */}
        <div className={classes.flex}>
          <h3> Review items and delivery</h3>
          <div>
            {
              basket?.map((item)=><ProductCard product={item} flex={true} key={item.id}/>)
            }
          </div>
        </div>
        <hr />
        {/* card form */}
        <div className={classes.flex}>
          <h3>Payment methods</h3>
          <div className={classes.payment_card_container}>
            <div className={classes.payment_details}>
              <form onSubmit={handlePayment}>
                {/* error */}
                {cardError && <small style={{ color: "red" }}>{cardError}</small>}
                {/* card element  */}
                <CardElement onChange={handleChange} />
                {/* price */}
                <div className={classes.payment_price}>
                  <div>
                    <span style={{display:"flex",gap:"5px"}}><p>Total Order | </p><CurrencyFormat amount={total}/> </span>
                  </div>
                  <button type='submit'>
                    {
                      processing ? (
                        <div className={classes.loading}>
                        <ClipLoader size={15} color={"aqua"} />
                        <p>please wait...</p>
                        </div>
                      ) : ("Pay Now")
                    }
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      
    </LayOut>
  )
}

export default Payment