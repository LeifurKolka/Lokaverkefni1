Höfundur: Leifur Kolka Haraldsson
Fyrsta önn í forritun H25-FK1 NTV - Lokaverkefni: Uppskriftarsíða

Þetta verkefni er uppskriftarsíða sem ég bjó til með React og Vite. Forritið leyfir notandanum að leita og sía uppskriftir frá TheMealDB.

Virkni:
Heimasíða með "featured" uppskriftum
Síða sem sýnir allar uppskriftirnar
Síða með upplýsingum um valda uppskrift
Notandi getur leitað og síað uppskriftir eftir flokkum
404 síða fyrir rangar slóðir og villur

Viðbótakrafa:
Notandi getur leitað upp sérstaka uppskrift sem hann hefur í huga

Síðu yfirlit:
HomePage.jsx: Heimasíðan, sýnir featured uppskriftirnar (byrja á stafnum A í þessu tilviki)
NotFoundPage.jsx: Villusíða, ef notandi skrifar ranga slóð
RecipeDetailsPage.jsx: Sýnir upplýsingar um uppskriftirnar
RecipesPage.jsx: Sýnir allar uppskriftirnar eftir flokkum

API listar notaðir:
Valdar uppskriftir: https://www.themealdb.com/api/json/v1/1/search.php?f=a
Uppskrift eftir ID: https://www.themealdb.com/api/json/v1/1/lookup.php?i={mealId}
Flokkar: https://www.themealdb.com/api/json/v1/1/categories.php
Uppskriftir eftir flokki: https://www.themealdb.com/api/json/v1/1/filter.php?c={category}
Leit af uppskriftum: https://www.themealdb.com/api/json/v1/1/search.php?s={query}