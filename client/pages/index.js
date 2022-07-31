import axios from "../api/axios";
import { MealList } from "../components/molecules/MealList/MealList";

const LandingPage = ({ meals, currentUser }) => {
  return (
    <div>
      {currentUser?.role === "Resturant" && <h2>Published Meals</h2>}
      <div className={"divider"} />
      <MealList items={meals} />
    </div>
  );
};

LandingPage.getInitialProps = async (_context, currentUser) => {
  if (currentUser?.role === "Resturant") {
    const { data } = await axios.get(`/api/meals/users/${currentUser.id}`);
    return { meals: data };
  }
  const { data } = await axios.get("/api/meals");

  return { meals: data };
};

export default LandingPage;
