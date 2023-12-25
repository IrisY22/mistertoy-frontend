import { useNavigate } from "react-router-dom";

export function ToyPreview({ toy }) {
  const navigate = useNavigate();
  return (
    <li className="toy-item">
      <div className="toy-preview">
        <h3 className="toy-name">{toy.name}</h3>
        <p className="toy-price">${toy.price.toFixed(2)}</p>
        <p className="toy-stock">{toy.inStock ? "In Stock" : "Out of Stock"}</p>
        <button onClick={() => navigate(`/toy/${toy._id}`)}>Details...</button>
      </div>
    </li>
  );
}
