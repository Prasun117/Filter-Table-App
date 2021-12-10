import axios from "axios";
import { FilterActions } from "./Store/StateSlice";

export const getData = async (dispatch, setIsLoading, setError) => {
  setIsLoading(true);
  const responce = await axios.get("sample.json");
  setIsLoading(false);
  if (responce.status !== 200) {
    setError(true);
  } else {
    setError(false);
    dispatch(FilterActions.getData(responce.data?.entries));

    //dispatch(FilterActions.getData(responce.data.entries));
  }
};
