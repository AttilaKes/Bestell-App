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
                <button class="add_button">In den Warenkorb</button>
            </div>
        </article>
    `;
}
