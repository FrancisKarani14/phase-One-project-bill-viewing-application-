// create a form for login and sign up
function signupForm() {
   return`
   <div class="users"style="background:rgba(255, 255, 255, 0.788);height:auto;padding:10px;margin:10px;box-shadow:10px 10px 20px rgba(0,0,0,0.08);">
    <h1 class="formH1">Sign up to Citizen Bills</h1>
   <form>
   <input type="text" id="name" placeholder="Enter your name">
   <input type="email" id="email" placeholder="Enter your email">
   <input type="password" id="password" placeholder="Enter your password">
   <input type="text" id="country" placeholder="Enter your country's name">
   <input type="text" id="county" placeholder="Enter your county's name">
   <button id="signupBtn">Sign up</button>
   <p class="hasAccount"></p>
   </form>
   </div>
   `;
    
}
// signupForm()

const joinBtn = document.getElementById("joinBtn");
const userDetails = document.querySelector(".userDetails");
joinBtn.addEventListener("click", ()=>{
    userDetails.innerHTML= signupForm();
});