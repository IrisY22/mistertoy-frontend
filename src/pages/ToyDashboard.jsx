import { Bar, Pie } from "react-chartjs-2";
import { Chart as Chartjs } from "chart.js/auto";
import { toyService } from "../services/toy.service.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { loadToys } from "../store/actions/toyActions.js";

export function ToyDashboard() {
  const navigate = useNavigate();
  const toys = useSelector((storeState) => storeState.toyModule.toys);
  const chartMap = new Map();
  const labels = toyService.getLabels();
  labels.forEach((label) => chartMap.set(label, 0));

  useEffect(() => {
    if (!toys || toys.length === 0) {
      loadToys();
    }
  }, []);

  toys.map((toy) =>
    toy.labels.forEach((label) => updateLabel(label, toy.price))
  );

  function updateLabel(label, price) {
    const currentPrice = chartMap.get(label);
    chartMap.set(label, price + currentPrice);
  }
  const priceArr = [];
  chartMap.forEach((value, key) => {
    priceArr.push(value);
  });

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Price",
        data: priceArr,
        backgroundColor: [
          " #ff1a1a",
          " #ff4dff",
          " #4dd2ff",
          " #33ff77",
          " #ffff33",
          " #d2a679",
          " #4d4dff",
          " #ffa64d",
          " #a3a3c2 ",
          " #ff99ff ",
        ],
        borderColor: " #29293d",
        borderWidth: 1,
      },
    ],
  };
  return (
    <div>
      <button onClick={() => navigate(`/`)}>Back</button>
      <Pie data={data} />
    </div>
  );
}
