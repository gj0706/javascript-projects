import { elements } from './base'

export const getInput = () => elements.searchInput.value;

// Function to clear the input text in search
export const clearInput = () => {
    elements.searchInput.value = '';
};

export const clearResults = ()=> {
    elements.searchResList.innerHTML = '';
}

// 'Pasta with tomato and spinach'
/*
acc: 0 / acc + cur.length = 5 / newTitle =['Pasta']
acc: 5 / acc + cur.length = 9 / newTitle =['Pasta', 'with']
acc: 9 / acc + cur.length = 15 / newTitle =['Pasta', 'with', 'tomato']
acc: 15 / acc + cur.length = 18 / newTitle =['Pasta', 'with', 'tomato']

 */
const limitRecipeTitle = (title, limit = 20) =>{
    const newTitle = [];
    if (title.length > limit){
        title.split(' ').reduce((acc, cur) => {
            if (acc + cur.length <= limit){
                newTitle.push(cur);
            }
        }, 0);
    }
    return `${newTitle.join(' ')} ...`;
}

const renderRecipe = recipe => {
    const markup = `
        <li>
            <a class="results__link" href="#${recipe["recipe_id"]}">
                <figure class="results__fig">
                    <img src="${recipe["image_url"]}" alt="${recipe.title}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li> 
    `;
    console.log(markup)
    elements.searchResList.insertAdjacentHTML('beforeend', markup);
}

export const renderResults = recipes =>{
    recipes.forEach(renderRecipe);
}