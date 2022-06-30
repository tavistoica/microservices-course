import { useEffect, useState } from "react";
import Router from "next/router";
// import StripeCheckout from "react-stripe-checkout";
import QRCode from "react-qr-code";
import useRequest from "../../hooks/use-request";

import { calculateTime } from "../../utils/utils";
import { Button } from "../../components/atoms/Button/Button";

const OrderShow = ({ order }) => {
  console.log("order", JSON.stringify(order));
  const [timeLeft, setTimeLeft] = useState(0);

  const { doRequest, errors } = useRequest({
    url: `/api/orders/${order.id}`,
    method: "patch",
    onSuccess: () => Router.push("/"),
  });

  useEffect(() => {
    const findTimeLeft = () => {
      const msLeft = new Date(new Date(order.expiresAt) - new Date());
      setTimeLeft(msLeft > 0 ? calculateTime(msLeft) : 0);
    };
    findTimeLeft();
    const timerId = setInterval(findTimeLeft, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [order]);

  return (
    <div>
      {order.status === "created" && (
        <>
          <QRCode value={order.id} />
          {errors}
          <Button
            message="Cancel Order"
            type="danger"
            onClick={() => doRequest()}
          />
        </>
      )}
      {(!timeLeft || order.status === "cancelled") && (
        <div>Order has been canceled</div>
      )}
      {timeLeft && order.status === "created" && (
        <div>Time left to pay: {timeLeft}</div>
      )}
      {/* <StripeCheckout
        token={({ id }) => doRequest({ token: id })}
        stripeKey="pk_test_51JGhaeAltPmlu6DoHAGEQpvnVASrUHXMRFpAem4B3IVL03sEe4qveWi8NHOI9XsSGFfuLmH4tqVqrJ9J1BLoimVe00WW87uYDR"
        amount={order.meal.price * 100}
        email={currentUser.email}
      /> */}
    </div>
  );
};

OrderShow.getInitialProps = async (context, client) => {
  const { orderId } = context.query;
  const { data } = await client.get(`/api/orders/${orderId}`, {
    withCredentials: true,
  });

  return { order: data };
};

export default OrderShow;
