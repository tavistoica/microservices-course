import request from "supertest";
import { app } from "../../app";

const createMeal = () => {
  return request(app).post("/api/meals").set("Cookie", global.signin()).send({
    title: "sdgege",
    price: 10,
    stock: 10,
    imagePath: "test",
  });
};

it("can fetch a list of meals", async () => {
  await createMeal();
  await createMeal();
  await createMeal();

  const response = await request(app).get("/api/meals").send().expect(200);
  expect(response.body.length).toEqual(3);
});
