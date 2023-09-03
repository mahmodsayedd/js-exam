/// <reference types="../@types/jquery"/>

let rowData = document.getElementById("rowData");
let searchData = document.getElementById("searchData");
let submitBtn = document.getElementById("submitBtn");



$(document).ready(() => {
  getMeals("").then((callback) => {
    $(".loading-screen").fadeOut(500);
    $("body").css("overflow", "visible");
    callback;
  });
});

function openNav() {
  $(".nav-menu").animate({ left: 0 }, 500);
  $("i.menu-icon").removeClass("fa-align-justify");
  $("i.menu-icon").addClass("fa-x");

  for (let i = 0; i < 5; i++) {
    $(".nav-list li")
      .eq(i)
      .animate({ top: 0 }, (i + 8) * 100);
  }
}
function closeNav() {
  let navOuterWidth = $(".nav-menu .nav-links").outerWidth();

  $(".nav-menu").animate({ left: -navOuterWidth }, 500);

  $("i.menu-icon").removeClass("fa-x");
  $("i.menu-icon").addClass("fa-align-justify");
  $(".nav-list li").animate({ top: 300 }, 500);
}
closeNav();
$("i.menu-icon").on("click", () => {
  if ($(".nav-menu").css("left") == "0px") {
    closeNav();
  } else {
    openNav();
  }
});




async function getMeals(name) {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
  );
  response = await response.json();
  displayMeals(response.meals);
}

function displayMeals(meal) {
  let container = "";
  for (let i = 0; i < meal.length; i++) {
    container += `
        <div class="col-md-3">
        <div onclick="getDetailsOfMeals('${meal[i].idMeal}')" class="meals position-relative overflow-hidden rounded-3 cursor-pointer">
          <img class="w-100" src="${meal[i].strMealThumb}" alt="">
          <div class="meal-layer position-absolute d-flex align-items-center">
            <h3 class="text-black">${meal[i].strMeal}</h3>
          </div>
        </div>
      
      </div>
        `;
  }
  rowData.innerHTML = container;
}


async function getCategories() {
  closeNav();
  $(".loading-screen").fadeIn(500);
  searchData.innerHTML = "";
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  response = await response.json();
  displayCategories(response.categories);
  $(".loading-screen").fadeOut(500);

}

function displayCategories(category) {
  let container = "";
  for (let i = 0; i < category.length; i++) {
    container += `
        <div class="col-md-3">
        <div onclick="getCategoriesName('${
          category[i].strCategory
        }');" class="meals position-relative overflow-hidden rounded-3 cursor-pointer">
          <img class="w-100" src="${category[i].strCategoryThumb}" alt="">
          <div class="meal-layer position-absolute text-center">
            <h3 class="text-black">${category[i].strCategory}</h3>
            <p>${category[i].strCategoryDescription
              .split(" ")
              .slice(0, 100)
              .join("")}</p>
          </div>
        </div>
      
      </div>
        `;
  }
  rowData.innerHTML = container;
}

async function getArea() {
  closeNav();

  $(".loading-screen").fadeIn(500);
  searchData.innerHTML = "";
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );
  response = await response.json();
  
  displayArea(response.meals);
  $(".loading-screen").fadeOut(500);


}

function displayArea(country) {
  let container = "";
  for (let i = 0; i < country.length; i++) {
    container += `
          <div class="col-md-3">
          <div onclick="getAreaMeals('${country[i].strArea}')" class="rounded-3 text-center cursor-pointer">
            <i class="fa-solid fa-house-laptop text-white fs-2"></i>
            <h3 class="text-white">${country[i].strArea}</h3>
          </div>
        
        </div>
          `;
  }
  rowData.innerHTML = container;
}

async function getIngredients() {
  closeNav();

  $(".loading-screen").fadeIn(500);

  searchData.innerHTML = "";
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  response = await response.json();
  displayIngredients(response.meals.slice(0, 20));
  $(".loading-screen").fadeOut(500);

}

function displayIngredients(ingredient) {
  let container = "";
  for (let i = 0; i < ingredient.length; i++) {
    container += `
      <div class="col-md-3">
      <div onclick="getIngredientsMeals('${
        ingredient[i].strIngredient
      }')" class="rounded-3 text-center cursor-pointer">
      <i class="fa-solid fa-cheese text-white fs-2"></i>
      <div class="text-center">
      <h3 class="text-white">${ingredient[i].strIngredient}</h3>
      <p>${ingredient[i].strDescription.split(" ").slice(0, 20).join(" ")}</p>
      </div>
      </div>
    </div>
          `;
  }
  rowData.innerHTML = container;
}

async function getCategoriesName(categoryMeal) {
  $(".loading-screen").fadeIn(500);

  searchData.innerHTML = "";
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryMeal}`
  );
  response = await response.json();
  displayMeals(response.meals);
  $(".loading-screen").fadeOut(500);

}

async function getAreaMeals(areaMeal) {
  $(".loading-screen").fadeIn(500);

  searchData.innerHTML = "";
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaMeal}`
  );
  response = await response.json();
  displayMeals(response.meals);
  $(".loading-screen").fadeOut(500);

}

async function getIngredientsMeals(ingredientsMeal) {
  $(".loading-screen").fadeIn(500);

  searchData.innerHTML = "";
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredientsMeal}`
  );
  response = await response.json();
  displayMeals(response.meals);
  $(".loading-screen").fadeOut(500);

}

async function getDetailsOfMeals(id) {
  closeNav();

  $(".loading-screen").fadeIn(500);

  searchData.innerHTML = "";
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id} `
  );
  response = await response.json();
  displayMealsDetails(response.meals[0]);
  $(".loading-screen").fadeOut(500);

}
function displayMealsDetails(mealDetails) {
  searchData.innerHTML = "";
  let ingredients = "";
  for (let i = 1; i <= 20; i++) {
    if (mealDetails[`strIngredient${i}`]) {
      ingredients += `<li class="alert alert-info m-2 p-1">${
        mealDetails[`strMeasure${i}`]
      } ${mealDetails[`strIngredient${i}`]}</li>`;
    }
  }

  let tags = mealDetails.strTags?.split(","); // "?" in here means if not null or undefined
  if (!tags) {
    tags = [];
  }
  let tagsDetails = "";
  for (let i = 0; i < tags.length; i++) {
    tagsDetails += ` <li class="alert alert-danger m-2 p-2">${tags[i]}</li> `;
  }
  let container = `
    <div class="col-md-4">
            <img
              class="w-100 rounded-2"
              src="${mealDetails.strMealThumb}"
              alt=""
            />
            <h2>Burek</h2>
          </div>
          <div class="col-md-8">
            <h2>Instructions</h2>
            <p>
              ${mealDetails.strInstructions}
            </p>
            <h3> <span class="fw-bolder">Area :</span> ${mealDetails.strArea} </h3>
            <h3> <span class="fw-bolder">Category :</span> ${mealDetails.strCategory} </h3>
            <h3> <span class="fw-bolder">Category :</span>  </h3>
            <ul class="list-unstyled d-flex flex-wrap">
              ${ingredients}

            </ul>
            <h3> <span class="fw-bolder">Tags :</span>  </h3>
            <ul class="list-unstyled d-flex">
              
            ${tagsDetails}
              
            </ul>
            <a target="_blank" href="${mealDetails.strSource}" class="btn btn-success mx-2">Source</a>
            <a target="_blank" href="${mealDetails.strYoutube}" class="btn btn-danger">Youtube</a>
          </div>
    `;
  rowData.innerHTML = container;
}

function searchInput() {
  closeNav();
  $(".loading-screen").fadeIn(500);

  searchData.innerHTML = `
    <div class="col-md-6">
    <input oninput="searchByName(this.value);" class="form-control searchInput border-bottom border-0 bg-transparent text-white" placeholder="Search By Name" type="text">
  </div>
  <div class="col-md-6">
    <input oninput="searchByLetter(this.value)"  maxlength="1" class="form-control searchInput bg-transparent border-bottom border-0 text-white" placeholder="Search By Letter" type="text">
  </div>
    `;

  rowData.innerHTML = "";
  $(".loading-screen").fadeOut(500);

}

async function searchByName(mealName) {
  $(".loading-screen").fadeIn(500);

  let response = await fetch(
    ` https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName} `
  );
  response = await response.json();

  response.meals ? displayMeals(response.meals) : displayMeals([]);
  $(".loading-screen").fadeOut(500);

}

async function searchByLetter(mealLetter) {
  $(".loading-screen").fadeIn(500);

  mealLetter == "" ? (mealLetter = "a") : "";
  let response = await fetch(
    ` https://www.themealdb.com/api/json/v1/1/search.php?f=${mealLetter} `
  );
  response = await response.json();
  response.meals ? displayMeals(response.meals) : displayMeals([]);
  $(".loading-screen").fadeOut(500);

}

function contactList() {
  closeNav();

  $(".loading-screen").fadeIn(500);

  rowData.innerHTML = `
    <div class="section-title text-center py-5">
    <h2 class="py-5">Contact Us !</h2>
  </div>
  <div class="row g-4">
      <div class="col-md-6 my-2">
        <input id="inputName" oninput="allInputData();" class="form-control" placeholder="Enter Your Name" type="text">
        <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none"> 
        Special characters and Numbers not allowed
        </div>
      </div>
      <div class="col-md-6 my-2">
        <input id="inputEmail" oninput="allInputData();" class="form-control" placeholder="Enter Your Email" type="email">
        <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none"> 
        Email is not valid 
        </div>
      </div>
      <div class="col-md-6 my-2">
        <input id="inputPhone" oninput="allInputData();" class="form-control" placeholder="Enter Your Phone" type="text">
        <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none"> 
        phone number is not valid
        </div>
      </div>
      <div class="col-md-6 my-2">
        <input id="inputAge" oninput="allInputData();" class="form-control" placeholder="Enter Your Age" type="number">
        <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none"> 
        age is not valid
        </div>
      </div>
      <div class="col-md-6 my-2">
        <input id="inputPassword" oninput="allInputData();" class="form-control" placeholder="Enter Your Password" type="password">
        <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none"> 
        Enter valid password *Minimum eight characters, at least one letter and one number:*
        </div>
      </div>
      <div class="col-md-6 my-2">
        <input id="inputConfirmPassword" oninput="allInputData();" class="form-control" placeholder="Confirm Password" type="password">
        <div id="confirmPasswordAlert" class="alert alert-danger w-100 mt-2 d-none"> 
        RePassword is not match
        </div>
      </div>
  </div>
  <div class="text-center py-2">
    <button type="submit" class="disabled submitBtn btn btn-outline-danger">Submit</button>
  </div>
    `;

  document.getElementById("inputName").addEventListener("focus", function () {
    inputNameFocused = true;
  });
  document.getElementById("inputEmail").addEventListener("focus", function () {
    inputEmailFocused = true;
  });
  document.getElementById("inputPhone").addEventListener("focus", function () {
    inputPhoneFocused = true;
  });
  document.getElementById("inputAge").addEventListener("focus", function () {
    inputAgeFocused = true;
  });
  document
    .getElementById("inputPassword")
    .addEventListener("focus", function () {
      inputPasswordFocused = true;
    });
  document
    .getElementById("inputConfirmPassword")
    .addEventListener("focus", function () {
      inputConfirmPasswordFocused = true;
    });
    $(".loading-screen").fadeOut(500);

}
let inputNameFocused = false;
let inputEmailFocused = false;
let inputPhoneFocused = false;
let inputAgeFocused = false;
let inputPasswordFocused = false;
let inputConfirmPasswordFocused = false;

function allInputData() {
  if (inputNameFocused) {
    if (nameInput()) {
      document
        .getElementById("nameAlert")
        .classList.replace("d-block", "d-none");
      $("#inputName").addClass("is-valid");
      $("#inputName").removeClass("is-invalid");
    } else {
      document
        .getElementById("nameAlert")
        .classList.replace("d-none", "d-block");
      $("#inputName").addClass("is-invalid");
      $("#inputName").addClass("is-valid");
    }
  }

  if (inputEmailFocused) {
    if (emailInput()) {
      document
        .getElementById("emailAlert")
        .classList.replace("d-block", "d-none");
      $("#inputEmail").addClass("is-valid");
      $("#inputEmail").removeClass("is-invalid");
    } else {
      document
        .getElementById("emailAlert")
        .classList.replace("d-none", "d-block");
      $("#inputEmail").addClass("is-invalid");
      $("#inputEmail").addClass("is-valid");
    }
  }
  //phone
  if (inputPhoneFocused) {
    if (phoneInput()) {
      document
        .getElementById("phoneAlert")
        .classList.replace("d-block", "d-none");
      $("#inputPhone").addClass("is-valid");
      $("#inputPhone").removeClass("is-invalid");
    } else {
      document
        .getElementById("phoneAlert")
        .classList.replace("d-none", "d-block");
      $("#inputPhone").addClass("is-invalid");
      $("#inputPhone").addClass("is-valid");
    }
  }
  
  if (inputAgeFocused) {
    if (ageInput()) {
      document
        .getElementById("ageAlert")
        .classList.replace("d-block", "d-none");
      $("#inputAge").addClass("is-valid");
      $("#inputAge").removeClass("is-invalid");
    } else {
      document
        .getElementById("ageAlert")
        .classList.replace("d-none", "d-block");
      $("#inputAge").addClass("is-invalid");
      $("#inputAge").addClass("is-valid");
    }
  }
  
  if (inputPasswordFocused) {
    if (passwordInput()) {
      document
        .getElementById("passwordAlert")
        .classList.replace("d-block", "d-none");
      $("#inputPassword").addClass("is-valid");
      $("#inputPassword").removeClass("is-invalid");
    } else {
      document
        .getElementById("passwordAlert")
        .classList.replace("d-none", "d-block");
      $("#inputPassword").addClass("is-invalid");
      $("#inputPassword").addClass("is-valid");
    }
  }
  
  if (inputConfirmPasswordFocused) {
    if (confirmPasswordInput()) {
      document
        .getElementById("confirmPasswordAlert")
        .classList.replace("d-block", "d-none");
      $("#inputConfirmPassword").addClass("is-valid");
      $("#inputConfirmPassword").removeClass("is-invalid");
    } else {
      document
        .getElementById("confirmPasswordAlert")
        .classList.replace("d-none", "d-block");
      $("#inputConfirmPassword").addClass("is-invalid");
      $("#inputConfirmPassword").addClass("is-valid");
    }
  }
  if (
    nameInput() &&
    emailInput() &&
    phoneInput() &&
    ageInput() &&
    passwordInput() &&
    confirmPasswordInput()
  ) {
    console.log("hello bro");
    $(".submitBtn").removeClass("disabled");
  } else {
    $(".submitBtn").addClass("disabled");
  }
}

function nameInput() {
  return /^[a-zA-Z ]+$/.test(document.getElementById("inputName").value);
}

function emailInput() {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    document.getElementById("inputEmail").value
  );
}

function phoneInput() {
  return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(
    document.getElementById("inputPhone").value
  );
}

function ageInput() {
  return /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(
    document.getElementById("inputAge").value
  );
}

function passwordInput() {
  return /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(
    document.getElementById("inputPassword").value
  );
}

function confirmPasswordInput() {
  return (
    document.getElementById("inputConfirmPassword").value ==
    document.getElementById("inputPassword").value
  );
}
