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
        // <p class="hasnoAccount"></p>
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
    const emailInput = document.querySelector("#email");
  const passwordInput = document.querySelector("#password");
   const loginBtn = document.querySelector("#loginBtn");
    // hides the inputs and changes the button to login
  userName.style.display = "none";
  userCountry.style.display = "none";
  userCounty.style.display = "none";
  signupBtn.style.display = "none";
  welcomeSection.style.display = "none";
  intro.style.display = "none"
//   changes the h1 from (sigup to citizen bills, to login to citizen bills)
  formH1.textContent = "Login to Citizen Bills";
  
//   handles the login attempt
loginBtn.addEventListener("click", async()=>{
    const email = emailInput.value.trim()
    const password = passwordInput.value.trim()

    // validation to ensure the email and the password are keyed
    if (!email || !password) {
        alert("Please enter both email and password")
        return;
        
    }
    // fetch request to make sure the user details match what is there in the server
    try{
        const res = await fetch(`http://localhost:3000/users?email=${email}&passord=${password}`)
        // converts the server response into json object and saves it into the users variable
        // it returns an array if a user matches the datails and an empty array if the user matches no details
        const users = await res.json()
        // validation to check whether the user matches details
        if (users.length > 0) {
            alert("Login successful")
            
        }else {
            alert("You dont have an account, sign up")
            signupForm()
            
        }
        
    }catch (error) {
      console.error("Error during login:", error);
      alert("Something went wrong. Please try again.");
    }
})
});


