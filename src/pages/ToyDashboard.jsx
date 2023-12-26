import { Bar, Pie } from "react-chartjs-2";
import { Chart as Chartjs } from "chart.js/auto";
import { toyService } from "../services/toy.service.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { loadToys } from "../store/actions/toyActions.js";

export function ToyDashboard() {
  const navigate = useNavigate();
  const toys = useSelector((storeState) => storeState.toyModule.toys);
  const chartMap = new Map();
  const labels = toyService.getLabels();
  labels.forEach((label) => chartMap.set(label, 0));
  const [currChar, setCurrChar] = useState(showByPrice());

  useEffect(() => {
    if (!toys || toys.length === 0) {
      loadToys();
    } else {
      setCurrChar(showByPrice());
    }
  }, [toys]);

  function showByPrice() {
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
    return {
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
  }

  function showByPercentage() {
    let dataArr = [];

    labels.forEach((label) => {
      dataArr.push(percentageByLabel(label));
    });

    return {
      labels: labels,
      datasets: [
        {
          label: "Popularity",
          data: dataArr,
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
  }

  function percentageByLabel(label) {
    var totalCounter = 0;
    var inStockCounter = 0;

    toys.map((toy) => {
      if (toy.labels.includes(label)) {
        totalCounter++;
        if (toy.inStock) {
          inStockCounter++;
        }
      }
    });

    return 100 * (inStockCounter / totalCounter);
  }

  if (!toys || toys.length === 0) {
    return <h3>loading...</h3>;
  }

  return (
    <>
      <div className="header">
        <button onClick={() => navigate(`/`)}>Back</button>
        <button onClick={() => setCurrChar(showByPercentage())}>
          Show by percentage
        </button>
        <button onClick={() => setCurrChar(showByPrice())}>
          Show by price
        </button>
      </div>
      <div className="chart-container">
        <Pie data={currChar} />
        <Bar data={currChar} />
      </div>
    </>
  );
}
