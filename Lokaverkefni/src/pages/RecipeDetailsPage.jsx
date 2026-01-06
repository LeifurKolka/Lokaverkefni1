import { useParams } from "react-router-dom";

export default function RecipeDetailsPage() {
  const { id } = useParams();

  return (
    <div>
      <h1>Recipe Details</h1>
      <p>Recipe ID: {id}</p>
    </div>
  );
}
