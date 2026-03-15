# Single-Page Anchor Nav Strip Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert `index.html` into a single-page scroll experience with a sticky anchor nav strip below the header, linking to five sections: Home, About Us, Solutions, Partners, Contact Us.

**Architecture:** Add a `.page-nav` sticky strip to `index.html` immediately after `<header>`. Add `id` attributes to existing sections. Port About Us and Contact content from their separate pages into `index.html`. Use IntersectionObserver to auto-highlight the active strip link as the user scrolls.

**Tech Stack:** Vanilla HTML, CSS, JavaScript — no build tools, no frameworks.

---

## Chunk 1: CSS — nav strip styles and scroll offset

### Task 1: Add `--header-h` CSS variable and `scroll-padding-top`

**Files:**
- Modify: `style.css` (`:root` block, line 2–19; `html` rule, line 23)

- [ ] **Step 1: Open `style.css` and add `--header-h` to `:root`**

  In the `:root` block (after `--maxw:1400px;` on line 17), add:

  ```css
  --header-h:60px;
  ```

  The header is `position:sticky; top:0` with `10px` top + bottom padding and a `44px` SVG logo = ~60px total height.

- [ ] **Step 2: Add `scroll-padding-top` to the `html` rule**

  The `html` rule is on line 23:
  ```css
  html{scroll-behavior:smooth;-webkit-text-size-adjust:100%}
  ```

  Change it to:
  ```css
  html{scroll-behavior:smooth;-webkit-text-size-adjust:100%;scroll-padding-top:108px}
  ```

  `108px` = `--header-h` (~60px) + strip height (~40px) + 8px breathing room.

- [ ] **Step 3: Verify visually**

  Open `index.html` in a browser. No visible change yet — confirms no breakage.

- [ ] **Step 4: Commit**

  ```bash
  git add style.css
  git commit -m "style: add --header-h var and scroll-padding-top for anchor nav"
  ```

---

### Task 2: Add `.page-nav` CSS ruleset

**Files:**
- Modify: `style.css` (after `.site-header` block, around line 94)

- [ ] **Step 1: Add `.page-nav` styles after the `.site-header` block**

  After the closing `}` of `.site-header .container` (around line 99), insert:

  ```css
  /* ── Page anchor nav strip ──────────────────────────────────── */
  .page-nav{
    position:sticky;
    top:var(--header-h);
    z-index:40;
    background:#0d0d0d;
    border-bottom:1px solid #1a1a1a;
    display:flex;
    overflow-x:auto;
    white-space:nowrap;
    -ms-overflow-style:none;
    scrollbar-width:none;
  }
  .page-nav::-webkit-scrollbar{display:none}
  .page-nav__link{
    padding:12px 18px;
    font-size:13px;
    letter-spacing:.04em;
    color:var(--muted);
    text-decoration:none;
    border-bottom:2px solid transparent;
    transition:color .15s,border-color .15s;
    flex-shrink:0;
  }
  .page-nav__link:hover{color:var(--text)}
  .page-nav__link--active{
    color:var(--accent);
    border-bottom-color:var(--accent);
  }
  ```

- [ ] **Step 2: Verify no style.css syntax errors**

  Open `index.html` in browser — page should look the same (strip not in HTML yet).

- [ ] **Step 3: Commit**

  ```bash
  git add style.css
  git commit -m "style: add .page-nav sticky strip styles"
  ```

---

## Chunk 2: HTML — nav strip markup + section ids + section reorder

### Task 3: Add `id` attributes to existing index.html sections

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Add `id="home"` to the hero section**

  Find (line 50):
  ```html
  <section class="hero hero--video-bg hero--full skin skin--video hero--tactical" aria-labelledby="hero-title">
  ```
  Change to:
  ```html
  <section id="home" class="hero hero--video-bg hero--full skin skin--video hero--tactical" aria-labelledby="hero-title">
  ```

- [ ] **Step 2: Add `id="solutions"` to the Five Mission Areas section**

  Find (line 68):
  ```html
  <section class="section skin skin--grid" aria-labelledby="quick-title">
  ```
  Change to:
  ```html
  <section id="solutions" class="section skin skin--grid" aria-labelledby="quick-title">
  ```

- [ ] **Step 3: Add `id="partners"` to the partners strip section**

  Find (line 84):
  ```html
  <section class="section partners-strip" aria-labelledby="partners-strip-title">
  ```
  Change to:
  ```html
  <section id="partners" class="section partners-strip" aria-labelledby="partners-strip-title">
  ```

- [ ] **Step 4: Verify in browser**

  Open browser dev tools, run:
  ```js
  document.querySelectorAll('#home, #solutions, #partners').length
  ```
  Expected: `3`

- [ ] **Step 5: Commit**

  ```bash
  git add index.html
  git commit -m "feat: add section ids to existing index.html sections"
  ```

---

### Task 4: Add the nav strip HTML to `index.html`

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Add `.page-nav` as first child of `<main>`**

  Find (line 48):
  ```html
  <main id="main">
    <!-- HERO — Drone radar background -->
  ```
  Change to:
  ```html
  <main id="main">
    <nav class="page-nav" aria-label="Page sections">
      <a class="page-nav__link page-nav__link--active" href="#home">Home</a>
      <a class="page-nav__link" href="#about">About Us</a>
      <a class="page-nav__link" href="#solutions">Solutions</a>
      <a class="page-nav__link" href="#partners">Partners</a>
      <a class="page-nav__link" href="#contact">Contact Us</a>
    </nav>
    <!-- HERO — Drone radar background -->
  ```

- [ ] **Step 2: Verify strip is visible in browser**

  Open `index.html`. The amber-underlined "Home" tab strip should appear just below the header and stick as you scroll down.

- [ ] **Step 3: Click each link and verify it scrolls (even before about/contact sections exist)**

  - Clicking "Solutions" should scroll to the Five Mission Areas section
  - Clicking "Partners" should scroll to the Partners section
  - Clicking "About Us" and "Contact Us" will jump to top (sections not yet added — expected)

- [ ] **Step 4: Commit**

  ```bash
  git add index.html
  git commit -m "feat: add page-nav strip HTML to index.html"
  ```

---

## Chunk 3: Content — port About Us + Contact sections + JavaScript

### Task 5: Port About Us content into `index.html`

**Files:**
- Modify: `index.html` (insert new `#about` section before `#solutions`)

The About Us content comes from `about.html` `<main>` (lines 48–142). The section order in the DOM must be: `#home` → `#about` → `#solutions` → `#partners` → `#contact`.

Currently `#solutions` (Five Mission Areas) is immediately after the hero. We need to insert the `#about` section between `#home` (hero) and `#solutions`.

- [ ] **Step 1: Locate the insertion point in `index.html`**

  Find the closing `</section>` of the hero (the `</section>` just before `<!-- FIVE MISSION AREAS -->`). Insert the entire `#about` block after it.

- [ ] **Step 2: Insert the About Us section**

  Insert the following HTML between the hero `</section>` and `<!-- FIVE MISSION AREAS -->`:

  ```html
  <!-- ABOUT US -->
  <section id="about" class="section" aria-labelledby="ceo-title">
    <div class="container">
      <p class="section-label">Leadership</p>
      <h2 id="ceo-title">Message from Our CEO</h2>
      <div class="ceo-quote">
        <blockquote>
          <p>"At Techafrik Quantum Group, we believe that Africa's critical infrastructure deserves world-class technology — delivered by people who understand local realities. Our mission is to close the gap between mission-critical technology and the organizations that depend on it every day. We don't just integrate systems; we build operational resilience."</p>
        </blockquote>
        <div class="ceo-attribution">
          <div class="ceo-avatar" aria-hidden="true">CEO</div>
          <div>
            <strong>[CEO Full Name]</strong>
            <span>Chief Executive Officer, Techafrik Quantum Group</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="section skin skin--cyber" aria-labelledby="mission-title">
    <div class="skin__bg" aria-hidden="true"></div>
    <div class="container">
      <p class="section-label">Purpose</p>
      <h2 id="mission-title">Mission &amp; Values</h2>
      <div class="grid">
        <div class="card card--accent" style="grid-column:span 7">
          <p>Our mission is to deliver reliable, secure technology integration that enables critical operations on land, sea, and air. We focus on outcomes, transparency, and long‑term support.</p>
        </div>
        <div class="card card--gold" style="grid-column:span 5">
          <h3>Values</h3>
          <ul class="feature-list">
            <li><div><strong>Reliability First</strong><p>Uptime is non-negotiable for our clients.</p></div></li>
            <li><div><strong>Security by Design</strong><p>Built-in, not bolted on.</p></div></li>
            <li><div><strong>Local Enablement</strong><p>Training and on-site support as standard.</p></div></li>
            <li><div><strong>Vendor-Agnostic</strong><p>Best solution wins, regardless of brand.</p></div></li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <section class="section" aria-labelledby="approach-title">
    <div class="container">
      <p class="section-label">Methodology</p>
      <h2 id="approach-title">Integration Approach</h2>
      <ol class="grid steps">
        <li class="card card--accent"><h3><span class="step-index">01.</span> Audit</h3><p>Assess risks, infrastructure, and objectives.</p></li>
        <li class="card card--accent"><h3><span class="step-index">02.</span> Design</h3><p>Architecture and vendor selection aligned to outcomes.</p></li>
        <li class="card card--accent"><h3><span class="step-index">03.</span> Integration</h3><p>Deployment, testing, and acceptance.</p></li>
        <li class="card card--accent"><h3><span class="step-index">04.</span> Operations</h3><p>Training, runbooks, and on‑site support.</p></li>
      </ol>
    </div>
  </section>

  <section class="section section--alt" aria-labelledby="presence-title">
    <div class="container">
      <p class="section-label">Footprint</p>
      <h2 id="presence-title">Regional Presence</h2>
      <div class="grid">
        <div class="card" style="grid-column:span 6"><h3>West Africa</h3><p>Local teams for mining, energy, and public sector projects.</p></div>
        <div class="card" style="grid-column:span 6"><h3>Partners</h3><p>We collaborate with multiple vendors and distributors to deliver certified systems.</p></div>
      </div>
    </div>
  </section>

  <section class="section" aria-labelledby="team-title">
    <div class="container">
      <p class="section-label">Team</p>
      <h2 id="team-title">Leadership</h2>
      <ul class="grid cards" role="list">
        <li class="card card--accent"><h3>Head of Engineering</h3><p>Oversees architecture, validation, and delivery.</p></li>
        <li class="card card--accent"><h3>Head of Operations</h3><p>Leads service management and on‑site enablement.</p></li>
        <li class="card card--accent"><h3>Head of Security</h3><p>Owns governance, risk, compliance, and cyber operations.</p></li>
      </ul>
    </div>
  </section>

  <section class="section skin skin--cyber" aria-labelledby="careers-title">
    <div class="skin__bg" aria-hidden="true"></div>
    <div class="container">
      <p class="section-label">Join Us</p>
      <h2 id="careers-title">Careers</h2>
      <p class="lead">Join our integration and operations teams. Send your CV or project portfolio.</p>
      <a class="btn btn--green" href="mailto:careers@techafrikquantumgroup.com">Email Careers</a>
    </div>
  </section>
  ```

- [ ] **Step 3: Verify in browser**

  Scroll down from the hero — the About Us / CEO / Mission sections should appear before the Five Mission Areas cards. The "About Us" strip link should scroll correctly.

- [ ] **Step 4: Commit**

  ```bash
  git add index.html
  git commit -m "feat: port About Us sections into index.html"
  ```

---

### Task 6: Port Contact Us content into `index.html`

**Files:**
- Modify: `index.html` (append `#contact` section after `#partners`, before `</main>`)

- [ ] **Step 1: Locate the insertion point**

  Find the closing `</section>` of the partners strip section (the one with `id="partners"`), then insert the contact section after it, before `</main>`.

- [ ] **Step 2: Insert the Contact section**

  ```html
  <!-- CONTACT US -->
  <section id="contact" class="section" aria-labelledby="form-title">
    <div class="container">
      <p class="section-label">Send a Message</p>
      <h2 id="form-title">How Can We Help?</h2>
      <form id="contact-form" class="lead-form">
        <div class="form-row"><label for="c-name">Full name</label><input id="c-name" class="input" required /></div>
        <div class="form-row"><label for="c-email">Work email</label><input id="c-email" type="email" class="input" required /></div>
        <div class="form-row"><label for="c-company">Company</label><input id="c-company" class="input" /></div>
        <div class="form-row"><label for="c-topic">Topic</label>
          <select id="c-topic" class="input">
            <option>Safety &amp; Surveillance</option>
            <option>Critical Connectivity</option>
            <option>Assets Management</option>
            <option>IP Networks</option>
            <option>Cybersecurity</option>
            <option>Other</option>
          </select>
        </div>
        <div class="form-row"><label for="c-message">Message</label><textarea id="c-message" class="textarea" rows="5" required></textarea></div>
        <button class="btn btn--primary" type="submit">Send Message</button>
      </form>
      <p class="small" style="color:var(--muted);margin-top:12px">This offline build uses your email client to send the message.</p>
    </div>
  </section>

  <section class="section section--alt" aria-labelledby="info-title">
    <div class="container">
      <p class="section-label">Find Us</p>
      <h2 id="info-title">Contact Information</h2>
      <div class="grid">
        <div class="card card--accent" style="grid-column:span 4">
          <h3>Email</h3>
          <p><a href="mailto:info@techafrikquantumgroup.com" style="color:var(--accent)">info@techafrikquantumgroup.com</a></p>
        </div>
        <div class="card card--accent" style="grid-column:span 4">
          <h3>Location</h3>
          <p>Conakry, Guinea<br />West Africa</p>
        </div>
        <div class="card card--accent" style="grid-column:span 4">
          <h3>Careers</h3>
          <p><a href="mailto:careers@techafrikquantumgroup.com" style="color:var(--accent)">careers@techafrikquantumgroup.com</a></p>
        </div>
      </div>
    </div>
  </section>
  ```

  Note: email link colors use `var(--accent)` (amber), not `var(--green)` which is undefined.

- [ ] **Step 3: Verify in browser**

  Clicking "Contact Us" in the strip should smooth-scroll to the contact form. Verify the email links render in amber.

- [ ] **Step 4: Commit**

  ```bash
  git add index.html
  git commit -m "feat: port Contact Us section into index.html"
  ```

---

### Task 7: Create `js/contact.js` with form submit handler

**Files:**
- Create: `js/contact.js`
- Modify: `index.html` (add `<script src="./js/contact.js"></script>`)

- [ ] **Step 1: Create `js/contact.js`**

  ```js
  (function () {
    var form = document.getElementById('contact-form');
    if (!form) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name    = document.getElementById('c-name').value.trim();
      var email   = document.getElementById('c-email').value.trim();
      var company = document.getElementById('c-company').value.trim();
      var topic   = document.getElementById('c-topic').value;
      var message = document.getElementById('c-message').value.trim();
      var subject = 'Contact: ' + topic;
      var body    = 'Name: ' + name + '\nEmail: ' + email + '\nCompany: ' + company + '\nTopic: ' + topic + '\nMessage: ' + message;
      window.location.href = 'mailto:info@techafrikquantumgroup.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    });
  })();
  ```

- [ ] **Step 2: Add script tag to `index.html`**

  Find (near bottom of `index.html`):
  ```html
  <script src="./js/skins.js"></script>
  <script src="./js/chatbot.js"></script>
  ```
  Change to:
  ```html
  <script src="./js/skins.js"></script>
  <script src="./js/chatbot.js"></script>
  <script src="./js/contact.js"></script>
  ```

- [ ] **Step 3: Verify form submits**

  Open `index.html`, scroll to the Contact section, fill in the form fields and click "Send Message". Your email client should open with the prefilled subject and body.

- [ ] **Step 4: Commit**

  ```bash
  git add js/contact.js index.html
  git commit -m "feat: extract contact form handler to js/contact.js"
  ```

---

### Task 8: Add IntersectionObserver for active strip link

**Files:**
- Modify: `js/skins.js` (append at bottom)

- [ ] **Step 1: Append IntersectionObserver code to `js/skins.js`**

  Add at the very bottom of `js/skins.js`:

  ```js
  // ── Page nav: highlight active section on scroll ──────────────
  (function () {
    var sections = document.querySelectorAll('#home,#about,#solutions,#partners,#contact');
    var navLinks = document.querySelectorAll('.page-nav__link');
    if (!sections.length || !navLinks.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          navLinks.forEach(function (link) {
            link.classList.remove('page-nav__link--active');
          });
          var active = document.querySelector('.page-nav__link[href="#' + entry.target.id + '"]');
          if (active) {
            active.classList.add('page-nav__link--active');
            active.scrollIntoView({ inline: 'nearest', block: 'nearest' });
          }
        }
      });
    }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });

    sections.forEach(function (s) { observer.observe(s); });
  })();
  ```

- [ ] **Step 2: Verify active state in browser**

  Open `index.html` and scroll slowly through the page. The active strip link should switch:
  - "Home" active at the top
  - "About Us" active when the About section is in the middle of the viewport
  - "Solutions" active when the Five Mission Areas section is centred
  - "Partners" active when the Partners section is centred
  - "Contact Us" active when the Contact section is centred

- [ ] **Step 3: Verify on narrow viewport (mobile)**

  Resize browser to 375px wide. The strip should scroll horizontally. When a later section becomes active, its link should scroll into view in the strip automatically.

- [ ] **Step 4: Commit**

  ```bash
  git add js/skins.js
  git commit -m "feat: add IntersectionObserver for page-nav active state"
  ```

---

### Task 9: Final check and push

- [ ] **Step 1: Full page walkthrough**

  Open `index.html` in the browser and verify:
  - Strip is visible and sticks below the header on scroll
  - All 5 links scroll to the correct sections
  - Active state updates correctly while scrolling
  - Contact form opens email client on submit
  - No broken styles, no colourless links
  - Header dropdowns (Solutions, Company) still appear above the strip

- [ ] **Step 2: Check separate pages still work**

  Open `about.html`, `contact.html`, `solutions.html` — they should be unchanged and fully functional.

- [ ] **Step 3: Push to GitHub**

  ```bash
  git push origin main
  ```

  Live at: https://alphabynta.github.io/techafrikquantum-site/
