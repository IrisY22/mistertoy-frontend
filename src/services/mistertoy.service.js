import Axios from "axios";
import { utilService } from "./util.service.js";
import { httpService } from "./http.service.js";

// for cookies
const axios = Axios.create({
  withCredentials: true,
});

const BASE_URL = "toy/";

export const toyService = {
  query,
  getById,
  save,
  remove,
  getEmptyToy,
  getDefaultFilter,
  getLabels,
};

function query(filterBy = {}) {
  return httpService.get(BASE_URL, filterBy);
}

function getById(toyId) {
  return httpService.get(BASE_URL + toyId);
}

function remove(toyId) {
  return httpService.delete(BASE_URL + toyId);
}

function save(toy) {
  if (toy._id) {
    return httpService.put(BASE_URL, toy);
  } else {
    return httpService.post(BASE_URL, toy);
  }
}

function getEmptyToy() {
  return {
    _id: null,
    name: "",
    price: utilService.getRandomIntInclusive(1, 300),
    labels: [],
    createdAt: Date.now(),
    inStock: true,
  };
}

function getLabels() {
  const labels = [
    "On wheels",
    "Box game",
    "Art",
    "Baby",
    "Doll",
    "Puzzle",
    "Outdoor",
    "Battery Powered",
  ];
  return labels;
}

function getDefaultFilter() {
  return { txt: "", maxPrice: "" };
}
