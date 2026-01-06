import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div>
      <h1>404</h1>
      <p>Sorry, this page doesn’t exist.</p>
      <Link to="/">Go home</Link>
    </div>
  );
}
