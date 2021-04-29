import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import SearchBar from "material-ui-search-bar";
import { CircularProgress } from "@material-ui/core";
import { useEffect } from "react";

const dateChanger = (date) => {
  let d = date.split("-");
  var month = [
    "0",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return `${d[0]}-${month[+d[1]]}`;
};
const dateFormat = (date) => {
  let d = date.split("-");
  var month = [
    "0",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return `${d[0]}-${month[+d[1]]}-${d[2]}`;
};

const columns = [
  { id: "ref", label: "Ref. No", minWidth: 100 },
  { id: "date", label: "Date", minWidth: 100 },
  {
    id: "period",
    label: "Period",
    minWidth: 100,

    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "cod",
    label: "COD",
    minWidth: 100,

    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "print",
    label: "Print Statement",
    minWidth: 170,

    format: (value) => value.toFixed(2),
  },
];

function createData(ref, date, period, cod, print) {
  return { ref, date, period, cod, print };
}

let originalRows = [];

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});

export default function StatementTable({ data }) {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (data !== undefined && data !== []) {
      // originalRows = [];
      data.map((d) => {
        originalRows.push(
          createData(
            d.FPS_CODE,
            dateFormat(d.DATE),
            dateChanger(d.SDATE) + " to " + dateChanger(d.EDATE),
            d.CODAMOUNT,
            <div className="flex gap-2">
              <img src="/icons/acrobat.svg" width="16px" />{" "}
              <img src="/icons/file.svg" width="16px" />
            </div>
          )
        );
        setIsLoading(false);
      });
    }
  }, [data]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState(originalRows);

  const [searched, setSearched] = useState("");

  const requestSearch = (searchedVal) => {
    const filteredRows = originalRows.filter((row) => {
      return row.ref.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setRows(filteredRows);
  };
  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper elevation={0} className={classes.root}>
      <div className="flex justify-between items-center mb-[1rem]">
        <SearchBar
          value={searched}
          onChange={(searchVal) => requestSearch(searchVal)}
          onCancelSearch={() => cancelSearch()}
        />
        <div className="space-x-2 hidden sm:block">
          <button className="csvButton">Copy</button>
          <button className="csvButton">Excel</button>
          <button className="csvButton">CSV</button>
        </div>
      </div>
      <TableContainer className={classes.container}>
        {isLoading ? (
          <div className="flex justify-center items-center">
            <CircularProgress />
          </div>
        ) : (
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        )}
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
