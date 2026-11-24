/** Gibt den Link zu einer Kategorie zurück. */
function getCategoryLinkTemplate(indexCategory) {
    return `
        <li>
            <a href="#${categories[indexCategory].id}">
                ${categories[indexCategory].name}
            </a>
        </li>
    `;
}

/** Gibt eine Kategorie mit Überschrift und leerer Gerichteliste zurück. */
function getCategoryTemplate(indexCategory) {
    return `
        <section id="${categories[indexCategory].id}" class="category">
            <div class="category_headline">
                <div class="category_headline_content">
                    <img src="./assets/icons/${categories[indexCategory].icon}" alt="" />
                    <h2>
                        ${categories[indexCategory].name}
                        <span>${categories[indexCategory].info}</span>
                    </h2>
                </div>
            </div>
            <div id="meals_${categories[indexCategory].id}" class="meal_list"></div>
        </section>
    `;
}

/** Gibt die Karte eines Gerichts zurück. */
function getMealTemplate(indexMeal) {
    return `
        <article class="meal_card">
            <img
                src="./assets/img/${meals[indexMeal].img}"
                alt="Foto von ${meals[indexMeal].name}"
            />
            <div class="meal_text">
                <h3>${meals[indexMeal].name}</h3>
                <p>${meals[indexMeal].description}</p>
            </div>
            <div class="meal_order">
                <p class="price">${formatPrice(meals[indexMeal].price)}</p>
                <button
                    id="meal_button_${indexMeal}"
                    class="add_button"
                    onclick="addToBasket(${indexMeal})"
                >
                    In den Warenkorb
                </button>
            </div>
        </article>
    `;
}

/** Gibt das Grundgerüst eines Warenkorbs zurück. */
function getBasketTemplate(basketId) {
    return `
        <h2>Dein Warenkorb</h2>
        <div class="basket_empty">
            <p>Noch nichts drin. Such dir etwas Leckeres aus!</p>
            <img src="./assets/icons/shopping_cart.svg" alt="" />
        </div>
        <div class="basket_filled">
            <ul id="${basketId}_items" class="basket_items"></ul>
            <div id="${basketId}_sums" class="basket_sums"></div>
        </div>
    `;
}

/** Gibt Zwischensumme, Lieferkosten und Gesamtsumme zurück. */
function getBasketSumsTemplate(subtotal, total) {
    return `
        <p><span>Zwischensumme</span><span>${formatPrice(subtotal)}</span></p>
        <p><span>Lieferkosten</span><span>${formatPrice(DELIVERY_FEE)}</span></p>
        <p class="total">
            <strong>Gesamt</strong><strong>${formatPrice(total)}</strong>
        </p>
    `;
}

/** Gibt ein Gericht im Warenkorb zurück. */
function getBasketItemTemplate(indexMeal, basketId) {
    return `
        <li class="basket_item">
            <div class="basket_item_row">
                <h3>${meals[indexMeal].amount} x ${meals[indexMeal].name}</h3>
                ${getTrashButtonTemplate(indexMeal, hideIfSingle(indexMeal))}
            </div>
            <div class="basket_item_row">
                <div class="basket_amount">
                    ${getTrashButtonTemplate(indexMeal, hideIfMultiple(indexMeal))}
                    ${getMinusButtonTemplate(indexMeal, basketId)}
                    <span>${meals[indexMeal].amount}</span>
                    ${getPlusButtonTemplate(indexMeal, basketId)}
                </div>
                <p class="price">${formatPrice(getMealSum(indexMeal))}</p>
            </div>
        </li>
    `;
}

/** Gibt den Mülleimer-Button zurück. */
function getTrashButtonTemplate(indexMeal, hiddenClass) {
    return `
        <button
            class="basket_button ${hiddenClass}"
            onclick="removeFromBasket(${indexMeal})"
        >
            <img
                src="./assets/icons/delete.svg"
                alt="${meals[indexMeal].name} aus dem Warenkorb entfernen"
            />
        </button>
    `;
}

/** Gibt den Minus-Button zurück. */
function getMinusButtonTemplate(indexMeal, basketId) {
    return `
        <button
            id="${basketId}_decrease_${indexMeal}"
            class="basket_button ${hideIfSingle(indexMeal)}"
            onclick="decreaseAmount(${indexMeal}, '${basketId}')"
            aria-label="${meals[indexMeal].name}: Anzahl verringern"
        >
            −
        </button>
    `;
}

/** Gibt den Plus-Button zurück. */
function getPlusButtonTemplate(indexMeal, basketId) {
    return `
        <button
            id="${basketId}_increase_${indexMeal}"
            class="basket_button"
            onclick="increaseAmount(${indexMeal}, '${basketId}')"
            aria-label="${meals[indexMeal].name}: Anzahl erhöhen"
        >
            +
        </button>
    `;
}
