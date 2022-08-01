import { useState } from "react";
import axios from "../../api/axios";
import useRequest from "../../hooks/use-request";
import useAuth from "../../hooks/use-auth";
import Router from "next/router";

import styles from "./meal.module.css";
import { PersistLogin } from "../../components/atoms/PersistLogin/PersistLogin";

const buildDropdown = (stock) => {
  const response = [];
  for (let i = 1; i <= stock; i++) {
    response.push(
      <option value={i} key={i}>
        {i}
      </option>
    );
  }
  return response;
};

const MealShow = ({ meal }) => {
  const { auth } = useAuth();
  const [itemAmount, setItemAmount] = useState(1);

  console.log("access Token", auth.accessToken);

  const { doRequest, errors } = useRequest({
    url: "/api/orders",
    method: "post",
    headers: {
      authorization: `Bearer ${auth.accessToken}`,
    },
    body: {
      mealId: meal.id,
      itemAmount,
    },
    onSuccess: (order) =>
      Router.push("/orders/[orderId]", `/orders/${order.id}`),
  });

  return (
    <PersistLogin>
      <div className={styles["meal-page"]}>
        <h1>{meal.title}</h1>
        <h4>{meal.price}$</h4>
        <div>
          <img src={meal.imagePath} width="300px" />
        </div>
        <div>
          <select
            value={itemAmount}
            onChange={(event) => setItemAmount(event.target.value)}
          >
            {buildDropdown(meal.stock)}
          </select>
        </div>
        {errors}
        <button
          className={`btn btn-primary ${styles["purchase-btn"]}`}
          onClick={() => doRequest()}
        >
          Purchase
        </button>
      </div>
    </PersistLogin>
  );
};

export const getServerSideProps = async (context) => {
  const { mealId } = context.query;
  const { data } = await axios.get(`/api/meals/${mealId}`, {
    withCredentials: true,
  });

  return { props: { meal: data } };
};

export default MealShow;
