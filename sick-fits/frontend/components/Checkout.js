import styled from 'styled-components';
import { loadStripe } from '@stripe/stripe-js';
import {
  CardElement, Elements, useElements, useStripe,
} from '@stripe/react-stripe-js';
import { useState } from 'react';
import nProgress from 'nprogress';
import SickButton from './styles/SickButton';

const CheckoutFormStyles = styled.form`
  box-shadow: 0 1px 2px 2px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 5px;
  padding: 1rem;
  display: grid;
  grid-gap: 1rem;
`;

const ErrorStyles = styled.p`
  font-size: 2rem;
  color: var(--red);
`;

const stripeLib = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

function CheckoutForm() {
  const [error, setError] = useState();
  const [loading, setLoading] = useState();
  const stripe = useStripe();
  const elements = useElements();

  async function handleSubmit(e) {
    // 1. stop the form from submitting and turn the loader on
    e.preventDefault();
    setLoading(true);

    // 2. start the page transition
    nProgress.start();

    // 3. create the payment method via stripe (token comes back here if successful)
    const { error: err, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    console.log(paymentMethod);

    // 4. handle any errors from stripe
    if (err) {
      setError(err);
    }
    // 5. send the tokebn from step 3 to our keystone server via a custom mutation
    // 6. change the page to view the order
    // 7. close the cart
    // 8. turn the loader off
  }

  return (
    <CheckoutFormStyles onSubmit={handleSubmit}>
      {error && <ErrorStyles>{error.message}</ErrorStyles>}
      <CardElement />
      <SickButton>
        Checkout now
      </SickButton>
    </CheckoutFormStyles>
  );
}

export default function Checkout() {
  return (
    <Elements stripe={stripeLib}>
      <CheckoutForm />
    </Elements>
  );
}
