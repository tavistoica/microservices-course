import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import useRequest from "../../hooks/use-request";
import { QrReader } from "react-qr-reader";
// const QrReader = dynamic(() => import("react-qr-reader"), { ssr: false });

import styles from "./index.module.css";

const ScanOrder = ({ currentUser }) => {
  const [data, setData] = useState("");
  console.log("currentUser", JSON.stringify(currentUser));
  const { doRequest, errors } = useRequest({
    url: `/api/orders/${data}/${currentUser?.id}`,
    method: "patch",
    onSuccess: () => Router.push("/orders"),
  });

  useEffect(() => {
    if (data && currentUser?.id) doRequest();
  }, [data]);

  return (
    <div className={styles["orders-list"]}>
      {errors}
      {!data && (
        <QrReader
          onScan={(_result, error) => {
            if (!!error) {
              console.info(error);
            }
          }}
          onResult={(result) => {
            console.log("resss, ", JSON.stringify(result));
            if (result?.text) {
              setData(result.text);
            }
          }}
          style={{ width: "100%" }}
        />
      )}
      <p>{data}</p>
    </div>
  );
};

export default ScanOrder;
