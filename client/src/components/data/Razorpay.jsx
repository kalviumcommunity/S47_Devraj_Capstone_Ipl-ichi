import React from 'react'
import axios from 'axios'
import './Razorpay.css'

const Razorpay = () => {
    const amount = 5000;
    const currency = "INR";
    const receiptId = "12345";

    const paymentHandler = async (e) => {
        e.preventDefault();

        // Retrieve the email from localStorage
        const loggedInUserEmail = localStorage.getItem('loggedInUser');

        const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/payment`, { amount, currency, receipt: receiptId });
        console.log(res);
        const options = {
            "key": "rzp_test_3UDpk6BigSxW8y",
            amount,
            currency,
            "name": "IPL-ichi",
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": res.data.id,
            "handler": async function (response) {
                const body = {
                    ...response,
                    email: loggedInUserEmail // Send the email from localStorage
                };

                const validated = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/payment/validate`, body);
                console.log(validated.data);
                if (validated.status === 200) {
                    alert('Payment Successful and Email Sent!');
                } else {
                    alert('Payment Validation Failed');
                }
            },
            "prefill": {
                "name": "Devraj Patil",
                "email": loggedInUserEmail, // Prefill the email from localStorage
                "contact": "9753768366"
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        };

        var rzp1 = new window.Razorpay(options);
        rzp1.on('payment.failed', function (response) {
            alert(response.error.code);
            alert(response.error.description);
            alert(response.error.source);
            alert(response.error.step);
            alert(response.error.reason);
            alert(response.error.metadata.order_id);
            alert(response.error.metadata.payment_id);
        });

        rzp1.open();
    }

    return (
        <div className="centered-container">
            <div className="card">
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="card-inner">
                    <h2>Order Summary</h2>
                    <p>Subtotal: Rs 45</p>
                    <p>GST + Tax: Rs 5</p>
                    <p>Total: Rs 50</p>
                </div>
            </div>
            <button className="Btn" onClick={paymentHandler}>Pay</button>
        </div>
    )
}

export default Razorpay;
