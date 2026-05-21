# Twende Zambia UK — Welfare & Bereavement Community Portal

A highly polished, ultra-responsive, and modern multi-page static portfolio designed exclusively for **Twende Zambia UK**, an organization supporting the Zambian diaspora across the United Kingdom during bereavement, mourning, and homeland repatriation.

Developed using semantic HTML5, clean CSS3 variables, and raw Vanilla JavaScript with full mobile optimization, graceful entrance transitions, and zero framework dependencies, ensuring direct local opening of `index.html` and 100% compatibility with **GitHub Pages**.

---

## 🎨 Visual Identity & Style System

The design is carefully engineered to present an engaging, welcoming community aesthetic that balances warmth with profound professional solidity:
- **Zambia-Inspired Color Palette**: 
  - *Emerald Green* (`#009A44` / `#028640`): Symbolizing our native natural wealth and growth.
  - *Warm Copper Orange* (`#E57200`): Reflecting our rich mineral heritage and sunset warmth.
  - *Black Accents* (`#111111`): Standing for our strong, enduring human pride and unity.
  - *Golden Highlights* (`#FFCD00` / `#EFB21E`): Radiating Hope and support solidarity.
- **Atmosphere**: Bright, comfortable light themes styled with generous white/cream negative space and delicate soft card shadows (`shadow-sm` / `hover:shadow-md`) to instill immense reassurance and user trust.
- **Typography Pairing**: Elegant `"Space Grotesk"` for displays/headings paired with highly legible, high-contrast, scalable `"Inter"` sans-serif for comfortable copy.

---

## 📂 Core Structure Architecture

The site map is structured meticulously inside 6 semantic static directories for pristine search engine visibility (SEO):

1. **Home (`index.html`)**: Features welcoming hero headings, verbatim messaging displays, key metric counters, peer £30 contribution process flows, membership summaries, real testimonials, and actionable CTAs.
2. **About Us (`about.html`)**: Details our sovereign non-profit organization status, executive trusteeship, values, history, and constitutional pathways.
3. **Bereavement Support (`support.html`)**: Visualizes the Day 1 through Day 5 payout timeline, document conditions (death certificates/coroner records), and compassionate welfare structures.
4. **Membership (`membership.html`)**: Showcases pricing plans (£10 Adults, £5 Children), the 6-month maturity waiting rule, live fee calculator components, and the Diaspora Registry Join Form.
5. **Community Gallery (`gallery.html`)**: Stores community moment archives and event snaps in responsive bento columns, fully navigable inside a custom JavaScript-built slider lightbox.
6. **Contact Us (`contact.html`)**: Features verified helpdesk email, direct emergency phone lines, and a compliant secure feedback form.

---

## ⚡ Interactivity & Vanilla JS Mechanics

Interactive processes are built with raw, lightweight vanilla JS located in `assets/js/script.js`:
- **Animated Value Counters**: Increment numbers on homepage load when scrolled into preview.
- **Sticky Navbar & Mobile Drawer**: Toggles responsive hamburger drawer and changes header padding dynamically during scroll events.
- **Interactive Lightbox Slider**: Slides, preloads, and zooms photos inside overlays with keyboard and touch navigability.
- **Live Fee Calculator**: Updates adult and child subscription subtotals and grand totals instantly inside the membership form.
- **Form Feedback & Reset**: Checks terms validation, triggers CSS active cues, and provides soft alert cards upon successful lodging.
- **Floating Actions**: Implements a floating WhatsApp link for bereavement reporting, alongside a responsive "Back To Top" action.

---

## 🚀 Setting Up & Deploying (GitHub Pages Compliant)

This website is **completely static** and can be run by double-clicking `index.html` directly in any web browser. For advanced development and deployment:

### 1. Local Development
For active editing with Hot Module Replacement and production bundling (Vite):
```bash
# Install development configuration
npm install

# Live development server on port 3000
npm run dev

# Bundle into optimized /dist asset files
npm run build
```

### 2. Live Publishing with GitHub Pages
Since the structure requires no server-side databases or runtimes, it can be hosted permanently for **free** on GitHub Pages:
1. Initialize a new git directory inside this folder:
   ```bash
   git init
   git add .
   git commit -m "feat: initial release of Twende Zambia UK portal"
   ```
2. Create a public repository on your GitHub account (named e.g. `twende-zambia-uk`).
3. Push your branches:
   ```bash
   git remote add origin https://github.com/YOUR_ACCOUNT/twende-zambia-uk.git
   git branch -M main
   git push -u origin main
   ```
4. On your GitHub Repository Page:
   - Click **Settings** -> **Pages**.
   - Under *Build and Deployment* -> *Source*, select **Deploy from a branch**.
   - Under *Branch*, select **`main`** and **`/ (root)`**, then click **Save**.
5. Your modern site will be live at `https://YOUR_ACCOUNT.github.io/twende-zambia-uk/` within minutes!

---

## ♿ Accessibility & Search Optimization Standards
- **Semantic Tags**: Implements structured `<header>`, `<main>`, `<section>`, `<article>`, `<footer>`, `<nav>`, and `<details>` blocks.
- **High-contrast Text**: Zero low-contrast gray-on-gray issues; headings and content adhere strictly to standard **WCAG AAA** guidelines.
- **Responsive Media**: Custom `srcset` patterns with appropriate image descriptions (`alt` tags) and safe viewport tracking parameters.
- **SEO Elements**: Page metadata (titles, tags, and OpenGraph variables) are written for Google spiders.
