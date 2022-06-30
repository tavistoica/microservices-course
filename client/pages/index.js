import { MealList } from "../components/molecules/MealList/MealList";

const LandingPage = ({ meals, currentUser }) => {
  return (
    <div>
      {currentUser?.role === "Seller" && <h2>Published Meals</h2>}
      <MealList items={meals} />
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
