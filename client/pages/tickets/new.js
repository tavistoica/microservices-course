import Router from "next/router";
import { useState } from "react";
import { FileUploader } from "../../components/FileUploader/FileUploader";
import useRequest from "../../hooks/use-request";
import FormData from "form-data";
import axios from "axios";
import { HOST_URL } from "../../utils/constants";

const newTicket = () => {
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
  //   url: "/api/tickets",
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
      .post(config.SERVER_URL, createFormData(), {
        headers: {
          "Content-type": "multipart/form-data",
        },
      })
      .then(() => {
        Router.push("/");
      });

    // doRequest();
  };

  return (
    <div>
      <h1>Create a Ticket</h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input
            className="form-control"
            value={price}
            onBlur={onBlur}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Stock</label>
          <input
            className="form-control"
            value={stock}
            onBlur={onBlur}
            onChange={(e) => setStock(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Image</label>
          <FileUploader onFileSelect={(file) => setImage(file)} />
        </div>
        {/* {errors} */}
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default newTicket;
