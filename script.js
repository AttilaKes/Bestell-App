const DELIVERY_FEE = 4.99;
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
        renderBasketItems(BASKET_IDS[index]);
        renderBasketSums(BASKET_IDS[index]);
        toggleEmptyBasket(BASKET_IDS[index]);
    }
}

/** Rendert alle Gerichte, die mindestens einmal im Warenkorb liegen. */
function renderBasketItems(basketId) {
    const ITEMS_REF = document.getElementById(`${basketId}_items`);
    let itemsHTML = "";

    for (let indexMeal = 0; indexMeal < meals.length; indexMeal++) {
        if (meals[indexMeal].amount > 0) {
            itemsHTML += getBasketItemTemplate(indexMeal, basketId);
        }
    }

    ITEMS_REF.innerHTML = itemsHTML;
}

/** Rendert die Summen eines Warenkorbs. */
function renderBasketSums(basketId) {
    const SUMS_REF = document.getElementById(`${basketId}_sums`);
    let subtotal = getSubtotal();
    let total = subtotal + DELIVERY_FEE;

    SUMS_REF.innerHTML = getBasketSumsTemplate(subtotal, total);
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

/** Legt ein Gericht in den Warenkorb. */
function addToBasket(indexMeal) {
    meals[indexMeal].amount++;
    updateMeal(indexMeal);
}

/** Erhöht die Anzahl eines Gerichts im Warenkorb. */
function increaseAmount(indexMeal, basketId) {
    addToBasket(indexMeal);
    document.getElementById(`${basketId}_increase_${indexMeal}`).focus();
}

/** Verringert die Anzahl. Ist das Minus danach ausgeblendet, bleibt der Fokus beim Plus. */
function decreaseAmount(indexMeal, basketId) {
    meals[indexMeal].amount--;
    updateMeal(indexMeal);
    document.getElementById(`${basketId}_increase_${indexMeal}`).focus();
    document.getElementById(`${basketId}_decrease_${indexMeal}`).focus();
}

/** Entfernt ein Gericht komplett aus dem Warenkorb. */
function removeFromBasket(indexMeal) {
    meals[indexMeal].amount = 0;
    updateMeal(indexMeal);
}

/** Aktualisiert alles, was von der Anzahl eines Gerichts abhängt. */
function updateMeal(indexMeal) {
    updateMealButton(indexMeal);
    updateBaskets();
}

/** Zeigt am Gericht an, wie oft es im Warenkorb liegt. */
function updateMealButton(indexMeal) {
    const BUTTON_REF = document.getElementById(`meal_button_${indexMeal}`);

    if (meals[indexMeal].amount > 0) {
        BUTTON_REF.innerText = `Hinzugefügt: ${meals[indexMeal].amount}`;
        BUTTON_REF.classList.add("added");
    } else {
        BUTTON_REF.innerText = "In den Warenkorb";
        BUTTON_REF.classList.remove("added");
    }
}

/** Gibt "d_none" zurück, wenn das Gericht nur einmal im Warenkorb liegt. */
function hideIfSingle(indexMeal) {
    if (meals[indexMeal].amount === 1) {
        return "d_none";
    } else {
        return "";
    }
}

/** Gibt "d_none" zurück, wenn das Gericht mehrmals im Warenkorb liegt. */
function hideIfMultiple(indexMeal) {
    if (meals[indexMeal].amount > 1) {
        return "d_none";
    } else {
        return "";
    }
}

/** Gibt den Preis eines Gerichts mal Anzahl zurück. */
function getMealSum(indexMeal) {
    return meals[indexMeal].price * meals[indexMeal].amount;
}

/** Gibt die Summe aller Gerichte ohne Lieferkosten zurück. */
function getSubtotal() {
    let subtotal = 0;

    for (let indexMeal = 0; indexMeal < meals.length; indexMeal++) {
        subtotal += getMealSum(indexMeal);
    }

    return subtotal;
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

/** Schickt die Testbestellung ab und leert den Warenkorb. */
function placeOrder() {
    emptyBasket();
    openDialog("order_dialog");
}

/** Setzt die Anzahl aller Gerichte auf null. */
function emptyBasket() {
    for (let indexMeal = 0; indexMeal < meals.length; indexMeal++) {
        meals[indexMeal].amount = 0;
        updateMealButton(indexMeal);
    }

    updateBaskets();
}

/** Öffnet einen Dialog und hält die Seite dahinter fest. */
function openDialog(dialogId) {
    const DIALOG_REF = document.getElementById(dialogId);

    DIALOG_REF.showModal();
    document.body.classList.add("no_scroll");
}

/** Schließt einen Dialog. */
function closeDialog(dialogId) {
    const DIALOG_REF = document.getElementById(dialogId);

    DIALOG_REF.close();
}

/** Gibt das Scrollen der Seite wieder frei. */
function unlockScroll() {
    document.body.classList.remove("no_scroll");
}
