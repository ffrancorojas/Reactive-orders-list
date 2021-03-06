import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import { OrderRow } from "./order.row";
import { Order } from "../core/myContext.model";
import { MyContext } from "../core/myContext.";

const useStyles = makeStyles({
  table: {
    boxSizing: "border-box",
    width: 800,
  },
  validationInputs: {
    display: "flex",
    margin: "12px",
    "& > button": {
      width: "80px",
      margin: "012px",
      "&:hover": {
        backgroundColor: "aquamarine",
      },
    },
  },
});

export const OrderDetailTable = () => {
  const { data, setData, checkedList } = React.useContext(MyContext);

  const classes = useStyles();

  const handleClickValidate = () => {
    if (checkedList.length > 0) {
      const newStateOrder: Order[] = data.order.map((element) => {
        if (checkedList.includes(element.id)) {
          return { ...element, state: true };
        } else {
          return { ...element };
        }
      });

      setData({ ...data, order: newStateOrder });
    }
  };

  const handleClickInValidate = () => {
    const newStateOrder: Order[] = data.order.map((element) => {
      if (checkedList.includes(element.id)) {
        return { ...element, state: false };
      } else {
        return { ...element };
      }
    });

    setData({ ...data, order: newStateOrder });
  };

  const handleChangeImport = (e, id) => {
    const newArrayWithNewImports = data.order.map((elem) =>
      elem.id === id ? { ...elem, import: e.target.value } : { ...elem }
    );

    setData({ ...data, order: newArrayWithNewImports });
  };

  return (
    <>
      <div className={classes.validationInputs}>
        <button onClick={handleClickValidate}>Validate</button>
        <button onClick={handleClickInValidate}>Invalidate</button>
      </div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell align="left">State</TableCell>
              <TableCell align="left">Description</TableCell>
              <TableCell align="center">Import</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.order.map((product, index) => (
              <OrderRow
                index={index}
                product={product}
                key={product.id}
                handleChangeImport={handleChangeImport}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
