import { FilterActions } from "./Store/StateSlice";

const filterLocName = (filterId, filterValue, data) => {
  if (filterId === "location") {
    return data.filter((item) =>
      item.location.toLowerCase().includes(filterValue.toLowerCase())
    );
  } else if (filterId === "name") {
    return data.filter((item) =>
      item.name.toLowerCase().includes(filterValue.toLowerCase())
    );
  } else if (filterId === "screen_name") {
    return data.filter((item) =>
      item.screen_name.toLowerCase().includes(filterValue.toLowerCase())
    );
  }
};

const filterDataByVerified = (filterid, filtervalue, data) => {
  return data.filter((item) => item.verified === filtervalue);
};
const filterDataByFollowersAndFollowing = (
  filterid,
  filterValue,
  filterOperator,
  data
) => {
  if (filterOperator === "LTE") {
    if (filterid === "followers_count")
      return data.filter((item) => item.followers_count <= filterValue);
    else if (filterid === "following_count") {
      return data.filter((item) => item.following_count <= filterValue);
    }
  }
  if (filterOperator === "GTE") {
    if (filterid === "followers_count")
      return data.filter((item) => item.followers_count >= filterValue);
    else if (filterid === "following_count")
      return data.filter((item) => item.following_count >= filterValue);
  }
};

const combinedFilter = (item, data) => {
  if (
    item.id === "location" ||
    item.id === "name" ||
    item.id === "screen_name"
  ) {
    return filterLocName(item.id, item.value, data);
  } else if (item.id === "followers_count" || item.id === "following_count") {
    return filterDataByFollowersAndFollowing(
      item.id,
      item.value,
      item.operator,
      data
    );
  } else if (item.id === "verified") {
    return filterDataByVerified(item.id, item.value, data);
  }
};

const combinedFilterOr = (item, data, prevfilterdata) => {
  let internal = combinedFilter(item, data);

  internal = internal.concat(prevfilterdata);
  internal = internal.filter(
    (thing, index, self) =>
      index ===
      self.findIndex(
        (t) => t.name === thing.name && t.screen_name === thing.screen_name
      )
  );
  return internal;
};

export const filterData = (data, dispatch, conditions, andOrArray) => {
  let filterdata;
  console.log(data);
  if (data && conditions?.length > 0) {
    conditions.forEach((item, index) => {
      if (item.id !== "" || item.value !== "" || item.operator !== "") {
        if (index === 0) {
          filterdata = combinedFilter(item, data);
        } else if (andOrArray[index] === "and") {
          filterdata = combinedFilter(item, filterdata);
        } else if (andOrArray[index] === "or") {
          filterdata = combinedFilterOr(item, data, filterdata);
        }
      }
    });
    dispatch(FilterActions.updateData(filterdata));
  } else {
    dispatch(FilterActions.updateData(data));
  }

  console.log(filterdata);
  console.log(data);
};
