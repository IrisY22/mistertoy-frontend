import { ToyPreview } from "./ToyPreview";

export function ToyList({ toys }) {
  return (
    <ul>
      {toys.map((toy) => (
        <ToyPreview toy={toy} key={toy._id} />
      ))}
    </ul>
  );
}
