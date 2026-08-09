//DriveHub

// Capture any initial hash and clear it immediately so the browser doesn't auto-jump.
// We'll smooth-scroll to the saved id after DOM is ready.
let _initialHashId = '';
if (location.hash) {
  _initialHashId = location.hash.replace('#', '');
  try {
    history.replaceState(null, '', location.pathname + location.search);
  } catch (err) {
    // ignore
  }
  try { window.scrollTo(0, 0); } catch (e) {}
}

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
    text: "Learner Licence &mdash; Study and pass the theory (road rules) test and display your L plates. You must be supervised while driving and use this time to build experience with basic vehicle control and road rules.",
    image: 'Images/learners.png'
  },
  {
    title: 'Restricted',
    text: "Restricted Licence &mdash; After passing the practical driving test you can drive without a supervisor during set hours, but some restrictions remain while you build experience and reduce risk.",
    image: 'Images/drivingWheel.png'
  },
  {
    title: 'Full',
    text: "Full Licence &mdash; When you have met testing and experience requirements. A full licence removes restricted limits and gives you full driving privileges on New Zealand roads.",
    image: 'Images/fullCar.png'
  }
];

const licenseCardsContainer = document.getElementById('licenseCards');

//  "Important: 2027 Changes" - future proofing
(function add2027ChangesSection() {
  const detailsContainer = document.querySelector('.license-details');
  if (!detailsContainer) return;

  const changesSection = document.createElement('section');
  changesSection.id = 'changes-2027';
  changesSection.className = 'license-detail-section';
  changesSection.innerHTML = `
    <h2>Important: 2027 Changes</h2>
    <p>NZTA says the car licensing system will change on <strong>25 January 2027</strong>. Until then, the current system applies.</p>

    <h3>Learner</h3>
    <p>For people <strong>under 25</strong>, the learner period will increase from <strong>6 months to 12 months</strong>. An approved practical driving course or qualifying supervised driving hours may reduce this back to 6 months. For people <strong>25 and over</strong>, the learner period remains 6 months.</p>

    <h3>Restricted</h3>
    <p>For drivers under 25, the restricted period will change to <strong>12 months</strong> rather than 18 months. The restricted practical test will also include a <strong>hazard perception component</strong>.</p>

    <h3>Full</h3>
    <p>One of the major announced changes is that the <strong>full practical test will be removed</strong> under the new system. The full licence application fee is also scheduled to change.</p>

    <p><a class="license-card-button" href="https://www.nzta.govt.nz/driver-licences" target="_blank" rel="noopener noreferrer">More information on NZTA <span aria-hidden="true">&rarr;</span></a></p>
  `;

  detailsContainer.appendChild(changesSection);
})();

if (licenseCardsContainer) {
  licenseCards.forEach((card) => {
    const cardElement = document.createElement('div');
    cardElement.className = 'license-card';
    const isFullLicense = card.title === 'Full';

    const slug = card.title.toLowerCase();

    cardElement.innerHTML = `
      <img src="${card.image}" alt="${card.title}" class="license-card-image${isFullLicense ? ' license-card-image--full' : ''}">
      <h2>${card.title}</h2>
      <p>${card.text}</p>
      <a class="license-card-button" href="license.html#${slug}">Learn more <span aria-hidden="true">&rarr;</span></a>
    `;

    licenseCardsContainer.appendChild(cardElement);
  });
}

  //License detailed sections 
  if (document.getElementById('learner') || document.getElementById('restricted') || document.getElementById('full')) {
    licenseCards.forEach((card) => {
      const id = card.title.toLowerCase();
      const section = document.getElementById(id);
      if (!section) return;
    if (id === 'learner') {
      section.innerHTML = `
        <h2>Learner Licence</h2>
        <h3>What is a learner licence?</h3>
        <p>A learner licence is the <strong>first stage</strong> of getting a New Zealand car licence. It allows you to learn to drive on public roads while being supervised by an appropriately qualified driver.</p>
        <p>You must be <strong>at least 16 years old</strong> to apply.</p>

        <h3>How to get a learner licence</h3>
        <p>You need to:</p>
        <ol>
          <li>Be at least 16 years old.</li>
          <li>Learn the New Zealand road rules.</li>
          <li>Apply at a driver licensing agent.</li>
          <li>Provide acceptable identification.</li>
          <li>Meet the required eyesight standard.</li>
          <li>Have your photograph and signature taken.</li>
          <li>Pay the application fee.</li>
          <li>Pass the learner theory test.</li>
        </ol>
        <p>The learner test checks your knowledge of New Zealand road rules and safe driving practices.</p>

        <h3>Learner licence conditions</h3>
        <ul>
          <li>You <strong>must have a supervisor sitting beside you</strong>.</li>
          <li>The supervisor must be appropriately qualified to supervise you.</li>
          <li>Your vehicle must display <strong>L plates at the front and rear</strong>.</li>
          <li>You can carry passengers, but your supervisor must agree to this.</li>
          <li>You must follow all other road rules and licence conditions.</li>
        </ul>

        <h3>Supervisor</h3>
        <p>A supervisor is there to help you learn and is responsible for supervising your driving. For a Class 1 learner driver, the supervisor must generally have held a <strong>full New Zealand licence for the same class of vehicle for at least two years</strong>.</p>

        <h3>Alcohol</h3>
        <p>If you are <strong>under 20</strong>, you must not drive after consuming any alcohol. If you are 20 or older, the current adult alcohol limits apply.</p>

        <h3>Moving to a restricted licence</h3>
        <p>Under the current system, you generally need to hold your learner licence for at least <strong>6 months</strong> before progressing to a restricted licence, subject to the applicable requirements.</p>
      `;
    } else if (id === 'restricted') {
      section.innerHTML = `
        <h2>Restricted Licence</h2>
        <h3>What is a restricted licence?</h3>
        <p>A restricted licence is the <strong>second stage</strong> of the graduated licensing system.</p>
        <p>It gives you more independence because you can drive without a supervisor during certain hours, but there are still restrictions designed to reduce risk while you gain experience.</p>

        <h3>How to get a restricted licence</h3>
        <p>You need to:</p>
        <ol>
          <li>Have held your learner licence for the required period.</li>
          <li>Build up enough practical driving experience.</li>
          <li>Apply for the restricted licence.</li>
          <li>Meet the eyesight and identification requirements.</li>
          <li>Pass the <strong>restricted practical driving test</strong>.</li>
        </ol>
        <p>The restricted practical test assesses your ability to drive safely and follow the road rules.</p>

        <h3>Driving without a supervisor</h3>
        <p>One of the biggest differences between a learner and restricted licence is that you can drive without a supervisor during certain hours.</p>

        <h4>5am&ndash;10pm</h4>
        <p>You can generally drive <strong>without a supervisor between 5am and 10pm</strong>.</p>

        <h4>10pm&ndash;5am</h4>
        <p>Between <strong>10pm and 5am</strong>, you must have a supervisor in the front passenger seat if you want to drive.</p>

        <h3>Passenger restrictions</h3>
        <p>When driving without a supervisor, you cannot simply carry anyone you want. There are specific exceptions for passengers such as:</p>
        <ul>
          <li>Your spouse or partner</li>
          <li>Your dependent children</li>
          <li>Your parent or guardian</li>
          <li>Certain relatives who live with you and receive a social security benefit</li>
          <li>Someone for whom you are the primary caregiver</li>
        </ul>
        <p>You should be prepared to provide evidence that a passenger fits an applicable exception if requested by Police.</p>

        <h3>Automatic vehicles</h3>
        <p>If you sit your restricted practical test in an <strong>automatic vehicle</strong>, an automatic-only condition can be placed on your licence. This means you can only drive automatic vehicles without a supervisor. The condition does not apply when you are driving with a supervisor.</p>

        <h3>Alcohol</h3>
        <p>If you are <strong>under 20</strong>, you have a <strong>zero alcohol limit</strong> — you must not drive after drinking any alcohol. For drivers aged 20 or over, the adult alcohol limits apply.</p>

        <h3>Restricted licence duration</h3>
        <p>A restricted licence normally expires after <strong>10 years</strong>, so you should check the expiry date on your licence.</p>

        <h3>Moving to a full licence</h3>
        <p>Under the <strong>current system</strong>, drivers under 25 generally need to hold their restricted licence for:</p>
        <ul>
          <li><strong>18 months</strong> without an approved advanced driving course</li>
          <li><strong>12 months</strong> with an approved advanced driving course</li>
        </ul>
        <p>For drivers aged 25 or older:</p>
        <ul>
          <li><strong>6 months</strong> without an approved course</li>
          <li><strong>3 months</strong> with an approved course</li>
        </ul>
        <p>You also need to meet the requirements for obtaining a full licence.</p>
      `;
    } else if (id === 'full') {
      section.innerHTML = `
        <h2>Full Licence</h2>
        <h3>What is a full licence?</h3>
        <p>A full licence is the <strong>third and final stage</strong> of the standard Class 1 graduated licensing system.</p>
        <p>It allows you to drive independently without the restricted-licence conditions. Once you pass the full licence practical test, the restricted conditions no longer apply.</p>

        <h3>Age requirement</h3>
        <p>Under the current system:</p>
        <ul>
          <li>You must be <strong>18</strong> to get a full licence without completing an approved advanced driving course.</li>
          <li>If you complete an approved advanced driving course, you can get your full licence from <strong>17½</strong>, provided you meet the other requirements.</li>
        </ul>

        <h3>How to get a full licence</h3>
        <p>You need to:</p>
        <ol>
          <li>Hold your restricted licence for the required period.</li>
          <li>Meet the age requirement.</li>
          <li>Apply at a driver licensing agent.</li>
          <li>Provide acceptable identification.</li>
          <li>Meet the eyesight requirement.</li>
          <li>Provide your approved course certificate if applicable.</li>
          <li>Pay the application fee.</li>
          <li>Book and pass the <strong>full practical driving test</strong>.</li>
        </ol>

        <h3>Full practical test</h3>
        <p>The current full licence practical test is approximately <strong>30 minutes</strong>. A testing officer assesses whether your driving is safe enough to progress to a full licence.</p>

        <h3>Restrictions removed</h3>
        <p>After obtaining a full licence, you no longer have the restricted licence conditions. This means you can drive independently without:</p>
        <ul>
          <li>A supervisor</li>
          <li>Restricted driving hours</li>
          <li>Restricted passenger conditions</li>
        </ul>
        <p>You can drive vehicles covered by your Class 1 licence, subject to the normal road rules and any conditions shown on your licence.</p>

        <h3>Alcohol</h3>
        <p>Getting a full licence does <strong>not</strong> remove the zero-alcohol requirement if you are under 20. Drivers under 20 must still have a zero alcohol limit.</p>
      `;
    } else {
      section.innerHTML = `
        <h2>${card.title}</h2>
        <p>${card.text}</p>
        <p>More details and guidance will be added here. Use this area to expand on common requirements, tips, practice tasks, and links to resources.</p>
      `;
    }
    });
  }


function getHeaderOffset() {
  const topnav = document.querySelector('.topnav');
  return topnav ? topnav.offsetHeight : 0;
}

function smoothScrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const offset = getHeaderOffset() + 12; // small gap
  const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
  window.scrollTo({ top, behavior: 'smooth' });
}

// Licnse note
document.addEventListener('DOMContentLoaded', () => {
  try {
    const note = document.querySelector('.license-note');
    if (!note) return;
    const nztaLink = '<a href="https://www.nzta.govt.nz/driver-licences" target="_blank" rel="noopener noreferrer">Driver Licences</a>';
    note.innerHTML = `Note: Licensing requirements may change. Check NZTA &mdash;${nztaLink}for the latest details.`;
    // Add the purple, compact and full-bleed styles
    note.classList.add('license-note--purple', 'license-note--full');
    if (_initialHashId) {
      setTimeout(() => smoothScrollToId(_initialHashId), 80);
    }
  } catch (err) {
    // fail silently
  }
});

// Intercept clicks on anchors that target the same page (including full path links)
document.addEventListener('click', (e) => {
  const a = e.target.closest('a[href]');
  if (!a) return;
  try {
    const url = new URL(a.href, location.href);
    if (url.hash && url.pathname === location.pathname) {
      e.preventDefault();
      const id = url.hash.replace('#', '');
      // Do not write the hash into history; just smooth-scroll
      smoothScrollToId(id);
    }
  } catch (err) {
    // ignore malformed URLs
  }
});

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
