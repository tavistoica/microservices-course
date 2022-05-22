import { useState } from "react";
import dynamic from "next/dynamic";
import { OrderList } from "../../components/OrderList/OrderList";
const QrReader = dynamic(() => import("react-qr-reader"), { ssr: false });

import styles from "./index.module.css";

const OrderIndex = ({ orders }) => {
  const [data, setData] = useState("No Result");
  return (
    <div className={styles["orders-list"]}>
      <QrReader
        onScan={(result, error) => {
          if (!!result) {
            console.log("result of qr: ", JSON.stringify(result));
            setData(JSON.stringify(result));
          }

          if (!!error) {
            console.info(error);
            setData(`error - ${JSON.stringify(error)}`);
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
