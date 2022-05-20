import { useState } from "react";
import useRequest from "../../hooks/use-request";
import Router from "next/router";

import styles from "./ticket.module.css";

const buildDropdown = (stock) => {
  const response = [];
  for (let i = 1; i <= stock; i++) {
    response.push(<option value={i}>{i}</option>);
  }
  return response;
};

const TicketShow = ({ ticket }) => {
  const [itemAmount, setItemAmount] = useState(1);

  const { doRequest, errors } = useRequest({
    url: "/api/orders",
    method: "post",
    body: {
      ticketId: ticket.id,
      itemAmount,
    },
    onSuccess: (order) =>
      Router.push("/orders/[orderId]", `/orders/${order.id}`),
  });

  return (
    <div className={styles["ticket-page"]}>
      <h1>{ticket.title}</h1>
      <h4>{ticket.price}$</h4>
      <div>
        <select
          value={itemAmount}
          onChange={(event) => setItemAmount(event.target.value)}
        >
          {buildDropdown(ticket.stock)}
        </select>
      </div>
      {errors}
      <button
        className={`btn btn-primary ${styles["purchase-btn"]}`}
        onClick={() => doRequest()}
      >
        Purchase
      </button>
    </div>
  );
};

TicketShow.getInitialProps = async (context, client) => {
  const { ticketId } = context.query;
  const { data } = await client.get(`/api/tickets/${ticketId}`);

  return { ticket: data };
};

export default TicketShow;
