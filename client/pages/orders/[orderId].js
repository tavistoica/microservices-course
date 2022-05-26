import { useEffect, useState } from "react";
// import StripeCheckout from "react-stripe-checkout";
import QRCode from "react-qr-code";

const OrderShow = ({ order, currentUser }) => {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const findTimeLeft = () => {
      const msLeft = new Date(order.expiresAt) - new Date();
      setTimeLeft(Math.round(msLeft / 1000));
    };
    findTimeLeft();
    const timerId = setInterval(findTimeLeft, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [order]);

  if (timeLeft < 0) {
    return <div>Order Expired</div>;
  }

  return (
    <div>
      {errors}
      <QRCode value={order.id} />
      Time left to pay: {timeLeft} seconds
      {/* <StripeCheckout
        token={({ id }) => doRequest({ token: id })}
        stripeKey="pk_test_51JGhaeAltPmlu6DoHAGEQpvnVASrUHXMRFpAem4B3IVL03sEe4qveWi8NHOI9XsSGFfuLmH4tqVqrJ9J1BLoimVe00WW87uYDR"
        amount={order.ticket.price * 100}
        email={currentUser.email}
      /> */}
    </div>
  );
};

OrderShow.getInitialProps = async (context, client) => {
  const { orderId } = context.query;
  const { data } = await client.get(`/api/orders/${orderId}`);

  return { order: data };
};

export default OrderShow;
