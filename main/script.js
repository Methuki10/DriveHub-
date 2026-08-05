//DriveHub

const currentPage = window.location.pathname.split('/').pop() || "home.html";
const navLinks = document.querySelectorAll('.nav-links a');

navLinks.forEach((link) => {
  const linkPage = link.getAttribute('href');

  if (linkPage === currentPage) {
    link.classList.add('active');
  }
});

// =====================
// Home Page
// =====================
const homeHeading = document.getElementById('homeheading');
if (homeHeading) {
  homeHeading.textContent = 'DriveHub';
}

const homeDescription = document.getElementById('home_description');
if (homeDescription) {
  homeDescription.textContent = 'Explore driving, licensing, and road-safety resources for Aotearoa, plus practice support to build confidence on the road.';
}

// =====================
// Home Page Content Data
// =====================
const homeSectionData = {
  title: 'Learn about driving resources',
  description: 'Scroll down for important Aotearoa driving and licensing information, plus practical tips to help you stay safe on the road.',
  featureBoxes: [
    {
      heading: 'Important resources',
      text: 'Find the key driving and licensing information you need in Aotearoa to keep yourself safe and prepared.',
      label: 'View resources',
      href: 'resources.html',
      side: 'left'
    },
    {
      heading: 'Driving tips',
      text: 'Learn safe driving habits, test strategies, and route planning advice.',
      label: 'Read Tips',
      href: 'driving.html',
      side: 'right'
    }
  ],
  actionBoxes: [
    {
      image: 'Images/License.png',
      imageAlt: 'Licenses illustration',
      heading: 'Licenses',
      text: 'Explore license categories and understand what each stage of driver training requires.',
      label: 'View Licenses',
      href: 'license.html',
      side: 'left'
    },
    {
      image: 'Images/computer.png',
      imageAlt: 'Study material illustration',
      heading: 'Pass your theory test',
      text: 'Access study material, sample questions, and resources to help you prepare.',
      label: 'Explore Resources',
      href: 'resources.html',
      side: 'right'
    }
  ]
};

document.addEventListener('DOMContentLoaded', () => {
  // =====================
  // Home Section Rendering
  // =====================
  const homeSectionContent = document.getElementById('homeSectionContent');

  if (homeSectionContent) {
    homeSectionContent.innerHTML = `
      <div class="home-details-content">
        <h2>${homeSectionData.title}</h2>
        <p>${homeSectionData.description}</p>
      </div>
      <div class="feature-boxes">
        ${homeSectionData.featureBoxes
          .map(
            (box) => `
          <article class="feature-box feature-box--${box.side}">
            <h3>${box.heading}</h3>
            <p>${box.text}</p>
            <a class="feature-box-button" href="${box.href}">${box.label} <span aria-hidden="true">→</span></a>
          </article>`
          )
          .join('')}
      </div>
      <div class="action-boxes">
        ${homeSectionData.actionBoxes
          .map(
            (box) => `
          <article class="action-box action-box--${box.side}">
            <img class="action-box-image" src="${box.image}" alt="${box.imageAlt}">
            <div>
              <h3>${box.heading}</h3>
              <p>${box.text}</p>
              <a class="action-box-link" href="${box.href}">${box.label} <span aria-hidden="true">→</span></a>
            </div>
          </article>`
          )
          .join('')}
      </div>
    `;
  }

  // =====================
  // Home Page Scroll Behavior
  // =====================
  const startDrivingButton = document.getElementById('startDrivingButton');
  const heroSection = document.querySelector('.hero');
  const learnMoreSection = document.getElementById('learn-more');

  if (startDrivingButton) {
    startDrivingButton.addEventListener('click', (event) => {
      event.preventDefault();

      if (heroSection) {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        window.scrollTo({ top: heroBottom, behavior: 'smooth' });
        return;
      }

      if (learnMoreSection) {
        learnMoreSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  // =====================
  // Scroll-triggered Reveal
  // =====================
  const featureBoxes = document.querySelectorAll('.feature-box, .action-box');

  if ('IntersectionObserver' in window && featureBoxes.length) {
    const observer = new IntersectionObserver(
      (entries, observerInstance) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observerInstance.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.35 }
    );

    featureBoxes.forEach((box) => observer.observe(box));
  } else {
    featureBoxes.forEach((box) => box.classList.add('visible'));
  }
});

// =====================
// License Page
// =====================
const licenseCards = [
  {
    title: 'Learner',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    image: 'images/learners.png'
  },
  {
    title: 'Restricted',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    image: 'images/drivingWheel2.png'
  },
  {
    title: 'Full',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    image: 'images/fullCar.png'
  }
];

const licenseCardsContainer = document.getElementById('licenseCards');

if (licenseCardsContainer) {
  licenseCards.forEach((card) => {
    const cardElement = document.createElement('div');
    cardElement.className = 'license-card';
    const isFullLicense = card.title === 'Full';

    cardElement.innerHTML = `
      <img src="${card.image}" alt="${card.title}" class="license-card-image${isFullLicense ? ' license-card-image--full' : ''}">
      <h2>${card.title}</h2>
      <p>${card.text}</p>
      <button class="license-card-button" type="button">Learn more <span aria-hidden="true">→</span></button>
    `;

    licenseCardsContainer.appendChild(cardElement);
  });
}

// =====================
// Driving Page
// =====================
const drivingTips = [
  {
    title: 'Staying Safe on the Road',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    side: 'left'
  },
  {
    title: 'Driving in Aotearoa',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    side: 'right'
  }
];

const drivingTipsContainer = document.getElementById('drivingTips');

if (drivingTipsContainer) {
  drivingTips.forEach((tip) => {
    const tipElement = document.createElement('article');
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
    title: 'Getting and Managing Your Licence',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    contact: '0800 000 000',
    website: 'www.example.govt.nz'
  },
  {
    title: 'Car Accident Help',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    contact: '0800 111 111',
    website: 'www.example.govt.nz'
  },
  {
    title: 'Road Tolls',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    contact: '0800 222 222',
    website: 'www.example.govt.nz'
  },
  {
    title: 'About Your Car',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    contact: '0800 333 333',
    website: 'www.example.govt.nz'
  }
];

const resourcesGrid = document.getElementById('resourcesGrid');

if (resourcesGrid) {
  resources.forEach((resource) => {
    const resourceCard = document.createElement('article');
    resourceCard.className = 'resource-card';

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
const authMessage = document.getElementById('authMessage');
const signupForm = document.getElementById('signupForm');
const loginForm = document.getElementById('loginForm');

const getStoredUsers = () => {
  try {
    return JSON.parse(localStorage.getItem('drivehubUsers') || '[]');
  } catch (error) {
    return [];
  }
};

const saveUsers = (users) => {
  localStorage.setItem('drivehubUsers', JSON.stringify(users));
};

const setLoggedInUser = (email) => {
  localStorage.setItem('drivehubLoggedInUser', email);
};

const getLoggedInUser = () => localStorage.getItem('drivehubLoggedInUser');

const showMessage = (message, isError = false) => {
  if (authMessage) {
    authMessage.textContent = message;
    authMessage.className = `auth-message${isError ? ' error' : ''}`;
  }
};

if (signupForm) {
  signupForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('signupName').value.trim();
    const email = document.getElementById('signupEmail').value.trim().toLowerCase();
    const password = document.getElementById('signupPassword').value;

    if (!name || !email || !password) {
      showMessage('Please fill in all sign-up fields.', true);
      return;
    }

    const users = getStoredUsers();
    const userExists = users.some((user) => user.email === email);

    if (userExists) {
      showMessage('An account with that email already exists.', true);
      return;
    }

    users.push({ name, email, password });
    saveUsers(users);
    setLoggedInUser(email);
    showMessage('Account created successfully. You can now log in.');
  });
}

if (loginForm) {
  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const email = document.getElementById('loginEmail').value.trim().toLowerCase();
    const password = document.getElementById('loginPassword').value;

    const users = getStoredUsers();
    const matchingUser = users.find((user) => user.email === email && user.password === password);

    if (!matchingUser) {
      showMessage('Invalid email or password.', true);
      return;
    }

    setLoggedInUser(email);
    showMessage('Login successful.');
  });
}
