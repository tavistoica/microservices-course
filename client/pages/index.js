import axios from "../api/axios";
import { PersistLogin } from "../components/atoms/PersistLogin/PersistLogin";
import { MealList } from "../components/molecules/MealList/MealList";

const LandingPage = ({ meals, currentUser }) => {
  return (
    <PersistLogin>
      <div>
        {currentUser?.role === "Resturant" && <h2>Published Meals</h2>}
        <div className={"divider"} />
        <MealList items={meals} />
      </div>
    </PersistLogin>
  );
};

export const getServerSideProps = async (_context, currentUser) => {
  if (currentUser?.role === "Resturant") {
    const { data } = await axios.get(`/api/meals/users/${currentUser.id}`);
    return { meals: data };
  }
  const { data } = await axios.get("/api/meals");

  return { props: { meals: data } };
};

export default LandingPage;
