const BASKET_IDS = ["basket_desktop"];

/** Startet die App: zeigt Kategorien, Gerichte und den Warenkorb. */
function init() {
    renderCategoryLinks();
    renderCategories();
    renderBaskets();
}

/** Rendert die Links zu allen Kategorien. */
function renderCategoryLinks() {
    const LINKS_REF = document.getElementById("category_links");
    LINKS_REF.innerHTML = "";

    for (let index = 0; index < categories.length; index++) {
        LINKS_REF.innerHTML += getCategoryLinkTemplate(index);
    }
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

/** Rendert das Grundgerüst jedes Warenkorbs und füllt es. */
function renderBaskets() {
    for (let index = 0; index < BASKET_IDS.length; index++) {
        const BASKET_REF = document.getElementById(BASKET_IDS[index]);
        BASKET_REF.innerHTML = getBasketTemplate(BASKET_IDS[index]);
    }

    updateBaskets();
}

/** Aktualisiert den Inhalt jedes Warenkorbs. */
function updateBaskets() {
    for (let index = 0; index < BASKET_IDS.length; index++) {
        toggleEmptyBasket(BASKET_IDS[index]);
    }
}

/** Zeigt den leeren oder den gefüllten Warenkorb an. */
function toggleEmptyBasket(basketId) {
    const BASKET_REF = document.getElementById(basketId);

    if (getTotalAmount() === 0) {
        BASKET_REF.classList.add("is_empty");
    } else {
        BASKET_REF.classList.remove("is_empty");
    }
}

/** Gibt die Anzahl aller Gerichte im Warenkorb zurück. */
function getTotalAmount() {
    let totalAmount = 0;

    for (let indexMeal = 0; indexMeal < meals.length; indexMeal++) {
        totalAmount += meals[indexMeal].amount;
    }

    return totalAmount;
}

/** Gibt einen Preis mit zwei Nachkommastellen, Komma und Euro zurück. */
function formatPrice(price) {
    return price.toFixed(2).replace(".", ",") + " €";
}
