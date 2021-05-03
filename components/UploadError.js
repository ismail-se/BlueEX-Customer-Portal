import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function uploadError({ data }) {
  const classes = useStyles();

  function createData(
    name,
    address,
    contact,
    email,
    productName,
    productValue,
    pieces,
    weight,
    destination,
    customerRef,
    comments,
    storeId
  ) {
    return {
      name,
      address,
      contact,
      email,
      productName,
      productValue,
      pieces,
      weight,
      destination,
      customerRef,
      comments,
      storeId,
    };
  }

  const originalRows = [];

  const [rows, setRows] = useState(originalRows);

  useEffect(() => {
    for (let d of data) {
      originalRows.push(
        createData(
          d["Consignee Name"],
          d["Consignee Address"],
          d["Consignee Contact No"],
          d["Consignee Email"],
          d["Product Name"],
          d["COD"],
          d["Pieces"],
          d["Weight"],
          d["Destination"],
          d["Customer Reference"],
          d["Customer Comment"],
          d["Store Id"]
        )
      );
    }
    console.log("Data", rows);
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Customer Name</TableCell>
            <TableCell>Customer Address</TableCell>
            <TableCell>Customer Contact</TableCell>
            <TableCell>Customer Email</TableCell>
            <TableCell>Product Name</TableCell>
            <TableCell>Product Value</TableCell>
            <TableCell>Pieces</TableCell>
            <TableCell>Weight</TableCell>
            <TableCell>Destination</TableCell>
            <TableCell>Customer Refrence</TableCell>
            <TableCell>Comments</TableCell>
            <TableCell>Store ID</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                <input type="text" value={row.name} />
              </TableCell>
              <TableCell>
                <input type="text" value={row.address} />
              </TableCell>
              <TableCell>{row.contact}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.productName}</TableCell>
              <TableCell>{row.productValue}</TableCell>
              <TableCell>{row.pieces}</TableCell>
              <TableCell>{row.weight}</TableCell>
              <TableCell>{row.destination}</TableCell>
              <TableCell>{row.customerRef}</TableCell>
              <TableCell>{row.comments}</TableCell>
              <TableCell>{row.storeId}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
