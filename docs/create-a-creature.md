# Create your own CSS creature

Your challenge is to design a character using HTML elements and CSS. The finished example at `/creature-example` shows some techniques you can use: a shaped head, ears, eyebrows, a nose, a mouth, and pupils that follow the mouse. Your character can have its own colours, shapes, features, and personality.

Start by sketching an idea. Which simple shapes could you combine to make it? Pick a few features to build first, then add detail.

## 1. Find your workspace

- [Creature.astro](../src/components/Creature.astro) contains the character’s HTML and the JavaScript that connects the pupils to the mouse.
- [creature.css](../src/styles/creature.css) controls the character’s appearance.
- [CreatureExample.astro](../src/components/CreatureExample.astro) preserves the finished reference character and its CSS. Open `/creature-example` to see it.
- [eyeMath.js](../src/utility/eyeMath.js) handles pupil movement for you.

Run `npm run dev` in the terminal and open the local address it prints, followed by `/creature`. Keep the browser open while you work. Save after each small change and check what happened.

## 2. Register the pupils to follow the mouse

Each eye contains a `span` representing its pupil. The `data-follow-mouse` attribute marks the pupil we want JavaScript to find:

```html
<div class="eye">
    <span data-follow-mouse></span>
</div>
```

Keep the pupil directly inside its eye: the movement helper uses its parent to measure the space available.

In the `<script>` section of `Creature.astro`, connect those pupils to the helper:

```js
import { attachEyeTracking } from "../utility/eyeMath.js";

const pupils = document.querySelectorAll("[data-follow-mouse]");
attachEyeTracking(pupils);
```

This is already connected in the example. Read it before changing it:

1. `import` makes the helper function available in this file.
2. `document.querySelectorAll(...)` finds all elements matching a CSS selector. The square brackets in `"[data-follow-mouse]"` select elements with that attribute.
3. `const pupils` stores that collection of elements.
4. `attachEyeTracking(pupils)` passes the collection to the helper, which subscribes to the cursor utility and moves the pupils on animation frames. It keeps them inside their eyes and pauses updates when the mouse is idle.

Move the mouse around your character to try it. What is the difference between selecting `.eye` and selecting `[data-follow-mouse]`? Which element should actually move?

You only need to call the helper once for the collection. Leave its calculations in `eyeMath.js` while you focus on designing your character.

## 3. Add features to the character

Find the element with `class="creature-features"`. Put new features inside it. This container starts empty, ready for your own features.

For example, add two cheeks:

```html
<div class="creature-features">
    <!-- Your other features can stay here too. -->
    <div class="cheek left"></div>
    <div class="cheek right"></div>
</div>
```

Add these two cheek elements to the existing container; you don’t need a second `creature-features` container. An empty `div` becomes a visible feature when CSS gives it a size and colour.

## 4. Size and position features with percentages

Add your styles below `/* Your features here */` in `creature.css`:

```css
.cheek {
    position: absolute;
    width: 14%;
    height: 9%;
    top: 58%;
    background-color: #ffabab;
    border-radius: 50%;
}

.cheek.left {
    left: 17%;
}

.cheek.right {
    right: 17%;
}
```

The `creature-features` container is positioned and fills the base. With `position: absolute`, each feature can be placed within that container:

- `width: 14%` makes the cheek 14% of the container’s width.
- `height: 9%` makes it 9% of the container’s height.
- `top: 58%` places its top edge 58% down the container.
- `left: 17%` places its left edge 17% across the container.
- `right: 17%` measures from the container’s right edge instead.

**Use percentages for the sizes and positions you add or customise:** `width`, `height`, `top`, `left`, `right`, and `bottom`. Use percentage coordinates for your clip paths too. This will let the features scale with the character later. Rotation uses degrees because it describes an angle.

The starter base currently has a fixed `500px` size; leave that setup in place for this exercise. The pupil helper also calculates movement in pixels automatically. Your feature CSS should use percentages.

Percentages depend on the containing element. A feature directly inside `creature-features` is sized relative to that container; a pupil inside an eye is sized relative to the eye. If you nest a new shape inside a feature, its percentage sizes refer to that smaller container.

Try changing the cheeks’ width and position separately. Predict what each change will do before refreshing the page.

## 5. Share styles and customise matching features

In `class="cheek left"`, the element has two classes: `cheek` and `left`.

The selector `.cheek` gives both cheeks their shared size, colour, and shape. The selector `.cheek.left` matches an element that has **both** classes, so it can position just the left cheek. This is called a compound selector: the class selectors are joined with no space between them.

Compare these selectors:

```css
.cheek.left { left: 17%; }
.cheek.right { right: 17%; }
```

Keep shared properties in `.cheek`, then put differences in `.cheek.left` and `.cheek.right`. You can change both cheeks’ colour in one place while keeping their positions different.

A space changes the meaning: `.cheek .left` selects a separate element with class `left` *inside* a cheek. That does not match our markup.

Look at `.ear-inside.left` and `.eyebrow.left` in the finished example’s CSS. They use this same technique. Avoid a general `.left` rule for positioning: it would affect ears, eyebrows, and cheeks that share that class.

## 6. Make shapes with clip paths

A `clip-path` controls which part of an element is visible. Imagine cutting a shape out of a coloured rectangle. The finished example uses this for its head, inner ears, nose, and mouth.

Use [Clippy, the CSS clip-path maker](https://bennettfeely.com/clippy/), to design a shape:

1. Choose a starting shape, such as a triangle or a custom polygon.
2. Adjust the points in the preview to make your shape.
3. Copy the generated `clip-path` declaration.
4. Paste it into the CSS rule for your feature.
5. Check the result on your character and adjust its size or points.

For example, this creates a triangular shape:

```css
.ear-inside {
    position: absolute;
    width: 10%;
    height: 20%;
    background-color: #ffabab;
    clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
}
```

Each pair in `polygon(...)` is a horizontal and vertical coordinate within the feature itself. Here the points are top centre, bottom left, and bottom right. The browser joins them into a closed shape.

Keep the coordinates as percentages. The element’s width and height stretch the shape, so a triangle in a tall rectangle will look different from one in a square.

If you add a clip path to the base, it also clips its children. If an ear or another feature disappears at the edge of the head, check whether the base’s clip path cuts it off. For this exercise, design features to fit within the visible base, or reshape the base to include them.

## 7. Rotate features with transform

Use `transform: rotate(...)` to tilt a feature:

```css
.ear-inside.left {
    top: 5%;
    left: 5%;
    transform: rotate(-30deg);
}

.ear-inside.right {
    top: 5%;
    right: 7%;
    transform: rotate(30deg);
}
```

In this page, positive angles turn clockwise and negative angles turn anticlockwise. By default, a feature rotates around its centre. Rotation changes how it looks without rearranging the other features.

Try changing the eyebrow angles. Can you make the character look surprised, worried, or cross?

You can choose a different pivot point using percentages:

```css
transform-origin: 50% 100%;
```

That puts the pivot at the bottom centre of the feature.

The base already uses `transform: translate(-50%, -50%)` to centre itself. `translate` moves an element, while `rotate` turns it. Percentage translations are measured against the element’s own size.

If you want to rotate the base too, keep both functions in the same declaration:

```css
transform: translate(-50%, -50%) rotate(5deg);
```

Writing a new `transform: rotate(...)` rule by itself would replace the centring transform. The order of transform functions also matters. Leave the pupil transforms to the movement helper, which updates them automatically.

## 8. Make the design yours

Build your character a feature at a time. Try changing the base colour through `--creature-base-color`, reshaping the head, or adding your own cheeks, spots, teeth, or hair. The starter also has `--creature-eye-size` and `--creature-pupil-size` values you can experiment with.

Before you finish, check your character:

- The pupils follow the mouse and remain inside the eyes.
- New features live inside `creature-features`.
- Your feature sizes and positions use percentages.
- At least one shape uses a clip path you made in Clippy.
- At least one feature uses rotation.
- A pair of features shares a base class and uses joined class selectors for different positions.
- The character has its own design and expression.

Explain one feature to someone else: which HTML element creates it, which CSS properties give it its shape, and how you positioned it. Then pick one property, predict what changing it will do, and test your prediction.
