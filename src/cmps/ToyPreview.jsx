import { useNavigate } from "react-router-dom";
import { userService } from "../services/user.service";
import { toyService } from "../services/toy.service";
import { loadToys } from "../store/actions/toyActions";

export function ToyPreview({ toy }) {
  const navigate = useNavigate();

  async function onRemoveToy() {
    await toyService.remove(toy._id);
    navigate("/");
    await loadToys();
  }

  async function onEditToy() {
    navigate(`/AddToy/${toy._id}`);
  }

  return (
    <li className="toy-item">
      <div className="toy-preview">
        {userService.isAdmin() && (
          <button onClick={() => onRemoveToy()}>Delete</button>
        )}
        {userService.isAdmin() && (
          <button onClick={() => onEditToy()}>Edit</button>
        )}

        <h3 className="toy-name">{toy.name}</h3>
        <p className="toy-price">${toy.price.toFixed(2)}</p>
        <p className="toy-stock">{toy.inStock ? "In Stock" : "Out of Stock"}</p>
        <button onClick={() => navigate(`/toy/${toy._id}`)}>Details...</button>
      </div>
    </li>
  );
}
