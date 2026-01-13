import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getMealById, getMealsByCategory } from "../api/mealdb";
import RecipeCard from "../components/RecipeCard";

function extractIngredients(meal) {
  const items = [];

  for (let i = 1; i <= 20; i += 1) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];

    if (ingredient && ingredient.trim()) {
      const label = measure && measure.trim() ? `${measure.trim()} ${ingredient.trim()}` : ingredient.trim();
      items.push(label);
    }
  }

  return items;
}

export default function RecipeDetailsPage() {
  const { id } = useParams();

  const [meal, setMeal] = useState(null);
  const [similarMeals, setSimilarMeals] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  async function loadDetails(mealId) {
    try {
      setErrorMessage("");
      setIsLoading(true);

      const details = await getMealById(mealId);

      if (!details) {
        setMeal(null);
        setSimilarMeals([]);
        return;
      }

      setMeal(details);

      if (details.strCategory) {
        const results = await getMealsByCategory(details.strCategory);
        const filtered = results.filter((m) => m.idMeal !== details.idMeal).slice(0, 8);
        setSimilarMeals(filtered);
      } else {
        setSimilarMeals([]);
      }
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "Eitthvað fór úrskeiðis");
      setMeal(null);
      setSimilarMeals([]);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadDetails(id);
  }, [id]);

  if (isLoading) {
    return <p>Hleður uppskrift…</p>;
  }

  if (errorMessage) {
    return (
      <div style={{ border: "1px solid #f2c2c2", padding: 12, borderRadius: 12 }}>
        <p style={{ marginTop: 0 }}>Gat ekki náð í uppskrift: {errorMessage}</p>
        <button onClick={() => loadDetails(id)}>Reyndu aftur</button>
      </div>
    );
  }

  if (!meal) {
    return (
      <div>
        <h1>404</h1>
        <p>Uppskrift fannst ekki.</p>
        <Link to="/recipes">Til baka í uppskriftir</Link>
      </div>
    );
  }

  const ingredients = extractIngredients(meal);

  return (
    <div>
      <Link to="/recipes" style={{ textDecoration: "none" }}>
        ← Til baka í uppskriftir
      </Link>

      <h1 style={{ marginTop: 12 }}>{meal.strMeal}</h1>

      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        style={{ width: "100%", maxWidth: 800, borderRadius: 12, display: "block" }}
      />

      <div style={{ marginTop: 16, display: "grid", gap: 16, gridTemplateColumns: "1fr" }}>
        <section style={{ border: "1px solid #eee", borderRadius: 12, padding: 12 }}>
          <h2 style={{ marginTop: 0 }}>Hráefni</h2>
          {ingredients.length === 0 ? (
            <p>Engin hráefni listuð.</p>
          ) : (
            <ul>
              {ingredients.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
        </section>

        <section style={{ border: "1px solid #eee", borderRadius: 12, padding: 12 }}>
          <h2 style={{ marginTop: 0 }}>Leiðbeiningar</h2>
          <p style={{ whiteSpace: "pre-line" }}>{meal.strInstructions}</p>
        </section>

        {meal.strYoutube && (
          <section style={{ border: "1px solid #eee", borderRadius: 12, padding: 12 }}>
            <h2 style={{ marginTop: 0 }}>Myndband</h2>
            <a href={meal.strYoutube} target="_blank" rel="noreferrer">
              horfðu á Youtube
            </a>
          </section>
        )}
      </div>

      <section style={{ marginTop: 24 }}>
        <h2>Svipaðar uppskriftir</h2>

        {similarMeals.length === 0 ? (
          <p>Engar svipaðar uppskriftir fundust.</p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: 16,
              marginTop: 16,
            }}
          >
            {similarMeals.map((m) => (
              <RecipeCard
                key={m.idMeal}
                meal={{
                  idMeal: m.idMeal,
                  strMeal: m.strMeal,
                  strMealThumb: m.strMealThumb,
                }}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

