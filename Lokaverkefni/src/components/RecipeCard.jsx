import { Link } from "react-router-dom";

export default function RecipeCard({ meal }) {
  return (
    <Link
      to={`/recipes/${meal.idMeal}`}
      style={{
        display: "block",
        textDecoration: "none",
        color: "inherit",
        border: "1px solid #eee",
        borderRadius: 12,
        overflow: "hidden",
      }}
    >
      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        style={{
          width: "100%",
          height: 180,
          objectFit: "cover",
          display: "block",
        }}
        loading="lazy"
      />
      <div style={{ padding: 12 }}>
        <h3 style={{ margin: "0 0 6px 0" }}>{meal.strMeal}</h3>
        <p style={{ margin: 0, color: "#555", fontSize: 14 }}>
         {"Click to view recipe"}
        </p>
      </div>
    </Link>
  );
}

