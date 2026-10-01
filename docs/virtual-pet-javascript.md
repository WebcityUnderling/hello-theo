# Virtual Pet: your JavaScript guide

Make your creature respond to care, then turn it into a small survival game. Work through one task at a time. Choose messages that suit your pet’s personality.

You do not need to memorise everything here. Read the first sections, then return to the relevant example when you need it. The Feed button is your worked example; the other tasks are yours to build.

## 1. Open the project

Run `npm run dev` in the terminal, then open the address it prints and visit `/virtual-pet`. Keep the terminal running while you work.

| File                                                             | What you use it for                                         |
| ---------------------------------------------------------------- | ----------------------------------------------------------- |
| [virtual-pet.astro](../src/pages/virtual-pet.astro)              | Your HTML, JavaScript, and task list                        |
| [virtual-pet.css](../src/styles/virtual-pet.css)                 | Finished page styles, action animations, and game-over fade |
| [Creature.astro](../src/components/Creature.astro)               | Your own character                                          |
| [CreatureExample.astro](../src/components/CreatureExample.astro) | The example character used to start with                    |

Try Feed several times. Happiness begins at 5 and stops at 10. Play currently shows an animation without changing happiness. Rest is waiting for your code. The timer and game-over behaviour are also tasks, so the starter does not lose happiness yet.

Save after each small change. Refreshing the page starts the game again; values are not saved between visits.

## 2. Know where JavaScript belongs

The `.astro` file contains three different parts:

- **Front matter**, between the `---` lines at the top, imports the layout and creature. Astro runs this while preparing the page.
- **HTML** describes the headings, creature wrapper, text, and buttons.
- **The `<script>` section** runs in the browser. Put your button functions, changing variables, and timer here.

Keep your game code inside the existing `<script>`, before `</script>`. Do not put click listeners or `document.querySelector` in the front matter.

HTML supplies the elements, CSS controls their appearance, and JavaScript changes what happens when you interact.

To use your own creature, change the import path at the top to `"../components/Creature.astro"`. Keep the imported name `PetCreature` and the `<PetCreature />` tag. Change the pet’s name in the HTML heading with `id="pet-name"`.

## 3. Variables remember information

Find these lines in the script:

```js
let happiness = 5;
let statusMessage = "Ready for a snack and some company.";
```

A variable is a name for a value. Here `happiness` holds a **number**, and `statusMessage` holds a **string**, which means text. Strings have quotes around them. The `=` stores the value on its right in the variable on its left.

Use `let` when you will replace a variable’s value later:

```js
happiness = happiness + 1;
```

JavaScript calculates the right side first. If happiness is 5, it calculates `5 + 1`, then stores 6. This line does not mean that 5 equals 6!

Declare the variable with `let` once. When changing it later, use its name without another `let`. Keep shared game variables outside your button functions: declaring a new starting value inside a button function would reset it on every click.

Use `const` for a name you will not assign a different value to, such as the reference to a button:

```js
const feedButton = document.querySelector("#feed-button");
```

You can still change that button’s properties. `const` means the variable keeps referring to the same element.

Other useful values are **booleans**: `true` and `false`, without quotes. A boolean can remember whether a game has ended.

Be careful with numbers and strings: `5 + 1` produces `6`, but `"5" + 1` produces the text `"51"`. Keep your game numbers as numbers.

## 4. Select an element from the page

The browser represents HTML as objects that JavaScript can work with. This is the **DOM**, short for Document Object Model. `document` gives your script access to the current page.

This HTML creates the happiness display:

```html
<span id="happiness-value">5</span>
```

This JavaScript finds it:

```js
const happinessDisplay = document.querySelector("#happiness-value");
```

`querySelector` finds the first element matching a CSS selector. Put the selector inside quotes.

| Selector          | Finds                                       |
| ----------------- | ------------------------------------------- |
| `"#feed-button"`  | The element with `id="feed-button"`         |
| `".pet-creature"` | The first element with class `pet-creature` |
| `"button"`        | The first button on the page                |

An ID should identify one element on the page. Class names can be shared by several elements.

If the spelling does not match anything, `querySelector` returns `null`, meaning no element was found. Trying to change a property of `null` produces an error. Check the HTML and selector together, including `#` or `.`.

**Your turn:** find the Rest button’s ID in the HTML. Use it to select that button and store the result in a clearly named variable near the other selections.

## 5. Functions collect steps into an action

A function gives a name to a group of instructions:

```js
function sayHello() {
	console.log("Hello!");
}
```

`function` introduces it, `sayHello` is its name, and the braces contain its instructions. Defining a function does not run it. To run, or **call**, it, write:

```js
sayHello();
```

The parentheses matter. `sayHello` refers to the function; `sayHello()` runs it now. `console.log` prints a message in the browser’s developer console, which is useful for checking what happened.

Indent the lines inside braces so it is easy to see where the function starts and ends. JavaScript names are case-sensitive: `updatePet` and `updatepet` are different names.

## 6. Event listeners connect buttons to functions

Find the Feed connection:

```js
feedButton.addEventListener("click", feedPet);
```

It means: when this button receives a click, run the function named `feedPet`. The listener waits until the event happens. A native button also produces a click when you activate it with the keyboard using Enter or Space.

Pass `feedPet` without parentheses. Writing `feedPet()` there would run the function immediately instead of supplying the function for future clicks.

Attach listeners once, outside your button functions. Do not put them inside `updatePet()`, which runs many times.

**Your turn:** Play already has a function and listener. Add your work inside `playPet()`. For Rest, write your own named function and attach a click listener to the button you selected. Start with a `console.log` message to check the connection before adding behaviour.

## 7. Follow the working Feed example

Read `feedPet()` in your file from top to bottom:

1. `animatePet("is-feeding")` starts the prepared visual effect.
2. `if (happiness < 10)` checks whether happiness has room to increase.
3. Inside that block, happiness increases by 1 and a feeding message is stored.
4. The next `if` checks whether happiness is now exactly 10. If so, it uses the full-happiness message.
5. `updatePet()` puts the latest values on the page.

The two `if` statements are separate. Both can run on the same click: starting at 9 enters the first block, then the new value of 10 enters the second.

Try predicting what happens when you click Feed at 5, 9, and 10. Then test those predictions.

## 8. Make decisions with if

An `if` statement runs a block only when its condition is true. Here is an unrelated example:

```js
let tickets = 3;

if (tickets > 0) {
	console.log("You can enter.");
} else {
	console.log("No tickets left.");
}
```

The optional `else` block runs when the condition is false.

| Operator | Meaning                                    |
| -------- | ------------------------------------------ |
| `===`    | Equals, with the same type of value        |
| `!==`    | Does not equal, including a different type |
| `<`      | Less than                                  |
| `>`      | Greater than                               |
| `<=`     | Less than or equal to                      |
| `>=`     | Greater than or equal to                   |
| `        |                                            | `   | Or: at least one condition is true |
| `&&`     | And: both conditions are true              |

Use `===` to compare. A single `=` assigns a value instead.

For Play, checking that happiness is less than 10 **before** adding 2 is not enough: 9 would become 11. Think about checking the result after changing it, then bringing it back to the maximum when needed. Use the same idea to prevent the timer from taking a value below 0.

**Your turn:** write your Play change and limit check. Test it at 8, 9, and 10.

## 9. Update the page with textContent

Changing `happiness` changes a JavaScript value. It does not automatically change the visible number. Our `updatePet()` function handles that:

```js
function updatePet() {
	happinessDisplay.textContent = String(happiness);
	statusDisplay.textContent = statusMessage;
}
```

`textContent` changes the text inside an element. `String(happiness)` converts the number into text for display, while leaving the original variable as a number.

Keep calculations based on `happiness`, rather than reading the displayed text back from the page. The variable holds the game value; the display shows it.

When writing an action, work in this order: change the relevant variables, check limits and game over once implemented, then call `updatePet()`. Rest should change the message while leaving happiness alone.

The status paragraph is a polite live region. Updating its text lets assistive technology announce the message without moving keyboard focus. You do not need to replace the paragraph or add extra HTML.

## 10. Use the prepared animations

The helper accepts a **parameter**: a named input to a function. In `animatePet(animationClass)`, `animationClass` receives the string supplied when you call it.

| Call                       | Effect                  |
| -------------------------- | ----------------------- |
| `animatePet("is-feeding")` | A short munching squash |
| `animatePet("is-playing")` | A hop and wiggle        |
| `animatePet("is-resting")` | Slow breathing          |

Feed and Play already call this helper. Add the Rest call inside your Rest function.

The helper removes old action classes and adds the requested class to the creature wrapper. CSS runs the matching animation. It also handles repeat clicks, and an `animationend` listener removes the classes when the effect finishes. You can use it without changing its internals.

You will see `(event) => { ... }` in that listener. This is another way of writing a function, called an arrow function. The browser passes in an event object describing what happened. Your new button actions can keep using named functions like `feedPet`.

Animations only change appearance: they do not change happiness or messages. They run on the wrapper so the character’s own positioning and mouse-following eyes are preserved. People with reduced-motion settings will not see these action animations.

## 11. Change CSS classes and button properties

These are useful JavaScript tools for game over and a possible reset. Here is a separate example using a notice box:

```js
const notice = document.querySelector("#notice");
notice.classList.add("is-visible");
notice.classList.remove("is-visible");
```

`classList.add` adds a class; `classList.remove` removes one. Pass just the class name, without the CSS selector’s dot. `classList.contains("is-visible")` returns `true` or `false`.

Your project already has `.pet-creature.is-game-over` CSS. Adding `is-game-over` to the creature wrapper makes it fade out. Leave the number and status message visible so the player knows what happened.

Buttons also have a `disabled` property. Setting a button’s `.disabled` to `true` prevents normal mouse and keyboard activation; setting it to `false` enables it again. This is a boolean, not the string `"true"`.

**Your turn:** use these tools when you implement game over. Disabling the care buttons is only part of it: the action functions should also refuse to change an ended game.

## 12. Repeat an action with setInterval

`setInterval` asks the browser to call a function repeatedly. It takes a function and a delay in milliseconds. There are 1000 milliseconds in one second.

This independent example prints a message every five seconds:

```js
function reportTime() {
	console.log("Another five seconds have passed.");
}

const reminderTimer = setInterval(reportTime, 5000);
```

As with the click listener, pass the function without calling it. The first call happens after the delay, rather than immediately. Browser timers are approximate and can slow down in background tabs; this is fine for our simple game.

The return value from `setInterval` identifies the timer. Keep it in a variable so another function can stop it:

```js
clearInterval(reminderTimer);
```

That line stops future calls; it does not undo previous changes. Do not put it immediately after starting your game timer unless you intend to stop it straight away.

For your decay task:

1. Write a named function for one timer tick.
2. Make it lower happiness by 1, keeping the value at or above 0.
3. Check whether the game has ended, then update the display.
4. Start one interval near the bottom of the script, after the starting variables are set up.
5. Save its ID where your game-over code can access it.

Do not create intervals inside Feed, Play, Rest, or `updatePet()`. Each call to `setInterval` creates another timer, which would make decay speed up unexpectedly.

## 13. Plan game over before writing it

Use a boolean variable to remember whether the game has ended. Shared game state belongs near your other variables, outside the functions.

A `return` statement exits a function immediately. Here is an unrelated example of this pattern:

```js
function openDoor() {
	if (doorLocked) {
		return;
	}

	console.log("Opening the door.");
}
```

This example assumes a `doorLocked` boolean already exists. Apply the same idea to stop care actions and timer ticks from changing a finished game. Put the check before changing values, messages, or animations.

Write a short plan for your game-over check:

- Has the game already ended? Avoid doing the same work again.
- Has happiness reached 0? Later, has any other implemented attribute reached 0?
- Remember that the game is over.
- Stop the interval using its saved ID.
- Store a clear final message.
- Add the fade class and disable the care buttons.
- Update the page so the final values and message are visible.

Call your check after changes from the timer **and** from buttons. Once Play uses energy, it might be the action that brings energy to zero.

For multiple attributes, `||` can join conditions where either should end the game. For example, `fuel <= 0 || water <= 0` is true if either of those example values is empty. Only refer to variables you have actually created.

## 14. Add energy when the basic game works

Energy needs the same pieces as happiness: a number stored in a variable, an HTML display, an element selection, and a line in `updatePet()` to show the value.

Decide its starting value, maximum, how much Play uses, and how much Rest restores. Keep it between 0 and its maximum. Add its decay to the existing timer function; you do not need another timer.

Before playing, check whether enough energy is available. If not, set a helpful message, update the display, and return before spending energy or starting the animation.

Consider the difference between “not enough energy to play” and “energy has reached zero, so the game is over”. Write down your rules, then test both situations.

## 15. Optional reset

A reset action has several jobs. Restore the starting numbers and message, clear the game-over flag, remove the fade class, and enable the care buttons again. Update the page and restart decay.

Stop any old timer before starting a new one, including when the player presses Reset during an active game. If the saved timer ID must be replaced, declare that variable with `let`.

Test repeated resets: one five-second period should still cause just one decay tick.

## 16. Find and fix mistakes

Open your browser’s developer tools and select **Console**. In Chrome on a Mac, use Option–Command–J. Errors usually include a file location you can click. Fix the first error, save, and try again.

To inspect a value while you work, temporarily add:

```js
console.log("Happiness is", happiness);
```

Place it inside an action to see the value each time the action runs. Remove debugging messages once you understand the behaviour.

| Symptom                                             | Check                                                                                |
| --------------------------------------------------- | ------------------------------------------------------------------------------------ |
| Nothing responds after an edit                      | Look for a missing quote, parenthesis, or closing brace in the console               |
| “Cannot read properties of null”                    | Does the selector match the HTML ID or class exactly?                                |
| “... is not defined”                                | Check spelling and whether the variable is declared where the function can access it |
| “Identifier ... has already been declared”          | Did you paste a second `const` or `let` for an existing name?                        |
| A function runs on page load instead of on click    | Did you accidentally put `()` after its name in the listener?                        |
| The number changes in the console but not on screen | Call `updatePet()` after changing the variables                                      |
| Happiness becomes 11                                | Check the limit after adding 2, especially when starting at 9                        |
| Decay gets faster after clicks or resets            | Check for more than one running interval                                             |
| Game-over text gets replaced                        | Check for an early return before care functions change the message                   |
| Animation does not play                             | Check the class name and whether reduced motion or game over is active               |

When stuck, reduce the problem: make one button log one message, confirm it works, then add one step at a time. Ask your mentor to look at the smallest part you cannot explain.

## 17. Check your finished game

- Feed increases happiness by 1 and stays at 10 after repeated clicks.
- Play increases happiness by 2 but never goes above 10, including from 9.
- Rest changes the message without changing happiness; if you added energy, it restores that instead.
- Each working action triggers its own animation when motion is enabled.
- Waiting lowers happiness once per interval and never below 0.
- Reaching 0 ends the game, stops the timer, fades the creature, and leaves the final message visible.
- Care buttons cannot change an ended game.
- Any extra attributes follow the same limits and game-over rules.
- Tab reaches the enabled buttons; Enter or Space activates them.
- The page still fits a narrow browser window.

Run `npm run build` to check that Astro can build the site. A successful build does not prove your game rules are correct, so try the interactions too.

Finally, explain one action aloud: which event starts it, which function runs, which variable changes, and which line updates the page?
