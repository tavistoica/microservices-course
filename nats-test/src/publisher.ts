import nats from "node-nats-streaming";
import { MealCreatedPublisher } from "./events/meal-created-publisher";

console.clear();

const stan = nats.connect("meals", "abc", { url: "http://localhost:4222" });

stan.on("connect", async () => {
  console.log("Publisher connected to NATS");

  const publisher = new MealCreatedPublisher(stan);
  try {
    await publisher.publish({
      id: "123",
      title: "concert",
      price: 20,
    });
  } catch (err) {
    console.log(err);
  }

  //   const data = JSON.stringify({
  //     id: "123",
  //     title: "concert",
  //     price: 20,
  //   });

  //   stan.publish("meal:created", data, () => {
  //     console.log("event published");
  //   });
});
