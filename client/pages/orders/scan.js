import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import useRequest from "../../hooks/use-request";
const QrReader = dynamic(() => import("react-qr-reader"), { ssr: false });

import styles from "./index.module.css";

const ScanOrder = ({ currentUser }) => {
  const [data, setData] = useState("");
  const { doRequest, errors } = useRequest({
    url: `/api/orders/${data}/${currentUser?.id}`,
    method: "patch",
    onSuccess: () => Router.push("/orders"),
  });

  useEffect(() => {
    if (data) doRequest();
  }, data);

  return (
    <div className={styles["orders-list"]}>
      {errors}
      {!data && (
        <QrReader
          onScan={(result, error) => {
            if (!!result) {
              setData(result);
            }

            if (!!error) {
              console.info(error);
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
