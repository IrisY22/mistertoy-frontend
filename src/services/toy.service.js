import Axios from "axios";
import { utilService } from "./util.service.js";
import { httpService } from "./http.service.js";
import { storageService } from "./async-storage.service.js";

// for cookies
const axios = Axios.create({
  withCredentials: true,
});

const BASE_URL = "toy/";
const TOYS_KEY = "toysDB";

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

const labels = [
  "All",
  "On wheels",
  "Box game",
  "Art",
  "Baby",
  "Doll",
  "Puzzle",
  "Outdoor",
  "Battery Powered",
  "Anime",
  "Animals",
];

function getLabels() {
  return [...labels];
}

function getDefaultFilter() {
  return { txt: "", maxPrice: "", inStock: "All", sortBy: "name" };
}

// async function query(
//   filterBy = { txt: "", isDone: "all", pageIdx: 0, sortBy: "txt" }
// ) {
//   const toys = await storageService.query(TOYS_KEY);
//   return toys;
// }

// function query(filterBy) {
//   const { sortBy } = filterBy;
//   return storageService.query(TOYS_KEY).then((toys) => {
//     if (filterBy.txt) {
//       const regex = new RegExp(filterBy.txt, "i");
//       toys = toys.filter((toy) => regex.test(toy.name));
//     }
//     if (filterBy.maxPrice) {
//       toys = toys.filter((toy) => toy.price <= filterBy.maxPrice);
//     }
//     if (filterBy.inStock !== "All") {
//       toys = toys.filter((toy) =>
//         filterBy.inStock === "In stock" ? toy.inStock : !toy.inStock
//       );
//     }

//     return _getSortedToys(sortBy, toys);
//   });
// }

// function _getSortedToys(sortBy, toys) {
//   let sortedToys;
//   if (sortBy === "txt") {
//     sortedToys = toys.sort((a, b) => {
//       const toyA = a.txt.toUpperCase();
//       const toyB = b.txt.toUpperCase();
//       if (toyA < toyB) {
//         return -1;
//       }
//       if (toyA > toyB) {
//         return 1;
//       }
//       return 0;
//     });
//   } else {
//     sortedToys = toys.sort((a, b) => a.createdAt - b.createdAt);
//   }
//   return sortedToys;
// }

// function getById(id) {
//   return storageService.get(TOYS_KEY, id);
// }

// async function save(toy) {
//   if (toy._id) {
//     const savedToy = await storageService.put(TOYS_KEY, toy);
//     return savedToy;
//   } else {
//     toy.createdAt = Date.now();
//     const savedToy_1 = await storageService.post(TOYS_KEY, toy);
//     return savedToy_1;
//   }
// }

// async function remove(toyId) {
//   await storageService.remove(TOYS_KEY, toyId);
//   return toyId;
// }