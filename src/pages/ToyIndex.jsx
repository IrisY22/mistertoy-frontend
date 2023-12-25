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

export function ToyIndex() {
  const dispatch = useDispatch();
  const toys = useSelector((storeState) => storeState.toyModule.toys);

  useEffect(() => {
    loadToys().catch(() => {
      showErrorMsg("Cannot load toys!");
    });
  }, []);
  return (
    <>
      <h1>Welcome To Mister Toy!</h1>
      <ToyList toys={toys} />
    </>
  );
}
