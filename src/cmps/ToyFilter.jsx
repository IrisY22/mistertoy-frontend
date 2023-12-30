import { useRef, useState } from "react";
import { utilService } from "../services/util.service.js";
import { useEffectUpdate } from "./customHooks/useEffectUpdate.js";
import { toyService } from "../services/toy.service.js";
import { ToySort } from "./ToySort.jsx";

export function ToyFilter({ filterBy, onSetFilter }) {
  const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy });
  onSetFilter = useRef(utilService.debounce(onSetFilter));

  useEffectUpdate(() => {
    onSetFilter.current(filterByToEdit);
  }, [filterByToEdit]);

  function handleChange({ target }) {
    let { value, name: field, type } = target;
    value = type === "number" ? +value : value;
    if (type === "select-multiple")
      value = Array.from(target.selectedOptions, (option) => option.value);
    setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }));
  }

  return (
    <section className="toy-filter full main-layout">
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

        <ToySort handleChange={handleChange} filterByToEdit={filterByToEdit} />

        <label htmlFor="inStock">In Stock:</label>
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

        <label htmlFor="sortBy">Sort By:</label>
        <select
          id="sortBy"
          name="sortBy"
          value={filterByToEdit.sortBy}
          onChange={handleChange}
        >
          <option value="name">Name</option>
          <option value="price">Price</option>
          <option value="createdAt">Created</option>
        </select>

        {/* <button type="submit">Apply Filters</button> */}
      </form>
    </section>
  );
}
