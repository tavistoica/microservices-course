import styles from "./OrderList.module.css";

export const OrderList = ({ orders }) => {
  return (
    <div className={styles.container}>
      <div>{JSON.stringify(orders)}</div>
      <ul>
        {orders.map((item) => {
          return (
            <li key={item.id}>
              {item.ticket.title} - {item.status} - {item.itemAmount} -{" "}
              {item.ticket.price}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
