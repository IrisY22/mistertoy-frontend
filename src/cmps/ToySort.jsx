import React from "react";
import { toyService } from "../services/toy.service";

import { Select, MenuItem, FormControl, InputLabel } from "@material-ui/core";

export function ToySort({ handleChange, filterByToEdit }) {
  const toyLabel = toyService.getLabels();

  return (
    <div className="toy-sort-container">
      <FormControl variant="filled" className="filter-form-control">
        <InputLabel
          id="labels-select-label"
          style={{ color: "rgb(155, 155, 155)" }}
        >
          Labels
        </InputLabel>
        <Select
          style={{ backgroundColor: " #f2d9f2" }}
          labelId="labels-select-label"
          id="labels-select"
          onChange={handleChange}
          name="labels"
          multiple
          value={filterByToEdit.labels || []}
          className="filter-select"
        >
          {toyLabel.map((label) => (
            <MenuItem key={label} value={label} style={{ color: "#602060" }}>
              {label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
