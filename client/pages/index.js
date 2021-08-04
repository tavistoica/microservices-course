import Link from "next/link";

const LandingPage = ({ currentUser, tickets }) => {
  const ticketList = tickets.map((item) => {
    return (
      <tr key={item.idkubce}>
        <th>
          <Link href="/tickets/[ticketId]" as={`/tickets/${item.id}`}>
            <a>{item.title}</a>
          </Link>
        </th>
        <th>{item.price}</th>
        <th>randpm</th>
      </tr>
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
