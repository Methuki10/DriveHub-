//DriveHub

// =====================
// Home Page
// =====================
const homeHeading = document.getElementById("homeheading");
if (homeHeading) {
  homeHeading.textContent = "DriveHub";
}

const homeDescription = document.getElementById("home_description");
if (homeDescription) {
  homeDescription.textContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
}

// =====================
// License Page
// =====================
const licenseCards = [
  {
    title: "Learner",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "images/learners.png"
  },
  {
    title: "Restricted",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "images/drivingWheel2.png"
  },
  {
    title: "Full",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "images/fullCar.png"
  }
];

const licenseCardsContainer = document.getElementById("licenseCards");

if (licenseCardsContainer) {
  licenseCards.forEach((card) => {
    const cardElement = document.createElement("div");
    cardElement.className = "license-card";
    const isFullLicense = card.title === "Full";

    cardElement.innerHTML = `
      <img src="${card.image}" alt="${card.title}" class="license-card-image${isFullLicense ? " license-card-image--full" : ""}">
      <h2>${card.title}</h2>
      <p>${card.text}</p>
    `;

    licenseCardsContainer.appendChild(cardElement);
  });
}

// =====================
// Driving Page
// =====================
const drivingTips = [
  {
    title: "Staying Safe on the Road",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ",
    side: "left"
  },
  {
    title: "Driving in Aotearoa",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ",
    side: "right"
  }
];

const drivingTipsContainer = document.getElementById("drivingTips");

if (drivingTipsContainer) {
  drivingTips.forEach((tip) => {
    const tipElement = document.createElement("article");
    tipElement.className = `driving-tip driving-tip--${tip.side}`;
    tipElement.innerHTML = `
      <h2>${tip.title}</h2>
      <p>${tip.text}</p>
    `;

    drivingTipsContainer.appendChild(tipElement);
  });
}

// =====================
// Resources Page
// =====================
const resources = [
  {
    title: "Getting and Managing Your Licence",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    contact: "0800 000 000",
    website: "www.example.govt.nz"
  },
  {
    title: "Car Accident Help",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    contact: "0800 111 111",
    website: "www.example.govt.nz"
  },
  {
    title: "Road Tolls",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    contact: "0800 222 222",
    website: "www.example.govt.nz"
  },
  {
    title: "About Your Car",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    contact: "0800 333 333",
    website: "www.example.govt.nz"
  }
];

const resourcesGrid = document.getElementById("resourcesGrid");

if (resourcesGrid) {
  resources.forEach((resource) => {
    const resourceCard = document.createElement("article");
    resourceCard.className = "resource-card";
    resourceCard.innerHTML = `
      <h2>${resource.title}</h2>
      <p>${resource.description}</p>
      <div class="resource-details">
        <p><strong>Contact:</strong> ${resource.contact}</p>
        <p><strong>Website:</strong> <a href="https://${resource.website}" target="_blank" rel="noopener noreferrer">${resource.website}</a></p>
      </div>
    `;

    resourcesGrid.appendChild(resourceCard);
  });
}

// =====================
// Login / Sign-Up Page
// =====================
const authMessage = document.getElementById("authMessage");
const signupForm = document.getElementById("signupForm");
const loginForm = document.getElementById("loginForm");

const getStoredUsers = () => {
  try {
    return JSON.parse(localStorage.getItem("drivehubUsers") || "[]");
  } catch (error) {
    return [];
  }
};

const saveUsers = (users) => {
  localStorage.setItem("drivehubUsers", JSON.stringify(users));
};

const setLoggedInUser = (email) => {
  localStorage.setItem("drivehubLoggedInUser", email);
};

const getLoggedInUser = () => localStorage.getItem("drivehubLoggedInUser");

const showMessage = (message, isError = false) => {
  if (authMessage) {
    authMessage.textContent = message;
    authMessage.className = `auth-message${isError ? " error" : ""}`;
  }
};

if (signupForm) {
  signupForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("signupName").value.trim();
    const email = document.getElementById("signupEmail").value.trim().toLowerCase();
    const password = document.getElementById("signupPassword").value;

    if (!name || !email || !password) {
      showMessage("Please fill in all sign-up fields.", true);
      return;
    }

    const users = getStoredUsers();
    const userExists = users.some((user) => user.email === email);

    if (userExists) {
      showMessage("An account with that email already exists.", true);
      return;
    }

    users.push({ name, email, password });
    saveUsers(users);
    setLoggedInUser(email);
    showMessage("Account created successfully. You can now log in.");
  });
}

if (loginForm) {
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = document.getElementById("loginEmail").value.trim().toLowerCase();
    const password = document.getElementById("loginPassword").value;

    const users = getStoredUsers();
    const matchingUser = users.find((user) => user.email === email && user.password === password);

    if (!matchingUser) {
      showMessage("Invalid email or password.", true);
      return;
    }

    setLoggedInUser(email);
    showMessage("Login successful.");
  });
}
