import React from 'react';
import './stripe-button.styles.scss';
import StripeCheckout from 'react-stripe-checkout';

const StripeButton = ({price}) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_4NG7W1nmeMFRVMUwUBjH24GI00yOA2Y8xk';
    const onToken = token => {
        console.log(token)
        alert('Payment succesfull')
    }
    return (
        <StripeCheckout
            label='Pay now'
            name='Payment operation'
            billingAdress
            shippingAdress
            description={`Your total $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
        bitcoin
        />
    )
}

export default StripeButton;