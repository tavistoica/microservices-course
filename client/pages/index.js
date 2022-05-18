import Link from "next/link";

const LandingPage = ({ tickets, currentUser }) => {
  const ticketList = tickets.map((item) => {
    return (
      <Link href="/tickets/[ticketId]" as={`/tickets/${item.id}`} key={item.id}>
        <tr key={item.id}>
          <th>{item.title}</th>
          <th>{item.price}</th>
        </tr>
      </Link>
    );
  });

  return (
    <div>
      <table className="table">
        {currentUser?.role === "Seller" && <h2>Published Meals</h2>}
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{ticketList}</tbody>
      </table>
    </div>
  );
};

LandingPage.getInitialProps = async (_context, client, currentUser) => {
  if (currentUser.role === "Seller") {
    const { data } = await client.get(`/api/meals/users/${currentUser.id}`);
    return { tickets: data };
  }
  const { data } = await client.get("/api/tickets");

  return { tickets: data };
};

export default LandingPage;
