import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../getData";
import {
  Table,
  TableContainer,
  TableCell,
  TableHead,
  TableRow,
  makeStyles,
  TableBody
} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9)
];

export const TableComponent = (props) => {
  const classes = useStyles();
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.modifiedData);
  useEffect(() => {
    getData(dispatch, setIsloading, setError);
  }, []);
  return (
    <>
      {isLoading && <div>loading...</div>}
      {!isLoading && (
        <div>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="right"> Screen Name</TableCell>
                  <TableCell align="right">Followers Count</TableCell>
                  <TableCell align="right">Following Count,</TableCell>
                  <TableCell align="right">Location</TableCell>
                  <TableCell align="right"> Verified</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.map((row, index) => (
                  <TableRow key={`row.name-${index}`}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.screen_name}</TableCell>
                    <TableCell align="right">{row.followers_count}</TableCell>
                    <TableCell align="right">{row.following_count}</TableCell>
                    <TableCell align="right">{row.location}</TableCell>
                    <TableCell align="right">{row.verified}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </>
  );
};
