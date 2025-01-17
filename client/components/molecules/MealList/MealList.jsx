import React from "react";
import styles from "./MealList.module.css";
import { MealCard } from "../MealCard/MealCard";

export const mainClass = "meal-list";

export const MealList = ({ items }) => {
  const meals = items.map((item) => (
    <MealCard
      id={item.id}
      title={item.title}
      price={item.price}
      stock={item.stock}
      imagePath={item.imagePath}
    />
  ));
  return (
    <div className={styles[`${mainClass}`]}>
      {items.length > 0 ? meals : "No meals to show..."}
    </div>
  );
};
