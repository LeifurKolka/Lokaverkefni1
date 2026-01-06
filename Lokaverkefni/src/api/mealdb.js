const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

async function requestJson(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Request failed (${response.status})`);
  }

  return response.json();
}

export async function getMealsByFirstLetter(letter = "a") {
  const data = await requestJson(`${BASE_URL}/search.php?f=${letter}`);
  return data.meals ?? [];
}

export async function getMealById(mealId) {
  const data = await requestJson(`${BASE_URL}/lookup.php?i=${mealId}`);
  return data.meals?.[0] ?? null;
}
