// declare the variables using the attributes that are already in the DOM.

const joinBtn = document.getElementById("joinBtn");
const userDetails = document.querySelector(".userDetails");
const welcomeSection = document.querySelector("#welcomeSection");
const intro = document.querySelector(".intro")
const acceptedDisplay =document.querySelector(".displayContainer")
const firstContainer = document.querySelector(".container")

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
        <button id="loginBtn" type="button">log in</button>
        <button id="signupBtn" type="button">Sign up</button>
      </form>
    </div>
  `;
}
// creates the section where only authorized users will see
function authorized() {
    return`
       <h2 class="authorizedH2" >Welcome to Citizen Bills  Your Voice in Legislation</h2>
        <p class="authorizedP">A bill is a formal written proposal for a new law or a change to an existing law that is presented for debate and approval by a legislative body, such as a parliament or congress. It outlines specific provisions, rules, or regulations that, if passed through the necessary legislative processes and approved by the appropriate authorities (like a president or governor), become legally binding statutes. Bills are essential tools in shaping public policy, addressing societal needs, and guiding governance. click the button to view the bill.</p><br>

            <button id="viewBill">View the bill</button>
             <div class="comments">
        <form>
            <h2>Participate in the Conversation</h2>
            <input type="text" placeholder="Enter the bill title ">
            <input type="text" placeholder="Enter your name">
            <input type="text" placeholder="Enter your comment">
            <button id="addComment">Add Comments</button>
        </form>
     </div>
    `
    
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

  // hide the unnecessary inputs and button, because we're using the form for login first
  userName.style.display = "none";
  userCountry.style.display = "none";
  userCounty.style.display = "none";
  signupBtn.style.display = "none";
  welcomeSection.style.display = "none";
  intro.style.display = "none";

  // changes the h1 from (signup to citizen bills, to login to citizen bills)
  formH1.textContent = "Login to Citizen Bills";


  // handles the login attempt
  loginBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    // validation to ensure the email and the password are keyed
    if (!email || !password) {
      alert("Please enter both email and password");
      return;
    }

    // fetch request to make sure the user details match what is there in the server
    try {
      const res = await fetch(`http://localhost:3000/users?email=${email}&password=${password}`);
      // converts the server response into json object and saves it into the users variable
      // it returns an array if a user matches the details and an empty array if the user matches no details
      const users = await res.json();

      // validation to check whether the user matches details
      if (users.length > 0) {
        alert("Login successful");
        // display once the login is successfull
        userDetails.style.display="none"
        acceptedDisplay.innerHTML=authorized()
        firstContainer.style.display="none"
      }
      // If the user has no account a signup form appears
      else {
        alert("You don't have an account, sign up");
        userDetails.innerHTML = signupForm();

        // store the signup form inputs again
        const userName = document.querySelector("#name");
        const userCountry = document.querySelector("#country");
        const userCounty = document.querySelector("#county");
        const signupBtn = document.querySelector("#signupBtn");
        const formH1 = document.querySelector(".formH1");
        const emailInput = document.querySelector("#email");
        const passwordInput = document.querySelector("#password");

        // show all the inputs needed for sign up
        userName.style.display = "block";
        userCountry.style.display = "block";
        userCounty.style.display = "block";
        signupBtn.style.display = "inline-block";
        loginBtn.style.display="none"
         acceptedDisplay.style.display="none"

        formH1.textContent = "Sign up to Citizen Bills";

        // handle the user registration data.
        // create an event listener to the signup button to pick on the data keyed in the inputs
        signupBtn.addEventListener("click", async (e) => {
          e.preventDefault();
          const name = userName.value.trim();
          const email = emailInput.value.trim();
          const password = passwordInput.value.trim();
          const country = userCountry.value.trim();
          const county = userCounty.value.trim();

          // validation to make sure that the inputs are not empty
          if (!name || !email || !password || !country || !county) {
            alert("Please fill in all fields");
            return;
          }

          // store inputs in an object
          const userReg = { name, email, password, country, county };

          // post user information to db.json  
          try {
            const res = await fetch("http://localhost:3000/users", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(userReg)
            });

            if (res.ok) {
              alert("Signup successful!");
            //   display when the signup is successfull
              userDetails.style.display="none"
              acceptedDisplay.innerHTML=authorized()
               firstContainer.style.display="none"
            } else {
              alert("Signup failed. Try again.");
               acceptedDisplay.style.display="none"
            }
          } catch (error) {
            console.error("Error during signup:", error);
            alert("Something went wrong. Please try again.");
          }
        });
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Something went wrong. Please try again.");
    }
  });
});
