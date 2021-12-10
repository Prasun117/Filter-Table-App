import React from "react";
import { FilterComponent } from "./TableFilter";
import { useSelector, useDispatch } from "react-redux";
import { FilterActions } from "../Store/StateSlice";
import { Button, Paper, makeStyles } from "@material-ui/core";
import { filterData } from "../handleFilter";
const useStyles = makeStyles((theme) => ({
  root: {
    padding: "10px",
    width: "90vw"
  }
}));
export const FilterList = (props) => {
  const classes = useStyles();
  const condition = useSelector((state) => state.conditions);
  const andorArray = useSelector((state) => state.andor);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data);
  const handleAddFilter = (e) => {
    e.preventDefault();
    dispatch(FilterActions.addConditions({ id: "", operator: "", value: "" }));
    dispatch(FilterActions.addAndOR("and"));
  };

  const handleApplyFilter = () => {
    filterData(data, dispatch, condition, andorArray);
  };

  return (
    <>
      <Paper elevation={10} variant="outlined" className={classes.root}>
        {condition.map((item, index) => (
          <FilterComponent key={`filter-${index}`} index={index} />
        ))}
        <Button color={"primary"} onClick={handleAddFilter}>
          + Add Filter
        </Button>
        <Button color={"secondary"} onClick={handleApplyFilter}>
          Apply Filter
        </Button>
      </Paper>
    </>
  );
};
