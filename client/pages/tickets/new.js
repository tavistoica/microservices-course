import Router from "next/router";
import { useState } from "react";
import useRequest from "../../hooks/use-request";

const newTicket = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState();
  const formData = new FormData();

  const { doRequest, errors } = useRequest({
    url: "/api/tickets",
    method: "post",
    headers: { "Content-type": "multipart/form-data" },
    formData: formData,
    onSuccess: () => Router.push("/"),
  });

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
    formData.append("title", title);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("image", image);
    console.log("formData", JSON.stringify(formData));

    doRequest();
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
          <input
            type="file"
            className="form-control"
            value={image}
            onBlur={onBlur}
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        {errors}
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default newTicket;
