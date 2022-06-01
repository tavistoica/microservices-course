import Link from "next/link";

const LandingPage = ({ meals, currentUser }) => {
  const mealList = meals.map((item) => {
    return (
      <Link href="/meals/[mealId]" as={`/meals/${item.id}`} key={item.id}>
        <tr key={item.id}>
          <th className="th-title">{item.title}</th>
          <th>{item.price}</th>
        </tr>
      </Link>
    );
  });

  return (
    <div className="text-center">
      {currentUser?.role === "Seller" && <h2>Published Meals</h2>}
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{mealList}</tbody>
      </table>
    </div>
  );
};

LandingPage.getInitialProps = async (_context, client, currentUser) => {
  if (currentUser?.role === "Seller") {
    const { data } = await client.get(`/api/meals/users/${currentUser.id}`);
    return { meals: data };
  }
  const { data } = await client.get("/api/meals");

  return { meals: data };
};

export default LandingPage;
