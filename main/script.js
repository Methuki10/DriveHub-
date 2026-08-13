//DriveHub

// Smooth Scroolling 
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

// Advanced technique: non-trivial string manipulation splits the URL path to identify this page.
const currentPage = window.location.pathname.split('/').pop() || "home.html";
const navLinks = document.querySelectorAll('.nav-links a');

navLinks.forEach((link) => {
  const linkPage = link.getAttribute('href');

  if (linkPage === currentPage) {
    link.classList.add('active');
  }
});


// Adds the reveal animation after the dynamically generated boxes exist.
const revealHomeBoxes = () => {
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
};


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

// Advanced technique: GUI event runs this code once the page's HTML has loaded.
document.addEventListener('DOMContentLoaded', () => {
  // =====================
  // Home Section Feauture Boxes
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

    revealHomeBoxes();
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

// License note
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

  // Description under the Driving page heading when present
  try {
    const drivingContent = document.querySelector('.driving-page-content');
    if (drivingContent) {
      const existingDesc = drivingContent.querySelector('.driving-description');
      if (!existingDesc) {
        const desc = document.createElement('p');
        desc.className = 'driving-description';
        desc.innerHTML = '<span class="driving-lead">Learn to Drive Safely</span> Driving is a responsibility. Every time you get behind the wheel, you are responsible for your own safety and the safety of everyone around you. DriveHub provides simple information to help new drivers understand safe driving habits, New Zealand roads and what to expect when driving in Aotearoa.';
        const heading = drivingContent.querySelector('h1');
        if (heading && heading.parentNode) {
          heading.parentNode.insertBefore(desc, heading.nextSibling);
        } else {
          drivingContent.insertBefore(desc, drivingContent.firstChild);
        }
      }
    }
  } catch (err) {
    // ignore
  }
  
const drivingTips = [
  {
    title: 'Staying Safe on the Road',
    text: `
      <h3>Stay Focused</h3>
      <p>Driving requires your full attention. Keep your eyes on the road, check your mirrors regularly and stay aware of what is happening around you.</p>
      <p>Avoid distractions such as using your phone, changing music, eating or having complicated conversations while driving. If you need to use your phone or deal with something that takes your attention away from driving, pull over and park somewhere safe first.</p>
      <p><strong>Remember:</strong> Even looking away from the road for a few seconds can mean travelling a significant distance without seeing what is ahead.</p>

      <h3>Keep a Safe Following Distance</h3>
      <p>Leave enough space between your vehicle and the vehicle in front of you. This gives you more time to react if the vehicle ahead suddenly slows or stops.</p>
      <p>Use the <strong>2-second rule</strong> in good conditions. Increase this to <strong>4 seconds</strong> when conditions are wet, slippery, dark or otherwise difficult.</p>
      <p>A safe gap is especially important at higher speeds because you need more time and distance to stop.</p>

      <h3>Drive at a Safe Speed</h3>
      <p>Speed limits show the maximum legal speed for a road, but they do not mean you should always drive at that speed.</p>
      <p>You may need to drive slower when:</p>
      <ul>
        <li>The road is wet or slippery</li>
        <li>Visibility is poor</li>
        <li>There is heavy traffic</li>
        <li>The road is narrow or winding</li>
        <li>There are pedestrians or cyclists nearby</li>
        <li>You are approaching a hazard</li>
        <li>Roadworks are taking place</li>
      </ul>
      <p>Choose a speed that allows you to stay in control and safely respond to hazards.</p>

      <h3>Wear Your Seatbelt</h3>
      <p>Everyone travelling in a vehicle must wear a seatbelt or use an appropriate child restraint.</p>
      <p>Always check that your seatbelt is correctly fastened before starting the vehicle. Seatbelts help protect drivers and passengers if a crash occurs.</p>

      <h3>Avoid Driving When Tired</h3>
      <p>Fatigue can make it harder to concentrate, react quickly and make good decisions.</p>
      <p>Signs that you may be becoming tired include:</p>
      <ul>
        <li>Frequent yawning</li>
        <li>Difficulty keeping your eyes open</li>
        <li>Trouble concentrating</li>
        <li>Missing signs or exits</li>
        <li>Drifting within your lane</li>
        <li>Feeling restless or irritable</li>
      </ul>
      <p>If you become tired while driving, do not try to push through it. Stop somewhere safe and take a break. On longer journeys, plan regular rest stops.</p>

      <h3>Keep Your Vehicle Safe</h3>
      <p>Before driving, make sure your vehicle is safe to use. Check:</p>
      <ul>
        <li>Tyres</li>
        <li>Lights</li>
        <li>Mirrors</li>
        <li>Windscreen</li>
        <li>Wipers</li>
        <li>Seatbelts</li>
        <li>Fuel or battery level</li>
        <li>Warrant of Fitness (WoF) and registration</li>
      </ul>
      <p>Make sure anything you are carrying is secured so it cannot move around inside the vehicle or become a hazard..</p>
    `,
    side: 'left'
  },
  {
    title: 'Driving in Aotearoa',
    text: `
      <h3>Driving on the Left</h3>
      <p>New Zealand drives on the <strong>left-hand side of the road</strong>.</p>
      <p>When turning or changing lanes, always check your mirrors and blind spots and make sure it is safe before moving.</p>
      <p>If you are new to driving in New Zealand, take extra care at intersections, roundabouts and multi-lane roads.</p>

      <h3>New Zealand Speed Limits</h3>
      <p>Speed limits vary depending on the road and location.</p>
      <p>In many urban areas, the default speed limit is <strong>50 km/h</strong>, while many rural roads and motorways have higher limits unless signs show otherwise.</p>
      <p>Always look for speed signs and remember that the appropriate speed can be lower than the posted limit when road or weather conditions are difficult.</p>

      <h3>Intersections</h3>
      <p>Intersections are areas where different road users meet, so it is important to approach them carefully.</p>
      <p>Before entering an intersection:</p>
      <ol>
        <li>Check the road ahead.</li>
        <li>Check your mirrors.</li>
        <li>Look for pedestrians, cyclists and other vehicles.</li>
        <li>Follow traffic lights, signs and road markings.</li>
        <li>Give way when required.</li>
        <li>Only proceed when it is safe.</li>
      </ol>
      <p>Understanding <strong>give-way rules</strong> is an important part of becoming a safe New Zealand driver.</p>

      <h3>Roundabouts</h3>
      <p>At a roundabout, slow down and be prepared to stop.</p>
      <p>Look for other vehicles, cyclists and pedestrians and follow the correct lane markings and indicators.</p>
      <p>Before entering a roundabout, make sure you understand which direction other vehicles are travelling and who has priority.</p>

      <h3>Rural Roads</h3>
      <p>Driving in rural areas can be very different from driving in a city.</p>
      <p>You may encounter:</p>
      <ul>
        <li>Narrow roads</li>
        <li>Sharp bends</li>
        <li>Limited visibility</li>
        <li>Gravel or loose surfaces</li>
        <li>Farm vehicles</li>
        <li>Stock</li>
        <li>Cyclists</li>
        <li>Motorcyclists</li>
        <li>One-lane bridges</li>
      </ul>
      <p>Do not assume that a rural road is safe to travel at the maximum speed simply because the speed limit allows it. Slow down when the road or conditions require it.</p>

      <h3>Sharing the Road</h3>
      <p>New Zealand roads are shared by many different road users.</p>
      <p>Be aware of:</p>
      <ul>
        <li>Pedestrians</li>
        <li>Cyclists</li>
        <li>Motorcyclists</li>
        <li>Buses</li>
        <li>Trucks</li>
        <li>Emergency vehicles</li>
        <li>Horse riders</li>
        <li>Farm vehicles</li>
      </ul>
      <p>Give other road users enough space and be patient. Large vehicles may need extra room to turn, stop or change lanes.</p>

      <h3>One-Lane Bridges</h3>
      <p>New Zealand has many one-lane bridges, particularly in rural areas.</p>
      <p>Always look for signs showing which direction has priority. Slow down before reaching the bridge and be prepared to stop if another vehicle has priority.</p>
      <p>Never assume you can cross first.</p>
    `,
    side: 'right'
  }
  ,
  {
    title: 'Driving to the Conditions',
    text: `
      <h3>Rain</h3>
      <p>Rain can reduce visibility and make the road slippery.</p>
      <p>When driving in wet conditions:</p>
      <ul>
        <li>Reduce your speed when necessary.</li>
        <li>Increase your following distance.</li>
        <li>Turn on your headlights when visibility is reduced.</li>
        <li>Avoid sudden braking or steering.</li>
        <li>Watch for water on the road.</li>
      </ul>

      <h3>Fog</h3>
      <p>Fog can make it difficult to see other vehicles, road markings and hazards.</p>
      <p>Slow down and increase your following distance. Use your vehicle's lights appropriately and avoid driving faster than you can safely see ahead.</p>

      <h3>Sun Glare</h3>
      <p>Low sunlight can make it difficult to see.</p>
      <p>Keep your windscreen clean, use your sun visor and slow down if glare affects your visibility.</p>

      <h3>Snow and Ice</h3>
      <p>Some parts of New Zealand experience snow and icy roads during winter.</p>
      <p>Roads can become slippery and stopping distances can increase. Drive carefully, reduce your speed and be especially cautious around shaded areas, bridges and exposed roads.</p>
    `,
    side: 'left'
  },
  {
    title: 'Before You Drive',
    text: `
      <p>Before starting your journey:</p>
      <ol>
        <li><strong>Adjust your seat</strong><br>Make sure you can comfortably reach the pedals and controls.</li>
        <li><strong>Adjust your mirrors</strong><br>Make sure you have a clear view around the vehicle.</li>
        <li><strong>Fasten your seatbelt</strong><br>Check that everyone in the vehicle is properly restrained.</li>
        <li><strong>Remove distractions</strong><br>Put your phone away and set up music or navigation before moving.</li>
        <li><strong>Check your surroundings</strong><br>Look around the vehicle before leaving.</li>
        <li><strong>Plan your journey</strong><br>Know where you are going and allow enough time so you don't feel pressured to drive too quickly.</li>
      </ol>
    `,
    side: 'right'
  },
  {
    title: 'What to Do in an Emergency',
    text: `
      <p>If something goes wrong while driving, stay calm and focus on getting yourself and others to a safe place.</p>
      <p>If your vehicle develops a problem:</p>
      <ul>
        <li>Slow down safely.</li>
        <li>Move to a safe location if possible.</li>
        <li>Turn on your hazard lights when appropriate.</li>
        <li>Stay aware of other traffic.</li>
        <li>Get help if necessary.</li>
      </ul>
      <p>If you are involved in a crash, check whether anyone is injured and make sure the scene is as safe as possible. Follow the appropriate emergency and reporting procedures.</p>
      <p>If there is an immediate danger or someone needs urgent medical assistance, call <strong>111</strong>.</p>
    `,
    side: 'left'
  },
  {
    title: 'Be a Responsible Driver',
    text: `
      <p>Being a good driver is more than simply passing a test.</p>
      <p>A responsible driver:</p>
      <ul>
        <li>Follows the road rules</li>
        <li>Stays focused</li>
        <li>Drives to the conditions</li>
        <li>Controls their speed</li>
        <li>Gives other road users space</li>
        <li>Plans ahead</li>
        <li>Keeps their vehicle safe</li>
        <li>Recognises their own limits</li>
        <li>Makes safety the priority</li>
      </ul>
      <p>The goal isn't just to get your licence, it's to become a driver who helps keep New Zealand's roads safe.</p>
    `,
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
      <div class="driving-tip-body">${tip.text}</div>
    `;

    drivingTipsContainer.appendChild(tipElement);
  });
}

// Table of contents for driving tips so users can jump quickly
const drivingPageContent = document.querySelector('.driving-page-content');
if (drivingTipsContainer && drivingPageContent) {
  // When creating tips earlier we didn't set IDs; ensure each rendered tip has an id
  const tipNodes = Array.from(drivingTipsContainer.querySelectorAll('.driving-tip'));
  if (tipNodes.length === drivingTips.length) {
    tipNodes.forEach((node, idx) => {
      const title = drivingTips[idx].title || node.querySelector('h2')?.textContent || `section-${idx+1}`;
      const slug = title.toLowerCase().replace(/[\s\/]+/g, '-').replace(/[^a-z0-9\-]/g, '');
      node.id = slug;
    });

    // Create TOC nav
    const existingToc = drivingPageContent.querySelector('.driving-toc');
    if (!existingToc) {
      const toc = document.createElement('nav');
      toc.className = 'driving-toc';
      const ul = document.createElement('ul');
      drivingTips.forEach((tip) => {
        const title = tip.title;
        const slug = title.toLowerCase().replace(/[\s\/]+/g, '-').replace(/[^a-z0-9\-]/g, '');
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = `#${slug}`;
        a.textContent = title;
        li.appendChild(a);
        ul.appendChild(li);
      });
      toc.appendChild(ul);

      // Insert TOC after the H1 and before the driving description if present
      const heading = drivingPageContent.querySelector('h1');
      const desc = drivingPageContent.querySelector('.driving-description');
      if (heading && desc) {
        heading.parentNode.insertBefore(toc, desc);
      } else if (heading) {
        heading.parentNode.insertBefore(toc, heading.nextSibling);
      } else {
        drivingPageContent.insertBefore(toc, drivingPageContent.firstChild);
      }
    }
  }
}


// =====================
// Resources Page
// =====================
const resources = [
  {
    title: 'Getting and Managing Your Licence',
    description: 'Find official information about getting, renewing and managing your New Zealand driver licence. You can also book driving tests, find licensing agents and check licence requirements and fees.',
    links: [
      {
        label: 'NZTA - Driver Licences',
        href: 'https://www.nzta.govt.nz/driver-licences',
        description: 'Information about getting, renewing and managing your licence.'
      },
      {
        label: 'Book a Driving Test',
        href: 'https://www.nzta.govt.nz/driver-licences/getting-a-licence/take-your-test',
        description: 'Book, change or cancel a theory or practical test.'
      },
      {
        label: 'Find a Driver Licensing Agent',
        href: 'https://www.nzta.govt.nz/driver-licences/agents',
        description: 'Find an agent where you can apply for or renew your licence.'
      },
      {
        label: 'Driving Offences & Penalties',
        href: 'https://www.nzta.govt.nz/driver-licences/driving-offences-and-penalties',
        description: 'Information about demerit points, fines, suspensions and disqualifications.'
      }
    ],
    contact: '0800 822 422',
    hours: 'Monday-Friday, 8:00am-5:30pm'
  },
  {
    title: 'Car Accident Help',
    description: 'If you are involved in a crash, make sure everyone is safe and get emergency assistance when needed. These resources explain what to do after a crash, how to report an incident and where to get support.',
    links: [
      {
        label: 'NZ Police - Traffic Crash Reporting',
        href: 'https://www.police.govt.nz/use-105/traffic-crash-report',
        description: 'Information about reporting crashes.'
      },
      {
        label: 'NZ Police - 105',
        href: 'https://www.police.govt.nz/use-105',
        description: 'Report non-emergency incidents to Police.'
      },
      {
        label: 'ACC',
        href: 'https://www.acc.org.nz',
        description: 'Information about injury-related claims and support.'
      },
      {
        label: 'NZTA',
        href: 'https://www.nzta.govt.nz/driving-skills/learn-to-drive/roadcode/motorcycle-code/about-your-responsibilities/crashes?_searchAnalytics=eyJpbmRleE5hbWUiOiJuenRhMi1wcm9kLW1haW4tc2l0ZSIsInF1ZXJ5U3RyaW5nIjoiY3Jhc2hlcyIsImRvY3VtZW50SWQiOiJzaWx2ZXJzdHJpcGVfY21zX21vZGVsX3NpdGV0cmVlXzIwNDA2IiwicmVxdWVzdElkIjoiVUdONHF1RzlTOUt1cnBtRVIwbXRFdyJ9',
        description: 'Information about road incidents and transport-related issues.'
      }
    ],
    contact: '',
    contactDetails: [
      {
        label: 'Emergency - Police, Fire or Ambulance',
        value: '111'
      },
      {
        label: 'Police non-emergency',
        value: '105'
      },
      {
        label: 'ACC claims',
        value: '0800 101 996'
      }
    ],
    emergencyNote: 'If someone is injured or there is immediate danger, call 111.',
    hours: '',
    website: ''
  },
  {
    title: 'Road Tolls and Charges',
    description: 'New Zealand has electronic toll roads where drivers are charged for using the road. You can pay a toll online, create a toll account, check your payments or pay a toll payment notice.',
    links: [
      {
        label: 'NZTA - Tolls',
        href: 'https://www.nzta.govt.nz/travelling-on-our-roads/toll-roads',
        description: 'Pay or buy a toll and manage your toll account.'
      },
      {
        label: 'Pay a Toll',
        href: 'https://tollingonline.nzta.govt.nz/#/purchasetrips/prerequisites',
        description: 'Pay for a recent toll-road trip.'
      },
      {
        label: 'Toll Payment Notice',
        href: 'https://tollingonline.nzta.govt.nz/#/notice/prerequisites',
        description: 'Pay a notice if you did not pay within the required period.'
      },
      {
        label: 'Toll Road Information',
        href: 'https://www.nzta.govt.nz/travelling-on-our-roads/toll-roads/toll-road-information',
        description: 'Find toll roads, prices and information about how tolling works.'
      },
      {
        label: 'Toll Accounts',
        href: 'https://tollingonline.nzta.govt.nz/#/create-account/account-type',
        description: 'Create and manage an account for toll payments.'
      }
    ],
    contact: '',
    contactDetails: [
      {
        label: 'NZTA Tolling',
        value: '0800 40 20 20'
      }
    ],
    hours: '',
    website: ''
  },
  {
    title: 'Your Car',
    description: 'Keeping your vehicle safe, registered and road legal is an important part of being a responsible driver. Find information about WoF inspections, vehicle registration, vehicle licensing and other vehicle requirements.',
    links: [
      {
        label: 'NZTA - Vehicles',
        href: 'https://www.nzta.govt.nz/vehicles',
        description: 'General vehicle information and requirements.'
      },
      {
        label: 'Check Your Vehicle',
        href: 'https://transact.nzta.govt.nz/v2/check-expiry',
        description: 'Check vehicle licence, WoF and other vehicle information.'
      },
      {
        label: 'Vehicle Registration (Rego)',
        href: 'https://www.nzta.govt.nz/vehicles/licensing-rego',
        description: 'Renew or manage your vehicle licence.'
      },
      {
        label: 'Warrant of Fitness (WoF)',
        href: 'https://www.nzta.govt.nz/vehicles/warrants-and-certificates',
        description: 'Information about WoF requirements and inspections.'
      },
      {
        label: 'Vehicle Safety',
        href: 'https://www.nzta.govt.nz/vehicles/choosing-the-right-vehicle',
        description: 'Learn about keeping your vehicle safe and roadworthy.'
      },
      {
        label: 'Road User Charges',
        href: 'https://www.nzta.govt.nz/vehicles/road-user-charges',
        description: 'Information for vehicles that are required to pay RUC.'
      }
    ],
    contact: '',
    contactDetails: [
      {
        label: 'NZTA Motor Vehicle Licensing & Registration',
        value: '0800 108 809'
      },
      {
        label: 'NZTA Road User Charges',
        value: '0800 655 644'
      }
    ],
    hours: 'Monday-Friday, 8:00am-5:30pm',
    website: ''
  }
];

const resourcesGrid = document.getElementById('resourcesGrid');

if (resourcesGrid) {
  resources.forEach((resource) => {
    const resourceCard = document.createElement('article');
    resourceCard.className = 'resource-card';

    const resourceId = resource.title
      .toLowerCase()
      .replace(/[\s\/]+/g, '-')
      .replace(/[^a-z0-9\-]/g, '');
    resourceCard.id = resourceId;

    let linksHtml = '';
    if (resource.links) {
      linksHtml = `<ul class="resource-links">${resource.links
        .map(
          (link) => `
        <li>
          <a href="${link.href}" target="_blank" rel="noopener noreferrer"><strong>${link.label}</strong></a>
          <p>${link.description}</p>
        </li>`
        )
        .join('')}</ul>`;
    }

    const formatPhoneValue = (value) => {
      const text = String(value).trim();
      const digits = text.replace(/[^0-9+]/g, '');
      return digits ? `<a href="tel:${digits}">${text}</a>` : text;
    };

    const contactHref = resource.contact ? resource.contact.replace(/[^0-9+]/g, '') : '';
    const contactDetailsHtml = Array.isArray(resource.contactDetails)
      ? resource.contactDetails
          .map(
            (detail) => `<p class="resource-contact-detail"><strong>${detail.label}:</strong> ${formatPhoneValue(detail.value)}</p>`
          )
          .join('')
      : '';

    resourceCard.innerHTML = `
      <h2>${resource.title}</h2>
      <p>${resource.description}</p>
      ${linksHtml}
      <div class="resource-details">
        ${resource.contact ? `<p class="resource-contact"><strong>Contact:</strong> <a href="tel:${contactHref}">${resource.contact}</a></p>` : ''}
        ${contactDetailsHtml}
        ${resource.emergencyNote ? `<p class="resource-emergency-note">${resource.emergencyNote}</p>` : ''}
        ${resource.hours ? `<p class="resource-hours"><strong>Hours:</strong> ${resource.hours}</p>` : ''}
        ${resource.website ? `<p><strong>Website:</strong> <a href="https://${resource.website}" target="_blank" rel="noopener noreferrer">${resource.website}</a></p>` : ''}
      </div>
    `;

    resourcesGrid.appendChild(resourceCard);
  });

  // Table of contents for resources sections.
  const resourcesContent = document.querySelector('.resources-page-content');
  if (resourcesContent) {
    const existingToc = resourcesContent.querySelector('.driving-toc');
    if (!existingToc) {
      const toc = document.createElement('nav');
      toc.className = 'driving-toc';
      const ul = document.createElement('ul');

      resources.forEach((resource) => {
        const slug = resource.title
          .toLowerCase()
          .replace(/[\s\/]+/g, '-')
          .replace(/[^a-z0-9\-]/g, '');
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = `#${slug}`;
        a.textContent = resource.title;
        li.appendChild(a);
        ul.appendChild(li);
      });

      toc.appendChild(ul);
      const heading = resourcesContent.querySelector('h1');
      if (heading) {
        heading.parentNode.insertBefore(toc, heading.nextSibling);
      } else {
        resourcesContent.insertBefore(toc, resourcesContent.firstChild);
      }
    }

    const emergencySection = document.createElement('section');
    emergencySection.className = 'emergency-contacts-panel';
    emergencySection.innerHTML = `
      <h2>Emergency Contacts</h2>
      <div class="emergency-contacts-grid">
        <article class="emergency-contact-item">
          <h3>111 — Emergency</h3>
          <p>Call <strong>111</strong> for Police, Fire or Ambulance when there is an emergency or someone is in immediate danger.</p>
        </article>
        <article class="emergency-contact-item">
          <h3>105 — Police Non-Emergency</h3>
          <p>Call <strong>105</strong> for non-emergency Police matters, including reporting a non-injury traffic crash.</p>
        </article>
        <article class="emergency-contact-item">
          <h3>ACC — Injury Support</h3>
          <p><strong>0800 101 996</strong></p>
          <p>Contact ACC for questions about injury claims and support.</p>
        </article>
      </div>
      <div class="resource-remember">
        <h3>Remember</h3>
        <p>DriveHub provides information and links to help you find the right resources. Driving laws and requirements can change, so always check the official NZTA, NZ Police or ACC website for the most up-to-date information.</p>
      </div>
    `;

    resourcesContent.appendChild(emergencySection);
  }
}


// =====================
// Login / V3
// =====================
const authWelcomeApp = document.getElementById('authWelcomeApp');

if (authWelcomeApp) {
  authWelcomeApp.innerHTML = `
    <section class="auth-welcome-page" aria-labelledby="welcomeHeading">
      <header>
        <p>DriveHub</p>
        <h1 id="welcomeHeading">Your learner hub, all in one place.</h1>
        <span>Sign up to begin, or log in to continue.</span>
      </header>
      <div id="authMessage" class="auth-message" role="status" aria-live="polite"></div>
      <div class="auth-welcome-forms">
        <form id="signupForm" class="auth-form">
          <h2>New here?</h2>
          <p>Create your learner account.</p>
          <label>Full name<input type="text" id="signupName" name="signupName" autocomplete="name" required></label>
          <label>Birthday<input type="date" id="signupBirthday" name="signupBirthday" autocomplete="bday" required></label>
          <label>Email<input type="email" id="signupEmail" name="signupEmail" autocomplete="email" required></label>
          <label>Password<input type="password" id="signupPassword" name="signupPassword" autocomplete="new-password" minlength="8" required></label>
          <button type="submit">Sign up</button>
        </form>
        <form id="loginForm" class="auth-form">
          <h2>Already learning?</h2>
          <p>Pick up where you left off.</p>
          <label>Email<input type="email" id="loginEmail" name="loginEmail" autocomplete="email" required></label>
          <label>Password<input type="password" id="loginPassword" name="loginPassword" autocomplete="current-password" required></label>
          <button type="submit">Log in</button>
        </form>
      </div>
    </section>
  `;
}

const authMessage = document.getElementById('authMessage');
const signupForm = document.getElementById('signupForm');
const loginForm = document.getElementById('loginForm');
const getStoredUsers = () => {
  try {
    const users = JSON.parse(localStorage.getItem('drivehubUsers') || '[]');
    return Array.isArray(users) ? users : [];
  } catch (error) {
    return [];
  }
};


// Advanced technique: function with a parameter saves the supplied users collection.
const saveUsers = (users) => {
  localStorage.setItem('drivehubUsers', JSON.stringify(users));
};

const setLoggedInUser = (email) => {
  localStorage.setItem('drivehubLoggedInUser', email);
};

const getLoggedInUser = () => localStorage.getItem('drivehubLoggedInUser');

// =====================
// Learner Dashboard Layout 2
// =====================
const dashboardV2App = document.getElementById('dashboardV2App');

if (dashboardV2App) {
  const email = getLoggedInUser();
  const user = getStoredUsers().find((storedUser) => storedUser.email === email);

  if (!user) {
    window.location.replace('login.html');
  } else {
    const safeName = user.name.replace(/[&<>"']/g, (character) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }[character]));

    dashboardV2App.innerHTML = `
      <section class="dashboard-v2-page" aria-labelledby="dashboardV2Heading">
        <header class="dashboard-v2-hero">
          <div>
            <p>Learner dashboard · layout </p>
            <h1 id="dashboardV2Heading">Ready for the road, ${safeName}?</h1>
          </div>
        </header>
        <div class="dashboard-v2-main">
          <a class="dashboard-v2-feature" href="practice-quiz.html">
            <span>Start here</span>
            <strong>Practice theory test</strong>
            <small>Work through your questions and review your score.</small>
            <b>Begin practice →</b>
          </a>
          <div class="dashboard-v2-actions">
            <a href="license.html"><strong>Licences</strong><small>Explore the learner licence journey.</small></a>
            <a href="driving.html"><strong>Driving tips</strong><small>Build confidence with useful advice.</small></a>
            <a href="resources.html"><strong>Resources</strong><small>Find important driving information.</small></a>
            <a href="https://www.nzta.govt.nz/driving-skills/learn-to-drive/roadcode" target="_blank" rel="noopener noreferrer"><strong>NZ Road Code</strong><small>Read the official NZTA guide.</small></a>
          </div>
        </div>
        <button id="logoutButtonV2" class="dashboard-v2-logout" type="button">Log out</button>
      </section>
    `;

    document.getElementById('logoutButtonV2').addEventListener('click', () => {
      localStorage.removeItem('drivehubLoggedInUser');
      window.location.href = 'login.html';
    });
  }
}

// =====================
// Practice Theory Test Page
// =====================
// Add your theory-test questions here. `correctAnswer` is the zero-based answer position.
// Advanced technique: multidimensional collection. Each question object contains an answers array.
const practiceTheoryQuestions = [
  {
    question: 'On your learner licence, where must your supervisor sit while you are driving?',
    answers: [
      'In the front passenger seat beside you',
      'In any seat, as long as they can see you drive',
      'In the back seat behind the driver',
      'You can drive alone during the day'
    ],
    correctAnswer: 0,
    explanation: 'A learner driver must have a supervisor sitting in the front passenger seat beside them.'
  },
  {
    question: 'If you are driving a car, what should you do when following another vehicle in wet conditions?',
    answers: [
      'Observe the two-second rule',
      'Observe the four-second rule',
      'Observe the six-second rule',
      'Try to overtake so you are not blinded by spray'
    ],
    correctAnswer: 1,
    explanation: 'Wet roads increase stopping distance, so you need a four-second following gap.'
  },
  {
    question: 'Before overtaking another vehicle, what must you be able to see?',
    answers: [
      'At least 100 metres of clear road for the whole time you are passing',
      'Only the vehicle directly in front of you',
      'A clear road for the first few seconds of the pass',
      'A passing lane somewhere ahead'
    ],
    correctAnswer: 0,
    explanation: 'You must be able to see at least 100 metres of clear road ahead for the entire pass.'
  },
  {
    question: 'In daylight, what must a load that projects more than 1 metre beyond the rear of a vehicle display?',
    answers: [
      'A clean white or fluorescent red, orange or yellow flag',
      'Nothing, if the load is tied down',
      'Only the vehicle hazard lights',
      'A blue flag'
    ],
    correctAnswer: 0,
    explanation: 'A projecting load over 1 metre must display a clearly visible warning flag.'
  },
  {
    question: 'When you are turning right at an intersection, who must you give way to?',
    answers: [
      'Vehicles coming towards you that are going straight ahead or turning left',
      'Only vehicles behind you',
      'Nobody, because you are turning right',
      'Only vehicles turning right'
    ],
    correctAnswer: 0,
    explanation: 'You must give way to oncoming vehicles going straight or turning left.'
  },
  {
    question: 'Under normal driving conditions, what rule should you use to allow a safe following distance?',
    answers: [
      'The one-second rule',
      'The two-second rule',
      'The four-second rule',
      'The six-second rule'
    ],
    correctAnswer: 1,
    explanation: 'Use the two-second rule under normal conditions.'
  },
  {
    question: 'What should you do if sun glare makes it difficult to see while driving?',
    answers: [
      'Keep driving at the same speed and look away from the sun',
      'Speed up to get through the glare faster',
      'Use a sun visor or sunglasses, slow down, and safely pull over if needed',
      'Turn off your headlights'
    ],
    correctAnswer: 2,
    explanation: 'Sun glare reduces visibility — use a visor, adjust speed, or pull over safely.'
  },
  {
    question: 'When entering a roundabout, who must you give way to?',
    answers: [
      'Vehicles that will cross your path from your right',
      'Vehicles approaching from your left only',
      'Vehicles behind you',
      'No one if you are going straight through'
    ],
    correctAnswer: 0,
    explanation: 'Give way to vehicles crossing your path from the right.'
  },
  {
    question: 'At a T-intersection, who must give way?',
    answers: [
      'Traffic on the road that ends must give way to traffic on the continuing road',
      'Traffic on the continuing road must always give way',
      'The vehicle turning left must always give way',
      'The largest vehicle has the right of way'
    ],
    correctAnswer: 0,
    explanation: 'Traffic on the terminating road must give way to traffic on the continuing road.'
  },
  {
    question: 'What must you display on a car when driving on a learner licence?',
    answers: [
      'L plates on the front and rear of the car',
      'A restricted licence plate on the rear only',
      'A full licence plate on the front only',
      'No plates, if a supervisor is in the car'
    ],
    correctAnswer: 0,
    explanation: 'Learner drivers must display L plates on the front and rear.'
  }
];
const quizApp = document.getElementById('quizApp');

if (quizApp) {
  if (!getLoggedInUser()) {
    window.location.replace('login.html');
  } else {
    if (!practiceTheoryQuestions.length) {
      quizApp.innerHTML = `
        <section class="quiz-page" aria-labelledby="quizHeading">
          <div class="quiz-card">
            <p class="dashboard-eyebrow">Practice theory test</p>
            <h1 id="quizHeading">Learner licence practice theory test</h1>
            <p class="quiz-intro">Practice questions are being prepared. Check back soon to test your road-code knowledge.</p>
            <a class="quiz-back" href="dashboard.html">Back to dashboard</a>
          </div>
        </section>
      `;
    } else {
      quizApp.innerHTML = `
      <section class="quiz-page" aria-labelledby="quizHeading">
        <div class="quiz-card">
          <p class="dashboard-eyebrow">Practice theory test</p>
          <h1 id="quizHeading">Learner licence practice theory test</h1>
          <p class="quiz-intro">Answer every question, then submit your test to see your result. This practice test is not an official NZTA theory test.</p>
          <form id="practiceQuizForm">
            ${practiceTheoryQuestions.map((item, questionIndex) => `
              <fieldset class="quiz-question">
                <legend>${questionIndex + 1}. ${item.question}</legend>
                ${item.answers.map((answer, answerIndex) => `
                  <label><input type="radio" name="question${questionIndex}" value="${answerIndex}"> ${answer}</label>
                `).join('')}
              </fieldset>
            `).join('')}
            <button class="quiz-submit" type="submit">Submit test</button>
          </form>
          <div id="quizResult" class="quiz-result" role="status" aria-live="polite"></div>
          <a class="quiz-back" href="dashboard.html">Back to dashboard</a>
        </div>
      </section>
      `;

      // Advanced technique: GUI event responds when the learner submits the quiz form.
      document.getElementById('practiceQuizForm').addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        if (practiceTheoryQuestions.some((_, index) => !formData.has(`question${index}`))) {
          document.getElementById('quizResult').textContent = 'Please answer every question before submitting your test.';
          return;
        }

        const score = practiceTheoryQuestions.reduce((total, item, index) => (
          total + (Number(formData.get(`question${index}`)) === item.correctAnswer ? 1 : 0)
        ), 0);
        document.getElementById('quizResult').textContent = `You scored ${score} out of ${practiceTheoryQuestions.length}. ${score === practiceTheoryQuestions.length ? 'Excellent work!' : 'Review the Road Code and try again.'}`;
      });
    }
  }
}

// =====================
// Theory Test With Immediate Feedback
// =====================
const feedbackQuizApp = document.getElementById('feedbackQuizApp');

if (feedbackQuizApp) {
  if (!getLoggedInUser()) {
    window.location.replace('login.html');
  } else {
    feedbackQuizApp.innerHTML = `
      <section class="quiz-page" aria-labelledby="feedbackQuizHeading">
        <div class="quiz-card quiz-card--feedback">
          <p class="dashboard-eyebrow">Practice theory test</p>
          <h1 id="feedbackQuizHeading">Learn as you go</h1>
          <p class="quiz-intro">You will see whether each answer is correct as soon as you choose it, along with an explanation.</p>
          <form id="feedbackQuizForm">
            ${practiceTheoryQuestions.map((item, questionIndex) => `
              <fieldset class="quiz-question" data-question="${questionIndex}">
                <legend>${questionIndex + 1}. ${item.question}</legend>
                ${item.answers.map((answer, answerIndex) => `
                  <label><input type="radio" name="question${questionIndex}" value="${answerIndex}"> ${answer}</label>
                `).join('')}
                <p class="quiz-feedback" aria-live="polite"></p>
              </fieldset>
            `).join('')}
            <button class="quiz-submit" type="submit">See score</button>
          </form>
          <div id="feedbackQuizResult" class="quiz-result" role="status" aria-live="polite"></div>
          <a class="quiz-back" href="dashboard.html">Back to dashboard</a>
        </div>
      </section>
    `;

    const feedbackQuizForm = document.getElementById('feedbackQuizForm');
    // Advanced technique: GUI event provides immediate feedback when a learner changes an answer.
    feedbackQuizForm.addEventListener('change', (event) => {
      if (!event.target.matches('input[type="radio"]')) return;

      const questionIndex = Number(event.target.name.replace('question', ''));
      const question = practiceTheoryQuestions[questionIndex];
      const questionCard = event.target.closest('.quiz-question');
      const feedback = questionCard.querySelector('.quiz-feedback');
      const isCorrect = Number(event.target.value) === question.correctAnswer;
      questionCard.classList.toggle('is-correct', isCorrect);
      questionCard.classList.toggle('is-incorrect', !isCorrect);
      feedback.className = `quiz-feedback ${isCorrect ? 'is-correct' : 'is-incorrect'}`;
      feedback.textContent = isCorrect
        ? `Correct. ${question.explanation || ''}`
        : `Not quite. The correct answer is: ${question.answers[question.correctAnswer]}. ${question.explanation || ''}`;
    });

    feedbackQuizForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const result = document.getElementById('feedbackQuizResult');
      if (practiceTheoryQuestions.some((_, index) => !formData.has(`question${index}`))) {
        result.textContent = 'Please answer every question to see your score.';
        return;
      }
      const score = practiceTheoryQuestions.reduce((total, item, index) => (
        total + (Number(formData.get(`question${index}`)) === item.correctAnswer ? 1 : 0)
      ), 0);
      result.textContent = `You scored ${score} out of ${practiceTheoryQuestions.length}.`;
    });
  }
}

// Advanced technique: function with parameters changes the message and whether it is styled as an error.
const showMessage = (message, isError = false) => {
  if (authMessage) {
    authMessage.textContent = message;
    authMessage.className = `auth-message${isError ? ' error' : ''}`;
  }
};

// Advanced technique: GUI event responds to the user submitting the sign-up form.
if (signupForm) {
  signupForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('signupName').value.trim();
    const birthday = document.getElementById('signupBirthday').value;

    if (!/^\d{4}-\d{2}-\d{2}$/.test(birthday)) {
  showMessage('Invalid birthday. Please enter a valid date.', true);
  return;
}


    const birthdayDate = new Date(birthday);
const today = new Date();

const minimumAgeDate = new Date(
  today.getFullYear() - 15,
  today.getMonth(),
  today.getDate()
);

const maximumAgeDate = new Date(
  today.getFullYear() - 80,
  today.getMonth(),
  today.getDate()
);

if (birthdayDate > minimumAgeDate) {
  showMessage('You must be at least 15 years old to sign up.', true);
  return;
}

if (birthdayDate < maximumAgeDate) {
  showMessage('Please enter a valid birthday.', true);
  return;
}
    // Advanced technique: non-trivial string manipulation removes extra spaces and standardises the email.
    const email = document.getElementById('signupEmail').value.trim().toLowerCase();
    const password = document.getElementById('signupPassword').value;

      if (name.length > 50) {
      showMessage('Full name must not exceed 50 characters.', true);
      return;
    }

    if (!name || !birthday || !email || !password) {
      showMessage('Please fill in all sign-up fields.', true);
      return;
    }

    if (password.length < 8) {
      showMessage('Your password must contain at least 8 characters.', true);
      return;
    }

    const users = getStoredUsers();
    const userExists = users.some((user) => user.email === email);

    if (userExists) {
      showMessage('An account with that email already exists.', true);
      return;
    }

    // Advanced technique: modifying a collection by adding the new user's object to the users array.
    users.push({ name, birthday, email, password, createdAt: new Date().toISOString() });
    saveUsers(users);
    setLoggedInUser(email);
    signupForm.reset();
    showMessage(`Account created. You are signed in as ${name}.`);
    window.location.href = 'dashboard.html';
  });
}

// Advanced technique: GUI event responds to the user submitting the login form.
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
    loginForm.reset();
    showMessage(`Welcome back, ${matchingUser.name}!`);
    window.location.href = 'dashboard.html';
  });
}