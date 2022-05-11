import styles from "./OrderList.module.css";

export const OrderList = ({ orders }) => {
  return (
    <div className={styles.container}>
      <div>{JSON.stringify(orders)}</div>
      <ul>
        {orders.map((item) => {
          console.log("item", item);
          return (
            <li key={item.id}>
              {item.ticket} - {item.status} - {item.itemAmount}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
