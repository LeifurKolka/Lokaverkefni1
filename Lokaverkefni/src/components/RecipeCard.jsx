import { Link } from "react-router-dom";

export default function RecipeCard({ meal }) {
  return (
    <Link
      to={`/recipes/${meal.idMeal}`}
      style={{
        display: "block",
        textDecoration: "none",
        color: "inherit",
        border: "1px solid var(--color-border)",
        borderRadius: 12,
        overflow: "hidden",
        background: "#fff",
        transition: "transform 0.15s ease, box-shadow 0.15s ease",
      }}
      onMouseEnter={(e) => {
      e.currentTarget.style.transform = "translateY(-2px)";
      e.currentTarget.style.boxShadow = "0 6px 16px rgba(0,0,0,0.08)";
}}
      onMouseLeave={(e) => {
      e.currentTarget.style.transform = "none";
      e.currentTarget.style.boxShadow = "none";
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
         {"Smelltu til að sjá uppskrift"}
        </p>
      </div>
    </Link>
  );
}

