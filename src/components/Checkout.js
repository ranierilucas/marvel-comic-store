import React, { useEffect, useState } from 'react';

function Checkout(props) {
    const [message, setMessage] = useState('')
    const [finalPrice, setFinalPrice] = useState(0)

    useEffect(() => {
        console.log(props.shoppingCart)
        setFinalPrice(PriceCalc())
    }, [props.shoppingCart])

    function PriceCalc() {
        let price = 0
        for (let pair of props.shoppingCart) {
            price += pair[1] * pair[0].prices[0].price
        }
        return price
    }
    function onClick() {
        setMessage('Thank you for your purchase')
        props.setShoppingCart([])
    }
    function showItems(pair) {
        let display = ''
        display += pair[0].title + " (" + pair[0].prices[0].price + 'US$): ';
        display += pair[1]
        return display
    }



    return (
        <div className="checkout-page">
            <div className="container">
                <div className="checkout-content">
                    <div checkout-items>
                        {props.shoppingCart.map(pair => {
                            return (
                                <h4>{showItems(pair)}</h4>
                            )
                        })}
                        <h1>{finalPrice.toFixed(2)}</h1>
                    </div>

                    <div className="checkout-cleam">
                        <button onClick={onClick} className="btn">Pagar</button>
                    </div>

                    <h1>{message}</h1>

                </div>
            </div>
        </div>

    );
}

export default Checkout;
