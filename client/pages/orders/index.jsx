import React, { useState, useEffect } from "react";
import { ItemList } from "../../components/molecules/ItemList/ItemList";

import useAuth from "../../hooks/use-auth";
import useAxiosPrivate from "../../hooks/use-axios-private";

import { PersistLogin } from "../../components/atoms/PersistLogin/PersistLogin";

import styles from "./index.module.css";

const OrderIndex = () => {
  const [orders, setOrders] = useState([]);

  useEffect(async () => {
    const axiosPrivate = useAxiosPrivate();
    const { data } = await axiosPrivate.get("/api/orders");
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
