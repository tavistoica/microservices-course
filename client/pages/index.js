import Link from "next/link";

const LandingPage = ({ tickets }) => {
  const ticketList = tickets.map((item) => {
    return (
      <Link href="/tickets/[ticketId]" as={`/tickets/${item.id}`}>
        <tr key={item.id}>
          <th>{item.title}</th>
          <th>{item.price}</th>
        </tr>
      </Link>
    );
  });

  return (
    <div>
      <h1>Tickets</h1>
      <table className="table">
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

LandingPage.getInitialProps = async (context, client, currentUser) => {
  const { data } = await client.get("/api/tickets");

  return { tickets: data };
};

export default LandingPage;
