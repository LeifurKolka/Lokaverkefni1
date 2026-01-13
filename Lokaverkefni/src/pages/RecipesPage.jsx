import { useEffect, useMemo, useState } from "react";
import { getCategories, getMealsByCategory } from "../api/mealdb";
import RecipeCard from "../components/RecipeCard";

const PAGE_SIZE = 10;

export default function RecipesPage() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Seafood");

  const [meals, setMeals] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const [page, setPage] = useState(1);

  async function loadPageData(category) {
    try {
      setErrorMessage("");
      setIsLoading(true);

      const [cats, mealsInCategory] = await Promise.all([
        categories.length === 0 ? getCategories() : Promise.resolve(categories),
        getMealsByCategory(category),
      ]);

      if (categories.length === 0) setCategories(cats);

      setMeals(mealsInCategory);
      setPage(1);
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "Eitthvað fór úrskeiðis");
      setMeals([]);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadPageData(selectedCategory);
  }, []);

  useEffect(() => {
    loadPageData(selectedCategory);
  }, [selectedCategory]);

  const totalPages = Math.max(1, Math.ceil(meals.length / PAGE_SIZE));

  const visibleMeals = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return meals.slice(start, start + PAGE_SIZE);
  }, [meals, page]);

  function goPrev() {
    setPage((p) => Math.max(1, p - 1));
  }

  function goNext() {
    setPage((p) => Math.min(totalPages, p + 1));
  }

  return (
    <div>
      <h1>Uppskriftir</h1>

      <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
        <label htmlFor="category">
          <strong>Flokkar:</strong>
        </label>

        <select
          id="category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{ padding: 8, borderRadius: 8 }}
        >
          {categories.length === 0 ? (
            <option value={selectedCategory}>{selectedCategory}</option>
          ) : (
            categories.map((c) => (
              <option key={c.idCategory} value={c.strCategory}>
                {c.strCategory}
              </option>
            ))
          )}
        </select>

        <span style={{ color: "#555" }}>
          Showing {meals.length} recipe{meals.length === 1 ? "" : "s"}
        </span>
      </div>

      {isLoading && <p style={{ marginTop: 16 }}>Hleður uppskriftir…</p>}

      {!isLoading && errorMessage && (
        <div style={{ border: "1px solid #f2c2c2", padding: 12, borderRadius: 12, marginTop: 16 }}>
          <p style={{ marginTop: 0 }}>Gat ekki hlaðið uppskriftir: {errorMessage}</p>
          <button onClick={() => loadPageData(selectedCategory)}>Reyndu aftur</button>
        </div>
      )}

      {!isLoading && !errorMessage && meals.length === 0 && (
        <p style={{ marginTop: 16 }}>Engar uppskriftir fundust fyrir þennan flokk.</p>
      )}

      {!isLoading && !errorMessage && meals.length > 0 && (
        <>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: 16,
              marginTop: 16,
            }}
          >
            {visibleMeals.map((m) => (
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

          <div style={{ display: "flex", gap: 12, alignItems: "center", marginTop: 20 }}>
            <button onClick={goPrev} disabled={page === 1}>
              Til baka
            </button>
            <span>
              Síða {page} / {totalPages}
            </span>
            <button onClick={goNext} disabled={page === totalPages}>
              Næsta
            </button>
          </div>
        </>
      )}
    </div>
  );
}
