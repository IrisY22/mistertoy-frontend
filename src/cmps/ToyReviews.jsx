export function ToyReviews({ msgs }) {
  var i = 1;
  console.log(msgs);
  return (
    <ul>
      {msgs.map((msg) => {
        return (
          <li key={i++}>
            <h5>User: {msg.by.fullname}</h5>
            <h4>Review: {msg.txt}</h4>
          </li>
        );
      })}
    </ul>
  );
}
