/** Start */
function init() {}

/** Startet die App: zeigt alle Kategorien mit ihren Gerichten. */
function init() {
    renderCategories();
}

/** Rendert alle Kategorien mit ihren Gerichten. */
function renderCategories() {
    const CONTENT_REF = document.getElementById("meal_content");
    CONTENT_REF.innerHTML = "";

    for (let index = 0; index < categories.length; index++) {
        CONTENT_REF.innerHTML += getCategoryTemplate(index);
        renderMeals(categories[index].id);
    }
}

/** Rendert die Gerichte einer Kategorie. */
function renderMeals(categoryId) {
    const MEALS_REF = document.getElementById(`meals_${categoryId}`);
    MEALS_REF.innerHTML = "";

    for (let indexMeal = 0; indexMeal < meals.length; indexMeal++) {
        if (meals[indexMeal].category === categoryId) {
            MEALS_REF.innerHTML += getMealTemplate(indexMeal);
        }
    }
}

/** Gibt einen Preis mit zwei Nachkommastellen, Komma und Euro zurück. */
function formatPrice(price) {
    return price.toFixed(2).replace(".", ",") + " €";
}
