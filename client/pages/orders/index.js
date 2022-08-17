import { ItemList } from "../../components/molecules/ItemList/ItemList";
import useAuth from "../../hooks/use-auth";
import { PersistLogin } from "../../components/atoms/PersistLogin/PersistLogin";

import styles from "./index.module.css";

const OrderIndex = ({ orders }) => {
  const [orders, setOrders] = useState([]);
  
  useEffect(() => {
    const { auth } = useAuth();
    const { data } = await client.get("/api/orders", {
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
      withCredentials: true,
    });
    setOrders(data)
  }, [])

  const fields = ["meal.title", "status", "itemAmount", "meal.price"];
  const headers = ["Title", "Status", "Amount", "Price"];

  return (
    <PersistLogin>
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
