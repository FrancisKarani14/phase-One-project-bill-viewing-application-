// declare the variables using the attributes that are already in the DOM.

const joinBtn = document.getElementById("joinBtn");
const userDetails = document.querySelector(".userDetails");
const welcomeSection = document.querySelector("#welcomeSection");
const intro = document.querySelector(".intro")
// creates the sign up form that will be manipulated to create the login form.
function signupForm() {
  return `
    <div class="users" style="background:rgba(255, 255, 255, 0.788);height:auto;padding:10px;margin:10px;box-shadow:10px 10px 20px rgba(0,0,0,0.08);">
      <h1 class="formH1">Sign up to Citizen Bills</h1>
      <form>
        <input type="text" id="name" placeholder="Enter your name">
        <input type="email" id="email" placeholder="Enter your email">
        <input type="password" id="password" placeholder="Enter your password">
        <input type="text" id="country" placeholder="Enter your country's name">
        <input type="text" id="county" placeholder="Enter your county's name">
        <button id="loginBtn" type="button">Login</button>
        <button id="signupBtn" type="button">Sign up</button>
        <p class="hasAccount"></p>
      </form>
    </div>
  `;
}
// adds an event listener that displays the form to the Dom using a click event
joinBtn.addEventListener("click", () => {
    // displays the signup form on the Dom
  userDetails.innerHTML = signupForm();
    // declares variables using the attributes of the form.
  const userName = document.querySelector("#name");
  const userCountry = document.querySelector("#country");
  const userCounty = document.querySelector("#county");
  const signupBtn = document.querySelector("#signupBtn");
  const formH1 = document.querySelector(".formH1");
    // hides the inputs and changes the button to login
  userName.style.display = "none";
  userCountry.style.display = "none";
  userCounty.style.display = "none";
  signupBtn.style.display = "none";
  welcomeSection.style.display = "none";
  intro.style.display = "none"
//   changes the h1 from (sigup to citizen bills, to login to citizen bills)
  formH1.textContent = "Login to Citizen Bills";
});

function register() {
    
}
