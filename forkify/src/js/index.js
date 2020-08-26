import Search from "./models/Search";
import Recipe from "./models/Recipe";
import * as searchView from './views/searchView'
import { elements, renderLoader, clearLoader } from './views/base';

/** Global state of the app
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
 */
const state = {};

/**
 * SEARCH CONTROLLER
 * @returns {Promise<void>}
 */
const controlSearch = async ()=>{
    // 1) Get the query from view
    const query = searchView.getInput();
    // const query = 'pizza';


    // If there is a query
    if (query){
        // 2) New search object and add to state
        // state.search = new Search(query);
        state.search = new Search(query);

        // 3) Prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);

        try {
            // 4) Search for recipes
            await state.search.getResults(); // an async function returns a promise

            // 5) render results on UI
            clearLoader();
            searchView.renderResults(state.search.result);
        } catch (err) {
            alert('Something went wrong with the search...');
            clearLoader();
        }

    }
}

elements.searchForm.addEventListener('submit', e=>{
    e.preventDefault();
    controlSearch();
})

// // TEST
// window.addEventListener('load', e=>{
//     e.preventDefault();
//     controlSearch();
// })

elements.searchResPages.addEventListener('click', e=> {
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10); // Convert string to number
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
    }
})

/**
 * RECIPE CONTROLLER
 */

const controlRecipe = async () => { // async function to return a promise
    // Get Id from url
    const id = window.location.hash.replace('#', ''); //window.location shos the entir url
    console.log(id);
    if (id) {
        // Prepare UI for changes

        // Create new recipe object
        state.recipe = new Recipe(id);

        // // TESTING
        // window.r = state.recipe; // Use windows because we need to access the recipe object in the console

        try {
            // Get recipe data and parse ingredients
            await state.recipe.getRecipe(); // await: load recipe data in the background and only be executed after we get back the data.
            state.recipe.parseIngredients();

            // Calculate servings and time
            state.recipe.calcServings();
            state.recipe.calcTime();

            // Render the recipe
            console.log(state.recipe);
        } catch (err) {
            alert('Error processing recipe!');
        }


    }
}

// Add the same eventListener: controlRecipe to the different events: 'hashchange' and 'load'
// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

