// DOM references
const joinBtn = document.getElementById("joinBtn");
const userDetails = document.querySelector(".userDetails");
const welcomeSection = document.querySelector("#welcomeSection");
const intro = document.querySelector(".intro");
const acceptedDisplay = document.querySelector(".displayContainer");
const firstContainer = document.querySelector(".container");

// Template: Signup/Login form
function signupForm() {
  return `
    <div class="users" style="background:rgba(255, 255, 255, 0.788);padding:10px;margin:10px;box-shadow:10px 10px 20px rgba(0,0,0,0.08);">
      <h1 class="formH1">Sign up to Citizen Bills</h1>
      <form style="display:flex; flex-direction:column; gap:15px;">
        <input type="text" id="name" placeholder="Enter your name">
        <input type="email" id="email" placeholder="Enter your email">
        <input type="password" id="password" placeholder="Enter your password">
        <input type="text" id="country" placeholder="Enter your country's name">
        <input type="text" id="county" placeholder="Enter your county's name">
        <button id="loginBtn" type="button">Log In</button>
        <button id="signupBtn" type="button">Sign Up</button>
      </form>
    </div>
  `;
}

// Template: Authorized View
function authorized() {
  return `
    <h2 class="authorizedH2">Welcome to Citizen Bills – Your Voice in Legislation</h2>
    <p class="authorizedP">
      A bill is a formal written proposal that outlines a suggested new law or modifications to an existing law. 
      It serves as a foundational tool in the legislative process, enabling lawmakers to address emerging issues, 
      close legal loopholes, or refine regulations for better clarity and fairness. Once drafted, it undergoes a 
      series of reviews and approvals in a legislative body. Public participation ensures the law reflects citizens' 
      needs. If approved and signed, it becomes a binding statute.<br>
      Click the button to view bills.
    </p>
    <button id="viewBill">View the bill</button>
    <div class="billDisplay"></div>
    <div class="comments">
      <div class="commentForm" style="display:flex; flex-direction:column; gap:10px; padding:10px;">
        <h2>Participate in the Conversation</h2>
        <input type="text" placeholder="Enter the bill title" id="titleInput">
        <input type="text" placeholder="Enter your name" id="nameInput">
        <input type="text" placeholder="Enter your comment" id="commentInput">
        <button id="addComment" type="button">Add Comment</button>
      </div>
    </div>
    <div class="commentsDisplay"></div>

    <div class="sponsorDisplay">
    <div class="sponsor1"><img src="https://media.istockphoto.com/id/172441387/photo/businessman-portrait.jpg?s=612x612&w=0&k=20&c=kk49ALcFPz0NZxOBdTqDcOVqJENCNYOQMEwg9VuZY0k=" alt="a polititian">
    <h4>Hon.John Karanja</h4>
    <p></p>
    </div>
    <div class="sponsor2"><img src="https://media.istockphoto.com/id/514711952/photo/confidence-is-a-great-asset.jpg?s=612x612&w=0&k=20&c=fUUtKJrxfif1stusnq8PryGFz9EdNyaPqPW0tmDBhoI=" alt="an mp">
    <h4>Hon. Mary Atieno</h4>
    <p></p>
    </div>
    <div class="sponsor3"><img src="https://media.istockphoto.com/id/1589730135/photo/portrait-motivation-and-fist-with-a-business-black-man-in-studio-on-a-blue-background-for.jpg?s=612x612&w=0&k=20&c=95mEVhAgUb8y-4YTfvc9Ko4OKkPn3eaoUth-nCSY2Qg=" alt="a polititian">
    <h4>Hon. Peter Wekesa</h4>
    <p></p>
    </div>
    <div class="sponsor4"><img src="https://media.istockphoto.com/id/1293938434/photo/african-woman-using-smartphone-wearing-traditional-islamic-clothes.jpg?s=612x612&w=0&k=20&c=UKA6fltzJjgXcz4RaNBRrOXEl_qBUV0qGQ6DZ5vVxNw=" alt="an mp">
    <h4>Hon. Amina Yusuf</h4>
    <p></p>
    </div>
  
   </div>
  `;
}

// Templates
function commentsCard(comment) {
  return `
    <div class="cardDiv">
      <h2 class="cardH2">${comment.author}</h2>
      <h3 class="cardH3">${comment.billName}</h3>
      <p class="cardP">${comment.comment}</p>
    </div>
  `;
}

function billCard(bill) {
  return `
    <div class="billSection">
      <h1 class="billH1">${bill.title}</h1>
      <p class="billP">${bill.summary}</p>
      <h4 class="billH4">${bill.status}</h4>
      <h4 class="billH4">${bill.sponsor}</h4>
      <h4 class="billH4">${bill.dateProposed}</h4>
    </div>
  `;
}

// JOIN logic
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

  // Switch to login
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
        enableBillView();
        enableCommentSubmit();
        // the sponsor comments section
// sponsor class variables
const sponsor1 = document.querySelector(".sponsor1");
const sponsor2 = document.querySelector(".sponsor2");
const sponsor3 = document.querySelector(".sponsor3");
const sponsor4 = document.querySelector(".sponsor4");

    sponsor1.addEventListener("mouseover", () => {
      const p = sponsor1.querySelector("p");
      p.innerHTML = "Let’s eliminate the use of single plastic bags and protect our environment.";
    });
    sponsor1.addEventListener("mouseout", () => {
      sponsor1.querySelector("p").innerHTML = "";
    });


    sponsor2.addEventListener("mouseover", () => {
      const p = sponsor2.querySelector("p");
      p.innerHTML = "We are working toward free education for every child.";
    });
    sponsor2.addEventListener("mouseout", () => {
      sponsor2.querySelector("p").innerHTML = "";
    });


    sponsor3.addEventListener("mouseover", () => {
      const p = sponsor3.querySelector("p");
      p.innerHTML = "Every citizen deserves equal access to healthcare.";
    });
    sponsor3.addEventListener("mouseout", () => {
      sponsor3.querySelector("p").innerHTML = "";
    });


    sponsor4.addEventListener("mouseover", () => {
      const p = sponsor4.querySelector("p");
      p.innerHTML = "Digital access and affordable internet is a basic right.";
    });
    sponsor4.addEventListener("mouseout", () => {
      sponsor4.querySelector("p").innerHTML = "";
    });

      } else {
        alert("No account found. Please sign up.");
        joinBtn.click(); 
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong during login.");
    }
  });

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

    const newUser = { name, email, password, country, county };

    try {
      const res = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser)
      });

      if (res.ok) {
        alert("Signup successful!");
        userDetails.style.display = "none";
        acceptedDisplay.innerHTML = authorized();
        firstContainer.style.display = "none";
        fetchComments();
        enableBillView();
        enableCommentSubmit();
      } else {
        alert("Signup failed. Try again.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("Something went wrong during signup.");
    }
  });
});

// Fetch comments
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

// View bills
function enableBillView() {
  const viewBillBtn = document.querySelector("#viewBill");
  if (viewBillBtn) {
    viewBillBtn.addEventListener("click", () => {
      fetch("http://localhost:3000/bills")
        .then(res => res.json())
        .then(bills => {
          const billDisplay = document.querySelector(".billDisplay");
          billDisplay.innerHTML = ""; // clear previous
          bills.forEach(bill => {
            billDisplay.innerHTML += billCard(bill);
          });
        })
        .catch(err => console.error("Bill fetch error:", err));
    });
  }
}

// Comment submit (no reload)
function enableCommentSubmit() {
  const addCommentBtn = document.querySelector("#addComment");
  if (addCommentBtn) {
    addCommentBtn.addEventListener("click", (e) => {
      e.preventDefault();

      const billName = document.querySelector("#titleInput").value.trim();
      const author = document.querySelector("#nameInput").value.trim();
      const comment = document.querySelector("#commentInput").value.trim();

      if (!billName || !author || !comment) {
        alert("Please fill in all fields");
        return;
      }

      const newComment = { billName, author, comment };

      fetch("http://localhost:3000/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newComment)
      })
        .then(res => res.json())
        .then(() => {
          fetchComments(); 
          document.querySelector("#titleInput").value = "";
          document.querySelector("#nameInput").value = "";
          document.querySelector("#commentInput").value = "";
        })
        .catch(err => {
          console.error("Post error:", err);
          alert("Failed to submit comment");
        });
    });
  }
}
// // the sponsor comments section
// // sponsor class variables
// const sponsor1 = document.querySelector(".sponsor1");
// const sponsor2 = document.querySelector(".sponsor2");
// const sponsor3 = document.querySelector(".sponsor3");
// const sponsor4 = document.querySelector(".sponsor4");

// sponsor1.addEventListener("mouseover", () => {
//   const p = sponsor1.querySelector("p");
//   p.innerHTML = "Let’s eliminate the use of single plastic bags and protect our environment.";
// });

// sponsor2.addEventListener("mouseover", () => {
//   const p = sponsor2.querySelector("p");
//   p.innerHTML = "We are working toward free education for every child.";
// });

// sponsor3.addEventListener("mouseover", () => {
//   const p = sponsor3.querySelector("p");
//   p.innerHTML = "Every citizen deserves equal access to healthcare.";
// });

// sponsor4.addEventListener("mouseover", () => {
//   const p = sponsor4.querySelector("p");
//   p.innerHTML = "Digital access and affordable internet is a basic right.";
// });
