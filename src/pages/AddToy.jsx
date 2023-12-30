import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toyService } from "../services/toy.service";
import { ToySort } from "../cmps/ToySort";

export function AddToy() {
  const { toyId } = useParams();
  const [toy, setToy] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadToy();
  }, [toyId]);

  async function loadToy() {
    try {
      if (!toyId) {
        setToy(toyService.getEmptyToy());
      } else {
        const currToy = await toyService.getById(toyId);
        setToy(currToy);
      }
    } catch (err) {
      console.log("Had issues in toy details", err);
      showErrorMsg("Cannot load toy");
      navigate("/");
    }
  }

  function handleChange({ target }) {
    let { value, name: field, type } = target;
    value = type === "number" ? +value : value;
    if (type === "select-multiple")
      value = Array.from(target.selectedOptions, (option) => option.value);
    setToy((prevToy) => ({ ...prevToy, [field]: value }));
    console.log(toy);
  }

  function handleStockChange() {
    setToy((prevToy) => ({ ...prevToy, inStock: !prevToy.inStock }));
    console.log(toy.inStock);
  }

  async function saveToy() {
    try {
      await toyService.save(toy);
    } catch (err) {
      console.log("err: " + err);
    }
    navigate(`/`);
  }

  if (!toy) return <div>Loading...</div>;
  return (
    <>
      <button onClick={() => navigate(`/`)}>Back</button>
      <label htmlFor="name">Enter toy name: </label>
      <input
        type="text"
        id="name"
        name="name"
        value={toy.name}
        onChange={handleChange}
      />
      <label htmlFor="price">Enter toy price: </label>
      <input
        type="number"
        id="price"
        name="price"
        // placeholder="By max price"
        value={toy.price}
        onChange={handleChange}
      />
      <label htmlFor="inStock">In stock? </label>
      <input
        type="checkbox"
        id="inStock"
        name="inStock"
        checked={toy.inStock}
        onChange={handleStockChange}
      />
      <ToySort handleChange={handleChange} filterByToEdit={toy} />
      <button onClick={() => saveToy()}>Save toy</button>
    </>
  );
}
