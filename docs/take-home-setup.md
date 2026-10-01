# Run your project at home

You can keep changing your website and virtual pet on your own computer. You’ll need the project folder, Node.js, a code editor, and a web browser.

## 1. Take a copy of the project

Copy the `hello-theo` project folder onto your computer. If you receive a ZIP file, extract it first. Put it somewhere easy to find, such as Documents.

Keep the source files and folders, including `src`, `docs`, any `public` folder, `package.json`, `package-lock.json`, `astro.config.mjs`, and `tsconfig.json`. Keep `.nvmrc` too if it is included.

You can leave out `node_modules`, `dist`, and `.astro`: these are generated folders that your computer can recreate. You don’t need the `.git` history to run your copy.

## 2. Install Node.js once

Node.js runs the tools that build and serve your website. Its installer also supplies **npm**, which installs the project’s dependencies and runs its commands.

1. Visit the official [Node.js download page](https://nodejs.org/en/download).
2. Choose **Node.js 24 LTS** to match this project’s setup. LTS means “Long-Term Support”.
3. Select your operating system and download the installer: `.msi` for Windows or `.pkg` for macOS. Use the installer option rather than copying terminal installation scripts.
4. Open the installer and follow its steps, keeping the default options.
5. Close and reopen your code editor and terminal after installation.

For Linux, use the installation instructions on the same official page for your system.

To check installation, open a terminal and run these commands one at a time:

```sh
node --version
npm --version
```

Both should print a version number. Node should show `v24...`; npm has its own version number and does not need to match it.

## 3. Open the project and install its dependencies

In VS Code, choose **File → Open Folder**, then select your copied `hello-theo` folder. Choose **Terminal → New Terminal**. This should open a terminal in the project folder—the one containing `package.json`.

If you use a separate terminal, move into the folder first. For example, if you put it in Documents:

```sh
cd "Documents/hello-theo"
```

That example assumes your terminal starts in your home folder. Adjust the path to wherever you saved the project. Quotes let paths contain spaces.

Run:

```sh
npm install
```

Wait for it to finish. You need an internet connection for this step. It downloads tools such as Astro into a new `node_modules` folder. You normally only need to do this once for a fresh copy, or after the project’s dependencies change.

## 4. Start your website

In the same terminal, run:

```sh
npm run dev
```

Open the local address printed in the terminal, usually `http://localhost:4321`.

- `/` — your homepage
- `/creature` — your own CSS creature
- `/creature-example` — the reference creature
- `/virtual-pet` — your JavaScript pet project

For example, open `http://localhost:4321/virtual-pet`. If the terminal prints a different port number, use that one instead.

Keep the terminal running while you work. Save a source file to see your changes in the browser. Don’t double-click an `.astro` file to run it: use the local website address.

This runs the site on your computer; it does not publish it online.

## 5. Stop and come back later

Click inside the terminal and press **Ctrl+C** to stop the server, including on a Mac. If Windows asks whether to terminate the job, confirm it.

Next time, open the project folder and terminal, then run `npm run dev` again. You do not need to reinstall Node or run `npm install` every time.

Your saved code stays in the project folder. The pet’s game values reset when you refresh or reopen the page.

## Useful checks and help

Run `npm run build` to check that the project builds. To view that built version, run `npm run preview` and open the address it prints. For normal editing, use `npm run dev`.

| Problem | Try this |
| --- | --- |
| `node` or `npm` is not recognised | Restart your terminal and editor. If needed, rerun the Node installer. |
| npm cannot find `package.json` | Open the terminal in the project folder, not its parent or the `src` folder. |
| Windows PowerShell says `npm.ps1` cannot run | Use a Command Prompt terminal, or type `npm.cmd install` and `npm.cmd run dev` instead. |
| The browser cannot connect | Check that `npm run dev` is still running and use the exact address it printed. |
| A change does not appear | Save the file, check the terminal for errors, and refresh the browser. |

Continue with the [CSS creature guide](create-a-creature.md) and [Virtual Pet JavaScript guide](virtual-pet-javascript.md). If something goes wrong, copy the full error message so your mentor can help.
