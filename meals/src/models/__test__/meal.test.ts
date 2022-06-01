import { Meal } from "../meal.model";

it("implements optimistic concurrency control", async () => {
  //  Create an instance of a meal
  const meal = Meal.build({
    title: "concert",
    price: 20,
    userId: "123",
    stock: 10,
    imagePath: "test",
  });

  //  Save the meal to the database
  await meal.save();

  //  fetch the meal twice
  const firstInstance = await Meal.findById(meal.id);
  const secondInstance = await Meal.findById(meal.id);

  //  make two separate changes to the meals we fetched
  firstInstance!.set({ price: 10 });
  secondInstance!.set({ price: 15 });

  //  save the first fetched meal
  await firstInstance!.save();

  //  save the second fetched meal and expect an error
  try {
    await secondInstance!.save();
  } catch (err) {
    return;
  }
});

it("increments the version number on multiple saves", async () => {
  const meal = Meal.build({
    title: "concert",
    price: 20,
    userId: "1234",
    stock: 10,
    imagePath: "test",
  });

  await meal.save();
  expect(meal.version).toEqual(0);
  await meal.save();
  expect(meal.version).toEqual(1);
  await meal.save();
  expect(meal.version).toEqual(2);
});
