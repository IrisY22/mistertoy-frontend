import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toyService } from "../services/toy.service";
import { userService } from "../services/user.service";
import { ToyReviews } from "../cmps/ToyReviews";
export function ToyDetails() {
  const navigate = useNavigate();
  const [toy, setToy] = useState(null);
  const { toyId } = useParams();
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    loadToy();
  }, [toyId]);

  async function loadToy() {
    try {
      const currToy = await toyService.getById(toyId);
      setToy(currToy);
      setMsg(currToy.msg);
      console.log(currToy);
    } catch (err) {
      console.log("Had issues in toy details", err);
      showErrorMsg("Cannot load toy");
      navigate("/");
    }
  }

  async function onRemoveToy() {
    await toyService.remove(toyId);
    navigate("/");
  }

  async function onEditToy() {
    navigate(`/AddToy/${toyId}`);
  }

  async function addReview() {
    const txt = prompt("Enter your toy review (:");
    const msg = {
      txt,
    };

    try {
      await toyService.saveMsg(toy._id, msg);
      loadToy();
    } catch (err) {
      console.log("err: " + err);
    }
  }

  if (!toy)
    return (
      <>
        <button onClick={() => navigate(`/`)}>Back</button>
        <div>Loading...</div>
      </>
    );
  return (
    <section className="toy-details-container">
      {userService.isAdmin() && (
        <button onClick={() => onRemoveToy()}>Delete</button>
      )}
      {userService.isAdmin() && (
        <button onClick={() => onEditToy()}>Edit</button>
      )}
      <h1 className="toy-name">{toy.name}</h1>
      <h5 className="toy-price">${toy.price.toFixed(2)}</h5>
      <p className="toy-description">
        {toy.labels.map((label) => label + " ")}
      </p>
      <p className="toy-long-description">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi voluptas
        cumque tempore, explicabo veritatis corrupti perspiciatis repellat, enim
        quibusdam!
      </p>

      <button onClick={() => navigate(`/`)}>Back</button>
      {!userService.isAdmin() && (
        <button onClick={() => addReview()}>Add review</button>
      )}
      <h3>Toy Reviews: </h3>
      <ToyReviews msgs={msg} />
    </section>
  );
}
