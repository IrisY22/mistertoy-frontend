import { useDispatch, useSelector } from "react-redux";
import { toyService } from "../services/toy.service";
import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js";
import {
  loadToys,
  removeToy,
  removeToyOptimistic,
  saveToy,
  setFilterBy,
} from "../store/actions/toyActions.js";
import { ADD_TOY_TO_CART } from "../store/reducers/toyReducer.js";
import { useEffect } from "react";
import { ToyList } from "../cmps/ToyList.jsx";
import { ToyFilter } from "../cmps/ToyFilter.jsx";
import { useNavigate } from "react-router-dom";
import { userService } from "../services/user.service.js";

export function ToyIndex() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toys = useSelector((storeState) => storeState.toyModule.toys);
  const filterBy = useSelector((storeState) => storeState.toyModule.filterBy);
  useEffect(() => {
    loadToys().catch(() => {
      showErrorMsg("Cannot load toys!");
    });
  }, [filterBy]);

  function onSetFilter(filterBy) {
    setFilterBy(filterBy);
  }
  return (
    <>
      <div
        className="main-layout"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {userService.isAdmin() && <button>Add toy</button>}
        <button onClick={() => navigate(`/toyDashboard`)}>Dashboard</button>
        <button onClick={() => navigate(`/userLogin`)}>Login</button>
      </div>
      <ToyFilter filterBy={filterBy} onSetFilter={onSetFilter} />
      <ToyList toys={toys} />
    </>
  );
}
