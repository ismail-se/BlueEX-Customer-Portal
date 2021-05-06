import { arrayToExcel } from "./ArrayToExcel";
import cloneDeep from "lodash.clonedeep";
import { useState } from "react";

const ArrayToExcelButton = ({ apiArray, fileName, children }) => {
  const apiArrayToExcel = () => {
    arrayToExcel.convertArrayToTable(apiArray, fileName);
  };
  return <div onClick={() => apiArrayToExcel()}>{children}</div>;
};

export default ArrayToExcelButton;
