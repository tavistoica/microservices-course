import { ItemList } from "../../components/molecules/ItemList/ItemList";
import useAuth from "../../hooks/use-auth";

import styles from "./index.module.css";

const OrderIndex = ({ orders }) => {
  const fields = ["meal.title", "status", "itemAmount", "meal.price"];
  const headers = ["Title", "Status", "Amount", "Price"];

  return (
    <div className={styles["orders-list"]}>
      <ItemList
        orders={orders}
        fields={fields}
        headers={headers}
        baseURL="/orders"
      />
    </div>
  );
};

export const getServerSideProps = async (_context, client) => {
  const { auth } = useAuth();
  const { data } = await client.get("/api/orders", {
    headers: {
      authorization: `Bearer ${auth.accessToken}`,
    },
    withCredentials: true,
  });

  return { props: { orders: data } };
};

export default OrderIndex;
