import { useState, useEffect } from "react";
import useRequest from "../../hooks/use-request";
import { QrReader } from "react-qr-reader";

import styles from "./index.module.css";

const ScanOrder = ({ currentUser }) => {
  const [data, setData] = useState("");
  const { doRequest, errors } = useRequest({
    url: `/api/orders/${data}/${currentUser?.id}`,
    method: "patch",
  });

  useEffect(() => {
    console.log("new data ", data);
    if (data && currentUser?.id) doRequest();
  }, [data]);

  useEffect(() => {
    setData("");
  }, [errors]);

  return (
    <div className={styles["orders-list"]}>
      {console.log("errors", JSON.stringify(errors))}
      {errors}
      {!data && (
        <QrReader
          onResult={(result, error) => {
            if (!!result) {
              setData(result?.text);
            }

            if (!!error) {
              console.info("err: ", error);
            }
          }}
          constraints={{ facingMode: "environment" }}
          style={{ width: "100%" }}
        />
      )}
      {data && (
        <>
          <h1>{data.ticket?.title}</h1>
          <h4>Status: {data.status}</h4>
          <h4>{data.ticket?.price}$</h4>
          <h4>Amount: {data.itemAmount}</h4>
        </>
      )}
    </div>
  );
};

export default ScanOrder;
