import { useState } from "react";
import dynamic from "next/dynamic";
const QrReader = dynamic(() => import("react-qr-reader"), { ssr: false });

import styles from "./index.module.css";

const ScanOrder = () => {
  const [data, setData] = useState("No Result");
  return (
    <div className={styles["orders-list"]}>
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
      <p>{data}</p>
    </div>
  );
};

export default ScanOrder;
