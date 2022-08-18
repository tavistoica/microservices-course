import React, { useState, useEffect } from "react";
import { ItemList } from "../../components/molecules/ItemList/ItemList";

import useAuth from "../../hooks/use-auth";
import axios from "../../api/axios";
import useRequest from "../../hooks/use-request";

import { PersistLogin } from "../../components/atoms/PersistLogin/PersistLogin";

import styles from "./index.module.css";

const OrderIndex = () => {
  const { auth } = useAuth();
  const [orders, setOrders] = useState([]);

  const { doRequest, errors } = useRequest({
    url: "/api/orders",
    method: "get",
    headers: {
      Authorization: `Bearer ${auth.accessToken}`,
    },
    onSuccess: (res) => setOrders(res),
  });

  useEffect(() => {
    // async () => {
    //   const { data } = await axios.get("/api/orders", {
    //     headers: {

    //       Authorization: `Bearer ${auth.accessToken}`,
    //     },
    //   });
    //   console.log("random", data);
    //   setOrders(data);
    // };
    doRequest();
  }, []);

  const fields = ["meal.title", "status", "itemAmount", "meal.price"];
  const headers = ["Title", "Status", "Amount", "Price"];

  return (
    <PersistLogin>
      {console.log("orders", orders)}
      <div className={styles["orders-list"]}>
        <ItemList
          orders={orders}
          fields={fields}
          headers={headers}
          baseURL="/orders"
        />
      </div>
    </PersistLogin>
  );
};

export default OrderIndex;
