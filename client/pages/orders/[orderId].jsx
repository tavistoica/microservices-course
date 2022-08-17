import React, { useEffect, useState } from "react";
import Router from "next/router";
// import StripeCheckout from "react-stripe-checkout";
import QRCode from "react-qr-code";
import useRequest from "../../hooks/use-request";
import axios from "../../api/axios";

import { calculateTime } from "../../utils/utils";
import { ORDER_PAGE, ORDER_TYPES } from "../../utils/constants";
import styles from "./[orderId].module.css";
import { Button } from "../../components/atoms/Button/Button";
import useAuth from "../../hooks/use-auth";
import { PersistLogin } from "../../components/atoms/PersistLogin/PersistLogin";

const mainClass = "oct-order";

const OrderShow = ({ orderId }) => {
  const { auth } = useAuth();
  const [order, setOrder] = useState([]);

  useEffect(async () => {
    const { data } = await axios.get(`/api/orders/${orderId}`, {
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
      withCredentials: true,
    });
    setOrder(data);
  }, []);

  const [timeLeft, setTimeLeft] = useState(0);

  const { doRequest, errors } = useRequest({
    url: `/api/orders/${order.id}`,
    headers: {
      Authorization: `Bearer ${auth.accessToken}`,
    },
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
    <PersistLogin>
      <div className={styles[mainClass]}>
        <div className={styles[`${mainClass}__errors`]}>{errors}</div>
        {order.status === ORDER_TYPES.CREATED && (
          <div className={styles[`${mainClass}__created`]}>
            <div className={styles[`${mainClass}__qr-code`]}>
              <QRCode value={order.id} />
            </div>
            <div className={styles[`${mainClass}__cancel-button`]}>
              <Button
                message={ORDER_PAGE.CANCEL_BUTTON_TEXT}
                type="danger"
                onClick={() => doRequest()}
              />
            </div>
          </div>
        )}
        {(!timeLeft || order.status === ORDER_TYPES.CANCELLED) && (
          <div className={styles[`${mainClass}__cancelled`]}>
            {ORDER_PAGE.CANCELLED_MESSAGE}
          </div>
        )}
        {timeLeft && order.status === ORDER_TYPES.CREATED && (
          <div className={styles[`${mainClass}__time`]}>
            <h5>{ORDER_PAGE.LEFT_TO_PAY_MESSAGE}</h5>
            <h6>{timeLeft}</h6>
          </div>
        )}
        {/* <StripeCheckout
        token={({ id }) => doRequest({ token: id })}
        amount={order.meal.price * 100}
        email={currentUser.email}
      /> */}
      </div>
    </PersistLogin>
  );
};

export const getServerSideProps = async (context) => {
  const { orderId } = context.query;

  return { props: { orderId } };
};

export default OrderShow;
