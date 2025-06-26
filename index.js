const joinBtn = document.getElementById("joinBtn");
const userDetails = document.querySelector(".userDetails");
const welcomeSection = document.querySelector("#welcomeSection");
const intro = document.querySelector(".intro");
const acceptedDisplay = document.querySelector(".displayContainer");
const firstContainer = document.querySelector(".container");

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

// authorized user view
function authorized() {
  return `
    <h2 class="authorizedH2">Welcome to Citizen Bills – Your Voice in Legislation</h2>
    <p class="authorizedP">A bill is a formal written proposal for a new law or a change to an existing law that is presented for debate and approval by a legislative body, such as a parliament or congress. It outlines specific provisions, rules, or regulations that, if passed through the necessary legislative processes and approved by the appropriate authorities (like a president or governor), become legally binding statutes.</p><br>
    <button id="viewBill">View the bill</button>
     <div class="billDisplay"></div>
    <div class="comments">
    
      <form>
        <h2>Participate in the Conversation</h2>
        <input type="text" placeholder="Enter the bill title">
        <input type="text" placeholder="Enter your name">
        <input type="text" placeholder="Enter your comment">
        <button id="addComment">Add Comments</button>
      </form>

    </div>
    <div class="commentsDisplay"></div>
  `;
}

// comment card
function commentsCard(comment) {
  return `
    <div class="cardDiv">
      <h2 class="cardH2">${comment.author}</h2>
      <p class="cardP">${comment.comment}</p>
    </div>
  `;
}

// bill card
function billCard(bill) {
  return `
    <div class="billSection">
      <h1 class="billH1">${bill.author}</h1>
      <p class="billP">${bill.summary}</p>
      <h4 class="billH4">${bill.status}</h4>
      <h4 class="billH4">${bill.sponsor}</h4>
      <h4 class="billH4">${bill.dateProposed}</h4>
    </div>
  `;
}

// Event listener for join button
joinBtn.addEventListener("click", () => {
  userDetails.innerHTML = signupForm();

  const userName = document.querySelector("#name");
  const userCountry = document.querySelector("#country");
  const userCounty = document.querySelector("#county");
  const signupBtn = document.querySelector("#signupBtn");
  const formH1 = document.querySelector(".formH1");
  const emailInput = document.querySelector("#email");
  const passwordInput = document.querySelector("#password");
  const loginBtn = document.querySelector("#loginBtn");

  userName.style.display = "none";
  userCountry.style.display = "none";
  userCounty.style.display = "none";
  signupBtn.style.display = "none";
  welcomeSection.style.display = "none";
  intro.style.display = "none";

  formH1.textContent = "Login to Citizen Bills";

  loginBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!email || !password) {
      alert("Please enter both email and password");
      return;
    }

    try {
      const res = await fetch(`http://localhost:3000/users?email=${email}&password=${password}`);
      const users = await res.json();

      if (users.length > 0) {
        alert("Login successful");
        userDetails.style.display = "none";
        acceptedDisplay.innerHTML = authorized();
        firstContainer.style.display = "none";
        fetchComments();
        enableBillView(); // attach view bill logic
      } else {
        alert("You don't have an account, sign up");
        userDetails.innerHTML = signupForm();

        const userName = document.querySelector("#name");
        const userCountry = document.querySelector("#country");
        const userCounty = document.querySelector("#county");
        const signupBtn = document.querySelector("#signupBtn");
        const formH1 = document.querySelector(".formH1");
        const emailInput = document.querySelector("#email");
        const passwordInput = document.querySelector("#password");
        const loginBtn = document.querySelector("#loginBtn");

        userName.style.display = "block";
        userCountry.style.display = "block";
        userCounty.style.display = "block";
        signupBtn.style.display = "inline-block";
        loginBtn.style.display = "none";
        acceptedDisplay.style.display = "none";

        formH1.textContent = "Sign up to Citizen Bills";

        signupBtn.addEventListener("click", async (e) => {
          e.preventDefault();
          const name = userName.value.trim();
          const email = emailInput.value.trim();
          const password = passwordInput.value.trim();
          const country = userCountry.value.trim();
          const county = userCounty.value.trim();

          if (!name || !email || !password || !country || !county) {
            alert("Please fill in all fields");
            return;
          }

          const userReg = { name, email, password, country, county };

          try {
            const res = await fetch("http://localhost:3000/users", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(userReg)
            });

            if (res.ok) {
              alert("Signup successful!");
              userDetails.style.display = "none";
              acceptedDisplay.innerHTML = authorized();
              firstContainer.style.display = "none";
              fetchComments();
              enableBillView(); // attach view bill logic
            } else {
              alert("Signup failed. Try again.");
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

// Fetch and display comments
function fetchComments() {
  const commentsDisplay = document.querySelector(".commentsDisplay");
  fetch("http://localhost:3000/comments")
    .then(res => res.json())
    .then(comments => {
      commentsDisplay.innerHTML = "";
      comments.forEach(comment => {
        commentsDisplay.innerHTML += commentsCard(comment);
      });
    })
    .catch(err => console.error("Fetch error:", err));
}

// Attach event to #viewBill after DOM is updated
function enableBillView() {
  const viewBillBtn = document.querySelector("#viewBill");
  if (viewBillBtn) {
    viewBillBtn.addEventListener("click", () => {
      fetch("http://localhost:3000/bills")
        .then(res => res.json())
        .then(bills => {
          const billDisplay = document.querySelector(".billDisplay");
          bills.forEach(bill => {
            billDisplay.innerHTML += billCard(bill);
          });
        })
        .catch(err => console.error("Bill fetch error:", err));
    });
  }
}
