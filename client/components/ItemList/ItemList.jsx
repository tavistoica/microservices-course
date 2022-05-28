import Link from "next/link";

import styles from "./ItemList.module.css";

export const ItemList = ({ orders, headers, baseURL, fields }) => {
  const ticketList = orders.map((item) => {
    return (
      <Link
        href={`${baseURL}/[itemId]`}
        as={`${baseURL}/${item.id}`}
        key={item.id}
      >
        <tr key={item.id}>
          {fields.map((field) => {
            if (field.includes(".")) {
              const nestedObjects = field.split(".");
              let searchedField = item[`${nestedObjects[0]}`];
              for (let i = 1; i < nestedObjects.length; i++) {
                searchedField = searchedField[`${nestedObjects[i]}`];
              }

              return <th>{searchedField}</th>;
            }
            return <th>{item[`${field}`]}</th>;
          })}
        </tr>
      </Link>
    );
  });

  const constructList = () => {
    return (
      <table className="table">
        <thead>
          <tr>
            {headers.map((item) => (
              <th>{item}</th>
            ))}
          </tr>
        </thead>
        <tbody>{ticketList}</tbody>
      </table>
      // <Link href="/orders/[orderId]" as={`/orders/${item.id}`} key={item.id}>
      //   <a className={styles["list-row"]}>
      //     <div>{item.ticket.title}</div>
      //     <div>{item.status}</div>
      //     <div>{item.itemAmount}</div>
      //     <div>{item.ticket.price}</div>
      //   </a>
      // </Link>
      // );
    );
  };

  return <div className={styles.container}>{constructList()}</div>;
};
