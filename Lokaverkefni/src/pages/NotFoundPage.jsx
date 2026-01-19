import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div>
      <h1>404</h1>
      <p>Þessi síða er ekki til.</p>
      <Link to="/">Heim</Link>
    </div>
  );
}
