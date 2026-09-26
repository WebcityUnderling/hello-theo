# My website

An Astro project for building a website about you. Start with a single page,
then a list generated from JavaScript, then make it your own with CSS.
Tasks 4–6 expand it into a site with shared data, navigation, and your own feature.

## Start the project

Use Node.js 24 (if you use nvm, run `nvm use`), then run these commands from this folder:

```sh
npm install
npm run dev
```

Open the local address printed in the terminal (usually http://localhost:4321).
Keep the terminal running while you work. Save a file to see the page update;
press Ctrl+C in the terminal to stop the server.

The homepage starts with a shared menu, a heading, and a sentence. Both initial
task components are already connected to it, but contain only instructions until
you add your HTML. The menu's links are visible to start with; turning them into
a hover dropdown is part of Task 5. One example favourite lets you try the
detail-page route before migrating your own data in Task 4.

## Where things live

| File | What it does |
| --- | --- |
| `src/pages/index.astro` | The homepage; imports and displays both components |
| `src/components/AboutMe.astro` | Task 1: headings, paragraphs, and an image |
| `src/components/Favourites.astro` | Task 2: JavaScript data and a loop |
| `src/assets/` | Put images you want to import here |
| `src/layouts/BaseLayout.astro` | The HTML document, browser tab title, and CSS import |
| `src/styles/main.css` | The global stylesheet; add layout and styling here |
| `src/styles/theme.css` | Colours and fonts, imported by `main.css` |
| `src/data/favourites.json` | Shared favourites data for Task 4 onwards |
| `src/pages/favourites/[slug].astro` | One template that generates all favourite pages |
| `src/components/Menu.astro` | Shared navigation, included by the layout |
| `docs/feature-sketch.md` | Your planning worksheet for Task 6 |

## Task 1: About me

Open `AboutMe.astro` and create a section with a heading, some text, and an image.
You could write about hobbies, something you enjoy learning, or a project you
would like to make. Your image could show you, a hobby, or something you like.

The page already has an `<h1>`, so use an `<h2>` for your section heading.
Add your image file to `src/assets/`, then import it in the frontmatter (between
the `---` lines). Give the image alt text that describes what it shows.

Done when:

- Your section appears on the homepage with a heading, text, and an image.
- You have personalised the page heading and browser tab title.
- You can point to where the component is imported and used in `index.astro`.

<details>
<summary>Hint: importing an image</summary>

If you add `hobby.jpg` to `src/assets/`, your component can use:

```astro
---
import hobby from '../assets/hobby.jpg';
---

<img
  src={hobby.src}
  width={hobby.width}
  height={hobby.height}
  alt="Describe what your image shows"
/>
```

Use your actual filename and description. Curly braces insert JavaScript values
into HTML. Add the import to the existing frontmatter block.

</details>

## Task 2: My top 10 favourites

Choose a category (games, songs, food, films…) or mix a few together.
In `Favourites.astro`, create a JavaScript object with 10 entries: each key is a
name, and each value is a short reason you like it.

Use `Object.entries()` to turn the object into pairs, then `.map()` to turn those
pairs into list items. Put the items inside an `<ol>`. Use the map callback's
`index` to show ranks 1–10; indexes start at zero.

Done when:

- All 10 favourites appear, in order, with their reasons and ranks.
- The list items come from `.map()`, rather than 10 copied HTML blocks.
- Changing one entry in the object changes the page when you save.

<details>
<summary>Hint: a smaller object and loop</summary>

Here is a two-item example using places. Adapt the idea to your own favourites:

```astro
---
const places = {
  Beach: 'I like listening to the waves.',
  Library: 'There is always something new to read.',
};
---

<ol>
  {Object.entries(places).map(([name, reason], index) => (
    <li value={index + 1}>
      <h3>{name}</h3>
      <p>{reason}</p>
    </li>
  ))}
</ol>
```

The `value` attribute sets the visible list number using the index. Use named
keys in your preferred order; integer-like keys have different ordering rules.

</details>

## Task 3: Make it yours

Start with the colours and fonts in `theme.css`. These are CSS custom properties:
`var(--color-text)` in `main.css` uses the value you set in the theme.

Then add rules in `main.css` to experiment with spacing, borders, and layout.
Try Flexbox or Grid to arrange your content. Keep all CSS in these stylesheets;
you can add more plain CSS files later and import them from `main.css`.

Choose a font from [Google Fonts](https://fonts.google.com/). Its embed code can
go in the layout's `<head>` (for `<link>` tags) or at the top of `main.css` (for
CSS `@import`), before other rules. Update the theme's font families to use it,
keeping a fallback such as `sans-serif`.

Done when:

- The colours, typography, and layout feel like your own design.
- Text is easy to read against its background.
- The page works in a narrow phone-sized window and a wide desktop window.
- Images fit the page and there is no unwanted horizontal scrolling.

## Task 4: Give each favourite its own page

Move your Task 2 data into `src/data/favourites.json`, replacing the example.
The router is already prepared in `src/pages/favourites/[slug].astro`.
Astro uses filenames as routes; no extra router library is needed.

```text
src/pages/
  index.astro                 → /
  favourites/
    [slug].astro               → /favourites/example-favourite/
                              → one URL for each JSON key
```

Use a short, unique, lowercase key with hyphens for each entry, such as
`chocolate-ice-cream`. This is its **slug**, the part used in its URL.
Each value is now an object with `name`, `reason`, `description`, and `category`.
Keep the entries in ranked order, and add another field of your own if you like.
JSON requires double quotes and does not allow comments or trailing commas.

1. Replace the example with all 10 favourites and their extra information.
2. Import the JSON into `Favourites.astro` and remove the old local data object.
3. Adapt your loop: `Object.entries(favourites)` now gives `[slug, favourite]`.
   Read the name with `favourite.name` and the reason with `favourite.reason`.
4. Make each listing include a clear link to `/favourites/<slug>/`. Use an `<a>`
   for navigation, even if you style it to look like a button.
5. In `[slug].astro`, display the reason, description, category, and any other
   content fields you added. The heading and back link are already provided.
6. Style the shared detail-page template in `main.css`.

<details>
<summary>Hint: shared data and links</summary>

In the listing component's frontmatter:

```js
import favourites from '../data/favourites.json';
```

Inside your map callback, a link can look like this:

```astro
<a href={`/favourites/${slug}/`}>More about {favourite.name}</a>
```

In the detail template, `{favourite.description}` displays the longer description.
`getStaticPaths()` supplies the URL and data to each generated page. You can read
the provided function without needing to change it for every new entry.

</details>

Done when:

- Every homepage favourite links to its own page and all 10 URLs work.
- Every detail page displays all its content fields and has its own tab title.
- Refreshing a detail URL works, and you can navigate back home.
- Updating the JSON changes the listing, detail page, and shared menu.
- `npm run build` succeeds and generates the homepage plus 10 detail pages.

## Task 5: Build a CSS dropdown menu

`Menu.astro` is already included in `BaseLayout.astro`, so it appears on every
page. The markup and data loop are provided: a Home link, a Favourites label,
and a list of links from the shared JSON. The dropdown behaviour is yours to build.

Sketch how the menu should look, then style `.site-menu` and `.favourites-menu`
in `main.css`. Decide on spacing, colours, link states, and where the dropdown
should appear. You can change the markup as your design needs it.

1. Arrange the Home link and Favourites label in your menu.
2. Hide the favourites list in its default state.
3. Use the `:hover` pseudo-class on `.favourites-menu` to reveal the list.
4. Make sure the list stays open as you move the pointer onto its links.
5. Style the links and check the layout with long names and a narrow window.

<details>
<summary>Hint: selectors and positioning</summary>

`:hover` is a **pseudo-class**: it selects an element in a particular state.
Pseudo-elements such as `::before` and `::after` are different; they can add
decorative content, but are not needed to open this dropdown.

Think about what `.favourites-menu ul` selects, then what changes when you use
`.favourites-menu:hover ul`. Put the hover state on the wrapper so it still
applies when the pointer is over a list item, not just the Favourites label.

If you want the list to sit over the page content, explore `position: relative`
on the wrapper and `position: absolute` on the list. Avoid a gap between the
label and list that would cause the hover state to end.

</details>

Done when:

- The menu has a consistent design on the homepage and every detail page.
- Home and every favourite link work.
- The list is hidden initially and appears when you hover over Favourites.
- You can move onto the dropdown and click a link without it disappearing.
- Long favourite names and narrow screens do not cause horizontal scrolling.

Optional extensions, once the hover version works:

- **Keyboard:** make the Favourites trigger focusable and use `:focus-within`
  on the wrapper to keep the list visible while tabbing through its links.
  Keep a visible focus outline. The starter's plain `<div>` label cannot receive
  keyboard focus by itself.
- **Touch and clicks:** explore a `<button>` trigger and a browser `<script>`
  that toggles the dropdown. Keep `aria-expanded` in sync with its open state,
  and consider how clicking again or pressing Escape should close it.
- **Current page:** give the link for the page you are on a distinct style.

The initial hover exercise assumes a mouse. Discuss keyboard and touch behaviour
with your mentor before treating it as a finished navigation menu.

## Task 6: Design a feature of your own

Think about something you would like a visitor to be able to do on your site.
Start with the idea and a sketch; discuss it with your mentor before coding it.
Use [the feature worksheet](docs/feature-sketch.md) to capture your thinking.

1. Come up with two or three ideas and choose one you are excited about.
2. Explain who it is for and what they can do with it.
3. Sketch its initial appearance and what changes after someone interacts.
4. Think about what information it needs and where that information comes from.
5. Pick the smallest useful version and note questions to discuss together.

Done when you have a sketch and a short proposal to walk through with your
mentor. Together, break it into a few manageable implementation tasks.

## How Astro fits together

Frontmatter runs when Astro generates the page. During development, saving
changes regenerates it. A production build creates static HTML, CSS, and any
browser JavaScript. Astro includes Vite for the development server and bundling.

Later, you can add a `<script>` tag to a component to listen for clicks and update
the page with ordinary JavaScript. Frontmatter variables are not automatically
reactive in the browser. Task 6 is a chance to explore an interaction of your own.

## Check your finished site

```sh
npm run build
npm run preview
```

`build` creates the production site in `dist/`. `preview` serves that build so you
can check it locally. Rebuild after edits before checking the preview again.

Useful reference: [Astro documentation](https://docs.astro.build/).
