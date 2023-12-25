import { useRef, useState } from "react";
import { utilService } from "../services/util.service.js";
import { useEffectUpdate } from "./customHooks/useEffectUpdate.js";

export function ToyFilter({ filterBy, onSetFilter }) {
  const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy });
  onSetFilter = useRef(utilService.debounce(onSetFilter));

  useEffectUpdate(() => {
    onSetFilter.current(filterByToEdit);
  }, [filterByToEdit]);

  function handleChange({ target }) {
    let { value, name: field, type } = target;
    value = type === "number" ? +value : value;
    setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }));
  }

  return (
    <section className="toy-filter full main-layout">
      <h2>Toys Filter</h2>
      <form>
        <label htmlFor="txt">Toy name:</label>
        <input
          type="text"
          id="txt"
          name="txt"
          placeholder="By toy name"
          value={filterByToEdit.txt}
          onChange={handleChange}
        />

        <label htmlFor="maxPrice">Max price:</label>
        <input
          type="number"
          id="maxPrice"
          name="maxPrice"
          placeholder="By max price"
          value={filterByToEdit.maxPrice || ""}
          onChange={handleChange}
        />

        <label htmlFor="inStock"></label>
        <select
          id="inStock"
          name="inStock"
          value={filterByToEdit.inStock}
          onChange={handleChange}
        >
          <option value="All">All</option>
          <option value="In stock">In stock</option>
          <option value="Out of stock">Out of stock</option>
        </select>
      </form>
    </section>
  );
}
