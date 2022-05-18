import { useState } from "react";
import { OrderList } from "../../components/OrderList/OrderList";
import { QrReader } from "react-qr-reader";

import styles from "./index.module.css";

const OrderIndex = ({ orders }) => {
  const [data, setData] = useState("No Result");
  return (
    <div className={styles["orders-list"]}>
      <QrReader
        onResult={(result, error) => {
          if (!!result) {
            setData(result?.text);
          }

          if (!!error) {
            console.info(error);
          }
        }}
        style={{ width: "100%" }}
      />
      <p>{data}</p>
      <OrderList orders={orders} />
    </div>
  );
};

OrderIndex.getInitialProps = async (_context, client) => {
  const { data } = await client.get("/api/orders");

  return { orders: data };
};

export default OrderIndex;
