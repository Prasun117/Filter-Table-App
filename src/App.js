import "./styles.css";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@material-ui/core";

import { FilterList } from "./Components/FilterList";
import { TableComponent } from "./Components/TableComponent";
import { FilterComponent } from "./Components/TableFilter";
export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <FilterList />
      <TableComponent />
    </div>
  );
}
