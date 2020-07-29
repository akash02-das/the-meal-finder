const search = document.getElementById('search'),
    submit = document.getElementById('submit'),
    random = document.getElementById('random'),
    resultHeading = document.getElementById('result-heading'),
    mealsEl = document.getElementById('meals'),
    single_mealEl = document.getElementById('single-meal');

// Search Meal and Fetch from API
function searchMeal(e) {
    e.preventDefault();

    // Clear single meal
    single_mealEl.innerHTML = '';

    // Get search term
    const term = search.value;

    // Check for input empty
    if (term.trim()) {

        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                resultHeading.innerHTML = `<h2>Search results for '${term}':</h2>`;

                if (data.meals === null) {
                    resultHeading.innerHTML = `<p>There are no search results. Try again!</p>`;
                } else {
                    mealsEl.innerHTML = data.meals.map(meal =>
                        `<div class= "meal">
                            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />

                            <div class="meal-info" data-mealID="${meal.idMeal}">
                                <h3>${meal.strMeal}</h3>
                            </div>
                        </div>`
                    ).join('');
                }
            });

        // Clear Search text
        search.value = '';
    } else {
        alert('Please enter a search term');
    }
}


// Event Listener
submit.addEventListener('submit', searchMeal);