import { toyService } from "../../services/toy.service.js";
import {
  ADD_TOY,
  TOY_UNDO,
  REMOVE_TOY,
  SET_TOYS,
  SET_FILTER_BY,
  SET_IS_LOADING,
  UPDATE_TOY,
} from "../reducers/toyReducer.js";
import { store } from "../store.js";

export async function loadToys() {
  store.dispatch({ type: SET_IS_LOADING, isLoading: true });
  const filterBy = store.getState().toyModule.filterBy;

  try {
    const toys = await toyService.query(filterBy);
    store.dispatch({ type: SET_TOYS, toys });
  } catch (err) {
    console.log("toy action -> Cannot load toys", err);
    throw err;
  } finally {
    store.dispatch({ type: SET_IS_LOADING, isLoading: false });
  }

  // toyService
  //   .query(filterBy)
  //   .then((toys) => {
  //     store.dispatch({ type: SET_TOYS, toys });
  //   })
  // .catch((err) => {
  //   console.log("toy action -> Cannot load toys", err);
  //   throw err;
  // })
  // .finally(() => {
  //   store.dispatch({ type: SET_IS_LOADING, isLoading: false });
  // });
}

export async function removeToyOptimistic(toyId) {
  store.dispatch({ type: REMOVE_TOY, toyId });
  store.dispatch({ type: SET_IS_LOADING, isLoading: true });

  try {
    return await toyService.remove(toyId);
  } catch (err) {
    store.dispatch({ type: TOY_UNDO });
    console.log("toy action -> Cannot remove toy", err);
    throw err;
  } finally {
    store.dispatch({ type: SET_IS_LOADING, isLoading: false });
  }

  // return toyService
  //   .remove(toyId)
  //   .catch((err) => {
  //     store.dispatch({ type: TOY_UNDO });
  //     console.log("toy action -> Cannot remove toy", err);
  //     throw err;
  //   })
  //   .finally(() => {
  //     store.dispatch({ type: SET_IS_LOADING, isLoading: false });
  //   });
}

export async function removeToy(toyId) {
  store.dispatch({ type: SET_IS_LOADING, isLoading: true });

  try {
    await toyService.remove(toyId);
    store.dispatch({ type: REMOVE_TOY, toyId });
  } catch (err) {
    console.log("toy action -> Cannot remove toy", err);
    throw err;
  } finally {
    store.dispatch({ type: SET_IS_LOADING, isLoading: false });
  }

  // return toyService
  //   .remove(toyId)
  //   .then(() => {
  //     store.dispatch({ type: REMOVE_TOY, toyId });
  //   })
  //   .catch((err) => {
  //     console.log("toy action -> Cannot remove toy", err);
  //     throw err;
  //   })
  //   .finally(() => {
  //     store.dispatch({ type: SET_IS_LOADING, isLoading: false });
  //   });
}

export async function saveToy(toy) {
  const type = toy._id ? UPDATE_TOY : ADD_TOY;
  try {
    const toyToSave = await toyService.save(toy);
    store.dispatch({ type, toy: toyToSave });
    return toyToSave;
  } catch (err) {
    console.log("toy action -> Cannot save toy", err);
    throw err;
  }

  // return toyService
  //   .save(toy)
  //   .then((toyToSave) => {
  //     store.dispatch({ type, toy: toyToSave });
  //     return toyToSave;
  //   })
  //   .catch((err) => {
  //     console.log("toy action -> Cannot save toy", err);
  //     throw err;
  //   });
}

export function setFilterBy(filterBy) {
  store.dispatch({ type: SET_FILTER_BY, filterBy });
}
