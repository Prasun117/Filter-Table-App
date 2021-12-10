import React, { useState, useEffect } from "react";
import {
  Paper,
  Card,
  Grid,
  Select,
  FormControl,
  InputLabel,
  makeStyles,
  Button,
  Typography,
  TextField,
  Divider
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { FilterActions } from "../Store/StateSlice";
import { useSelector, useDispatch } from "react-redux";
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  button: {
    margin: theme.spacing(1)
  },
  wheretext: {
    margin: theme.spacing(2)
  }
}));
export const FilterComponent = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const [firstSelector, setFirstSelector] = useState("");
  const [operatorSelector, setOperatorSelector] = useState("");
  const [valueSelector, setValueSelector] = useState("");
  const [andOrSelector, setAndOrSelector] = useState("and");
  const conditions_format = {
    index: props.index,
    id: firstSelector,
    operator: operatorSelector,
    value: valueSelector
  };
  const handleColumnSelector = (e) => {
    setFirstSelector(e.target.value);
    setOperatorSelector("");
    dispatch(
      FilterActions.updateConditions({
        ...conditions_format,
        id: e.target.value
      })
    );
  };
  const handleOperatorSelector = (e) => {
    setOperatorSelector(e.target.value);
    dispatch(
      FilterActions.updateConditions({
        ...conditions_format,
        operator: e.target.value
      })
    );
  };
  const handleValueSelector = (e) => {
    setValueSelector(e.target.value);
    dispatch(
      FilterActions.updateConditions({
        ...conditions_format,
        value: e.target.value
      })
    );
  };
  const handleandOrSelector = (e) => {
    setAndOrSelector(e.target.value);
    dispatch(
      FilterActions.updateAndOR({ index: props.index, value: e.target.value })
    );
  };
  const isDisabled = firstSelector === "";
  const valueDisabled = firstSelector === "" || operatorSelector === "";
  const handleDelete = () => {
    dispatch(FilterActions.deleteConditionsAtIndex(props.index));
  };

  return (
    <>
      <Grid container>
        {props.index === 0 && (
          <Grid item>
            <Typography className={classes.wheretext}>Where</Typography>
          </Grid>
        )}
        {props.index !== 0 && (
          <Grid item xs={8} sm={4} md={2} lg={2}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel htmlFor="outlined-age-native-simple">
                AND/OR
              </InputLabel>
              <Select
                native
                value={andOrSelector}
                onChange={handleandOrSelector}
                label="and/or"
                inputProps={{
                  name: "and/or",
                  id: "outlined-age-native-simple"
                }}
              >
                <option value={"and"}> AND </option>
                <option value={"or"}> OR</option>
              </Select>
            </FormControl>
          </Grid>
        )}
        <Grid item xs={8} sm={4} md={2} lg={2}>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel htmlFor="outlined-age-native-simple">Column</InputLabel>
            <Select
              native
              value={firstSelector}
              onChange={handleColumnSelector}
              label="column"
              inputProps={{
                name: "age",
                id: "outlined-age-native-simple"
              }}
            >
              <option aria-label="None" value="" />
              <option value={"name"}> Name </option>
              <option value={"screen_name"}> Screen Name</option>
              <option value={"followers_count"}> Followers Count</option>
              <option value={"following_count"}> Following Count</option>
              <option value={"location"}> Location</option>
              <option value={"verified"}> Verified</option>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={8} sm={4} md={2} lg={2}>
          <FormControl
            variant="outlined"
            className={classes.formControl}
            disabled={isDisabled}
          >
            {(firstSelector === "name" ||
              firstSelector === "location" ||
              firstSelector === "screen_name" ||
              firstSelector === "") && (
              <>
                <InputLabel htmlFor="outlined-age-native-simple">
                  Operator
                </InputLabel>
                <Select
                  native
                  value={operatorSelector}
                  onChange={handleOperatorSelector}
                  label="operator"
                  inputProps={{
                    name: "operator",
                    id: "outlined-age-native-simple"
                  }}
                >
                  <option aria-label="None" value="" />
                  <option value={"CONTAINS"}>Contains</option>
                </Select>
              </>
            )}

            {(firstSelector === "followers_count" ||
              firstSelector === "following_count") && (
              <>
                <InputLabel htmlFor="outlined-age-native-simple">
                  Operator
                </InputLabel>
                <Select
                  native
                  value={operatorSelector}
                  onChange={handleOperatorSelector}
                  label="operator"
                  inputProps={{
                    name: "operator",
                    id: "outlined-age-native-simple"
                  }}
                >
                  <option aria-label="None" value="" />
                  <option value={"GTE"}>{">="}</option>
                  <option value={"LTE"}>{"<="}</option>
                </Select>
              </>
            )}
            {firstSelector === "verified" && (
              <>
                <InputLabel htmlFor="outlined-age-native-simple">
                  Operator
                </InputLabel>
                <Select
                  native
                  value={operatorSelector}
                  onChange={handleOperatorSelector}
                  label="operator"
                  inputProps={{
                    name: "operator",
                    id: "outlined-age-native-simple"
                  }}
                >
                  <option aria-label="None" value="" />
                  <option value={"EQ"}>Equals</option>
                </Select>
              </>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={8} sm={4} md={2} lg={2}>
          <FormControl
            variant="outlined"
            className={classes.formControl}
            disabled={valueDisabled}
          >
            {firstSelector === "verified" && (
              <>
                <InputLabel htmlFor="outlined-age-native-simple">
                  value
                </InputLabel>
                <Select
                  native
                  value={valueSelector}
                  onChange={handleValueSelector}
                  label="value"
                  inputProps={{
                    name: "value",
                    id: "outlined-age-native-simple"
                  }}
                  disabled={valueDisabled}
                >
                  <option aria-label="None" value="" />
                  <option value={"yes"}>Yes</option>
                  <option value={"no"}>No</option>
                </Select>
              </>
            )}
            {(firstSelector === "followers_count" ||
              firstSelector === "following_count") && (
              <>
                <TextField
                  id="outlined-number"
                  label="Value"
                  type="number"
                  InputLabelProps={{
                    shrink: true
                  }}
                  onChange={handleValueSelector}
                  variant="outlined"
                  disabled={valueDisabled}
                />
              </>
            )}
            {(firstSelector === "name" ||
              firstSelector === "location" ||
              firstSelector === "screen_name" ||
              firstSelector === "") && (
              <>
                <TextField
                  id="outlined-number"
                  label="Value"
                  InputLabelProps={{
                    shrink: true
                  }}
                  variant="outlined"
                  onChange={handleValueSelector}
                  disabled={valueDisabled}
                />
              </>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={8} sm={4} md={2} lg={2}>
          <Button onClick={handleDelete} className={classes.button}>
            <DeleteIcon />
          </Button>
        </Grid>
      </Grid>
      <Divider />
    </>
  );
};
