import "./styles.css";

import { FilterList } from "./Components/FilterList";
import { TableComponent } from "./Components/TableComponent";

export default function App() {
  return (
    <div className="App">
      <FilterList />
      <TableComponent />
    </div>
  );
}
