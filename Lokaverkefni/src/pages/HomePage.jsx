import { useEffect, useState } from "react";
import { getMealsByFirstLetter } from "../api/mealdb";
import RecipeCard from "../components/RecipeCard";

export default function HomePage() {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  async function loadFeatured() {
    try {
      setErrorMessage("");
      setIsLoading(true);

      const results = await getMealsByFirstLetter("a");
      setMeals(results);
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "Villa kom upp");
      setMeals([]);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadFeatured();
  }, []);

  return (
    <div>
      <h1>Heim</h1>
      <p>"Featured" uppskriftir (letter “a”)</p>

      {isLoading && <p>Hleður uppskriftum…</p>}

      {!isLoading && errorMessage && (
        <div style={{ border: "1px solid #f2c2c2", padding: 12, borderRadius: 12 }}>
          <p style={{ marginTop: 0 }}>Gat ekki sótt uppskriftir: {errorMessage}</p>
          <button onClick={loadFeatured}>Retry</button>
        </div>
      )}

      {!isLoading && !errorMessage && meals.length === 0 && (
        <p>Engar uppskriftir fundust. Prófaðu aftur síðar.</p>
      )}

      {!isLoading && !errorMessage && meals.length > 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: 16,
            marginTop: 16,
          }}
        >
          {meals.slice(0, 12).map((meal) => (
            <RecipeCard key={meal.idMeal} meal={meal} />
          ))}
        </div>
      )}
    </div>
  );
}
