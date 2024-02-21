import React from 'react'

const PUBLIC_KEY = ""
const stripePromise = loadStripe(PUBLIC_KEY);


export default function StripeContainer() {
  return (
    <Elements stripe={stripePromise}>
        <PaymentForm />    
    </Elements>
  )
}
