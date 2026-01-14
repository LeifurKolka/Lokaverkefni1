import { useEffect, useMemo, useState } from "react";
import { getCategories, getMealsByCategory, searchMeals } from "../api/mealdb";
import RecipeCard from "../components/RecipeCard";

const PAGE_SIZE = 10;

export default function RecipesPage() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Seafood");

  const [meals, setMeals] = useState([]);

  const [searchInput, setSearchInput] = useState("");
  const [activeQuery, setActiveQuery] = useState(""); 

  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const [page, setPage] = useState(1);

  const isSearchMode = activeQuery.trim().length > 0;

  async function loadCategoriesIfNeeded() {
    if (categories.length > 0) return categories;
    const cats = await getCategories();
    setCategories(cats);
    return cats;
  }

  async function loadMealsForCategory(category) {
    try {
      setErrorMessage("");
      setIsLoading(true);

      await loadCategoriesIfNeeded();
      const mealsInCategory = await getMealsByCategory(category);

      setMeals(mealsInCategory);
      setPage(1);
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "Eitthvað fór úrskeiðis");
      setMeals([]);
    } finally {
      setIsLoading(false);
    }
  }

  async function runSearch(query) {
    try {
      setErrorMessage("");
      setIsLoading(true);

      await loadCategoriesIfNeeded();
      const results = await searchMeals(query);

      setMeals(results);
      setPage(1);
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "Eitthvað fór úrskeiðis");
      setMeals([]);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadMealsForCategory(selectedCategory);
  }, []);

  useEffect(() => {
    if (isSearchMode) return;
    loadMealsForCategory(selectedCategory);
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

  function handleSubmit(e) {
    e.preventDefault();
    const q = searchInput.trim();
    setActiveQuery(q);

    if (q) {
      runSearch(q);
    } else {
      setActiveQuery("");
      loadMealsForCategory(selectedCategory);
    }
  }

  function clearSearch() {
    setSearchInput("");
    setActiveQuery("");
    loadMealsForCategory(selectedCategory);
  }

  function retry() {
    if (isSearchMode) {
      runSearch(activeQuery);
    } else {
      loadMealsForCategory(selectedCategory);
    }
  }

  return (
    <div>
      <h1>Uppskriftir</h1>

      <form onSubmit={handleSubmit} style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
        <input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Leitaðu af uppskriftum (t.d. pasta, chicken)…"
          style={{ padding: 10, borderRadius: 10, border: "1px solid #ddd", minWidth: 260 }}
        />
        <button type="submit">Leita</button>
        {isSearchMode && (
          <button type="button" onClick={clearSearch}>
            Hreinsa
          </button>
        )}
      </form>

      <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
        <label htmlFor="category">
          <strong>Flokkur:</strong>
        </label>

        <select
          id="category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          disabled={isSearchMode}
          style={{ padding: 8, borderRadius: 8 }}
          title={isSearchMode ? "Hreinsaðu leitina til að nota flokka" : ""}
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
          {isSearchMode ? (
            <>
              Leit: <strong>{activeQuery}</strong> — {meals.length} niðurstöð{meals.length === 1 ? "" : "ur"}
            </>
          ) : (
            <>
              {meals.length} uppskrift{meals.length === 1 ? "" : "ir"} í <strong>{selectedCategory}</strong>
            </>
          )}
        </span>
      </div>

      {isLoading && <p style={{ marginTop: 16 }}>Hleður…</p>}

      {!isLoading && errorMessage && (
        <div style={{ border: "1px solid #f2c2c2", padding: 12, borderRadius: 12, marginTop: 16 }}>
          <p style={{ marginTop: 0 }}>Gat ekki hlaðið uppskriftum: {errorMessage}</p>
          <button onClick={retry}>Reyna aftur</button>
        </div>
      )}

      {!isLoading && !errorMessage && meals.length === 0 && (
        <div style={{ marginTop: 16 }}>
          <p>
            {isSearchMode
              ? "Engar uppskriftir fundust, reyndu aftur."
              : "Engar uppskriftir fundust fyrir þennan flokk."}
          </p>
          {isSearchMode && <button onClick={clearSearch}>Hreinsa leit</button>}
        </div>
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

