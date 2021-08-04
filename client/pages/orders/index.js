const OrderIndex = ({ orders }) => {
  return (
    <ul>
      {orders.map((item) => {
        return (
          <li key={item.id}>
            {item.ticket} - {item.status}
          </li>
        );
      })}
    </ul>
  );
};

OrderIndex.getInitialProps = async (context, client) => {
  const { data } = await client.get("/api/orders");

  return { orders: data };
};

export default OrderIndex;
