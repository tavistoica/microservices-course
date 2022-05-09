import styles from "./OrderList.module.css";

export const OrderList = ({ orders }) => {
  return (
    <div className={styles.container}>
      <ul>
        {orders.map((item) => {
          return (
            <li key={item.id}>
              {item.ticket} - {item.status}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
