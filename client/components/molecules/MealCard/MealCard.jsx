import React from "react";
import Link from "next/link";
import styles from "./MealCard.module.css";

export const mainClass = "meal-card";

export const MealCard = ({ id, title, imagePath, price, stock }) => (
  <Link href="/meals/[mealId]" as={`/meals/${id}`} key={id}>
    <div className={styles[`${mainClass}`]}>
      <div className={styles[`${mainClass}_content`]}>
        <div className={styles[`${mainClass}_content_title`]}>{title}</div>
        <div>
          <div className={styles[`${mainClass}_content_stock`]}>
            {`Stock: ${stock}`}
          </div>
          <div className={styles[`${mainClass}_content_price`]}>{price}Lei</div>
        </div>
      </div>
      <div className={styles[`${mainClass}_image`]}>
        <img alt="Meal" src={imagePath} />
      </div>
    </div>
  </Link>
);
