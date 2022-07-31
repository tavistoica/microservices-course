import { useState, useEffect } from "react";
import useRequest from "../../hooks/use-request";
import { QrReader } from "react-qr-reader";

import styles from "./index.module.css";
import useAuth from "../../hooks/use-auth";

const ScanOrder = ({ currentUser }) => {
  const { auth } = useAuth();
  const [data, setData] = useState("");
  const [resData, setResData] = useState({});

  const { doRequest, errors } = useRequest({
    url: `/api/orders/${data}/${currentUser?.id}`,
    headers: { authorization: auth.accessToken },
    method: "patch",
    onSuccess: (res) => setResData(res),
  });

  useEffect(() => {
    if (data && currentUser?.id) doRequest();
  }, [data]);

  useEffect(() => {
    setData("");
  }, [errors]);

  return (
    <div className={styles["orders-list"]}>
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
          <h1>{resData.meal?.title}</h1>
          <h4>Status: {resData.status}</h4>
          <h4>Amount: {resData.itemAmount}</h4>
          <h4>{resData.meal?.price * resData.itemAmount}$</h4>
        </>
      )}
    </div>
  );
};

export default ScanOrder;
