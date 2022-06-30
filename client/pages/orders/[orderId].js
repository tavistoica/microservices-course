import { useEffect, useState } from "react";
import Router from "next/router";
// import StripeCheckout from "react-stripe-checkout";
import QRCode from "react-qr-code";
import useRequest from "../../hooks/use-request";

import { calculateTime } from "../../utils/utils";
import { ORDER_PAGE, ORDER_TYPES } from "../../utils/constants";
import styles from "./[orderId].module.css";
import { Button } from "../../components/atoms/Button/Button";

const mainClass = "oct-order";

const OrderShow = ({ order }) => {
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
    <div className={styles[mainClass]}>
      {order.status === ORDER_TYPES.CREATED && (
        <div className={styles[`${mainClass}__created`]}>
          <QRCode value={order.id} />
          {errors}
          <Button
            message={ORDER_PAGE.CANCEL_BUTTON_TEXT}
            type="danger"
            onClick={() => doRequest()}
          />
        </div>
      )}
      {(!timeLeft || order.status === ORDER_TYPES.CANCELLED) && (
        <div className={styles[`${mainClass}__cancelled`]}>
          {ORDER_PAGE.CANCELLED_MESSAGE}
        </div>
      )}
      {timeLeft && order.status === ORDER_TYPES.CREATED && (
        <div
          className={`${mainClass}__time`}
        >{`${ORDER_PAGE.LEFT_TO_PAY_MESSAGE}${timeLeft}`}</div>
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
