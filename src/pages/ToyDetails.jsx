import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toyService } from "../services/toy.service";
import { userService } from "../services/user.service";
export function ToyDetails() {
  const navigate = useNavigate();
  const [toy, setToy] = useState(null);
  const { toyId } = useParams();
  useEffect(() => {
    console.log(userService.getLoggedinUser());
    loadToy();
  }, [toyId]);

  function loadToy() {
    toyService
      .getById(toyId)
      .then((toy) => setToy(toy))
      .catch((err) => {
        console.log("Had issues in toy details", err);
        showErrorMsg("Cannot load toy");
        navigate("/");
      });
  }

  if (!toy) return <div>Loading...</div>;
  return (
    <section className="toy-details-container">
      {userService.isAdmin() && <button>Delete</button>}
      {userService.isAdmin() && <button>Edit</button>}
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
    </section>
  );
}
