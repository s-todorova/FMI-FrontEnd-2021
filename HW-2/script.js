import "https://unpkg.com/@ui5/webcomponents-fiori@1.0.2/dist/ShellBar.js?module";
import "https://unpkg.com/@ui5/webcomponents@1.0.2/dist/Panel.js?module";
import "https://unpkg.com/@ui5/webcomponents@1.0.2/dist/Input.js?module";
import "https://unpkg.com/@ui5/webcomponents@1.0.2/dist/List.js?module";
import "https://unpkg.com/@ui5/webcomponents@1.0.2/dist/Dialog.js?module";
import "https://unpkg.com/@ui5/webcomponents@1.0.2/dist/CustomListItem.js?module";
import "https://unpkg.com/@ui5/webcomponents@1.0.2/dist/StandardListItem.js?module";
import "https://unpkg.com/@ui5/webcomponents@1.0.2/dist/Table.js?module";
import "https://unpkg.com/@ui5/webcomponents@1.0.2/dist/TableColumn.js?module";
import "https://unpkg.com/@ui5/webcomponents@1.0.2/dist/TableRow.js?module";
import "https://unpkg.com/@ui5/webcomponents@1.0.2/dist/TableCell.js?module";
import "https://unpkg.com/@ui5/webcomponents-icons@1.0.2/dist/hint.js?module";

loadRecipes();

const list=document.getElementById("recipeList");
var dialog = document.getElementById("modal-dialog");
const filterName = document.getElementById("filterName");
const filterRegion = document.getElementById("filterRegion");
const filterCategory = document.getElementById("filterCategory");

//Dialog modal
var dialogCloser = document.getElementById("closeDialogButton");
dialogCloser.addEventListener("click", function() {
	dialog.close();
});

//Creating recipes
const renderRecipes = (recipe) => {   
    const li = document.createElement("ui5-li");
    const info = `${recipe.category}, ${recipe.region}`;
    li.innerHTML = `${recipe.name}`;
    li.setAttribute("description",info);
    li.setAttribute("icon","hint");
    li.setAttribute("icon-end","true");
    li.setAttribute("image",recipe.image);
    list.appendChild(li);
};

//for finding instruction for curr recipe
const findbyName = (arr,name) => {
    return arr.find(element => element.name === name);
};


function createTable(ingredient,measure) {
    const table=document.getElementById("modal-table");
    const row=document.createElement("ui5-table-row");
    row.classList.add("row");

    const cell1=document.createElement("ui5-table-cell");
    cell1.innerText=ingredient;
    const cell2=document.createElement("ui5-table-cell");
    cell2.innerText=measure;

    row.appendChild(cell1);
    row.appendChild(cell2);
    table.appendChild(row);
}

//Render recipe info on click
list.addEventListener( "click", (async (event) => {
    const recipesResponse = await fetch("https://api.npoint.io/51ed846bdd74ff693d7e");
    const recipes = await recipesResponse.json();
    const meals = recipes.meals;

    const currRecipe = event.target;
    const img=document.getElementById("modal-img");
    const text=document.getElementById("modal-text");
    const instruction = findbyName(meals,currRecipe.innerText).instruction;
    const ingredients = findbyName(meals,currRecipe.innerText).ingredients;
     
    img.setAttribute("src",currRecipe.getAttribute("image"));
    text.innerText=instruction;
    dialog.setAttribute("header-text",currRecipe.innerText);
    
    ingredients.forEach((ingredient) => createTable(ingredient.name,ingredient.measure));
    
    dialog.show();
}));

//API data
async function loadRecipes() { 
    const recipesResponse = await fetch("https://api.npoint.io/51ed846bdd74ff693d7e");
    const recipes = await recipesResponse.json();
    const meals = recipes.meals;
 
    meals.forEach((meal) => {        
        renderRecipes(meal);
    });
}

//--------filters----------

filterName.addEventListener("change", (event) => {
    const searchedName=event.target.value;
    const allLI=Array.from(document.getElementsByTagName("ui5-li"));
    allLI.forEach((li) => {
        const liName=li.innerText;        
        li.toggleAttribute("hidden",!( ((liName).toUpperCase()).includes(searchedName.toUpperCase()) ) && searchedName != "");
    })
    event.target.value="";
});

filterRegion.addEventListener("change", (event) => {
    const searchedRegion=event.target.value;
    const allLI=Array.from(document.getElementsByTagName("ui5-li"));
    allLI.forEach((li) => {
        const regionText=li.getAttribute('description');
        const region = regionText.substr(regionText.indexOf(' ')+1);       
        li.toggleAttribute("hidden",!( ((region).toUpperCase()).includes(searchedRegion.toUpperCase()) ) && searchedRegion != "");
    })
    event.target.value="";
});

filterCategory.addEventListener("change", (event) => {
    const searchedCategory=event.target.value;
    const allLI=Array.from(document.getElementsByTagName("ui5-li"));
    allLI.forEach((li) => {
        const categText=li.getAttribute('description');
        const category = categText.substr(0,categText.indexOf(' '));       
        li.toggleAttribute("hidden",!( ((category).toUpperCase()).includes(searchedCategory.toUpperCase()) ) && searchedCategory != "");
    })
    event.target.value="";
});