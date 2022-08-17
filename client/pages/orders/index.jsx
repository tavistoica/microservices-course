import React, { useState, useEffect } from "react";
import { ItemList } from "../../components/molecules/ItemList/ItemList";

import useAuth from "../../hooks/use-auth";
import axios from "../../api/axios";

import { PersistLogin } from "../../components/atoms/PersistLogin/PersistLogin";

import styles from "./index.module.css";

const OrderIndex = () => {
  const [orders, setOrders] = useState([]);

  useEffect(async () => {
    const { auth } = useAuth();
    const { data } = await axios.get("/api/orders", {
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
      withCredentials: true,
    });
    setOrders(data);
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
