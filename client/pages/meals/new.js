import Router from "next/router";
import { useState } from "react";
import FormData from "form-data";
import axios from "axios";

import styles from "./meal.module.css";

import { FileUploader } from "../../components/molecules/FileUploader/FileUploader";
import { FormField } from "../../components/molecules/FormField/FormField";
import {
  mealTitleValidation,
  mealPriceValidation,
  mealStockValidation,
} from "../../utils/input-validation";
import useAuth from "../../hooks/use-auth";

import { HOST_URL } from "../../utils/constants";

const newMeal = () => {
  const { auth } = useAuth();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState(null);

  const createFormData = () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("image", image || "");
    console.log("formData", formData);
    return formData;
  };

  // const { doRequest, errors } = useRequest({
  //   url: "/api/meals",
  //   method: "post",
  //   headers: { "Content-type": "multipart/form-data" },
  //   body: createFormData(),
  //   onSuccess: () => Router.push("/"),
  // });

  const onBlur = () => {
    const value = parseFloat(price);

    if (isNaN(value)) {
      setPrice("");
      return;
    }

    setPrice(value.toFixed(2));
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const config =
      process?.env?.IS_PRODUCTION !== "false" ? HOST_URL.PROD : HOST_URL.DEV;

    axios
      .post(`${config.SERVER_URL}/api/meals`, createFormData(), {
        headers: {
          "Content-type": "multipart/form-data",
          authorization: `Bearer ${auth.accessToken}`,
        },
      })
      .then(() => {
        Router.push("/");
      });

    // doRequest();
  };

  return (
    <div>
      <h1>Publich a Meal</h1>
      <form onSubmit={onSubmit}>
        <div className={styles.margintop}>
          <FormField
            placeholder="Enter Meal Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            label="Title"
            getError={mealTitleValidation}
            required
          />
        </div>
        <div className={styles.margintop}>
          <FormField
            type="number"
            placeholder="99.99"
            value={price}
            onBlur={onBlur}
            onChange={(e) => setPrice(e.target.value)}
            label="Price"
            getError={mealPriceValidation}
            required
          />
        </div>
        <div className={styles.margintop}>
          <FormField
            type="number"
            placeholder="Stock amount"
            value={stock}
            onBlur={onBlur}
            onChange={(e) => setStock(e.target.value)}
            label="Stock"
            getError={mealStockValidation}
            required
          />
        </div>
        <div className={styles.margintop}>
          <label>Image</label>
          <FileUploader onFileSelect={(file) => setImage(file)} />
        </div>
        {/* {errors} */}
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default newMeal;
