import dynamic from "next/dynamic";
import { OrderList } from "../../components/OrderList/OrderList";
const QrReader = dynamic(() => import("react-qr-reader"), { ssr: false });

import styles from "./index.module.css";

const OrderIndex = ({ orders }) => {
  return (
    <div className={styles["orders-list"]}>
      <OrderList orders={orders} />
    </div>
  );
};

OrderIndex.getInitialProps = async (_context, client) => {
  const { data } = await client.get("/api/orders");

  return { orders: data };
};

export default OrderIndex;
