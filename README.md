# Astro Template ZN

Starting template for an Astro i18n app bootstraped with tailwind, ui by shadcn, light/dark theme, and server actions with validation.

### This template uses `pnpm`

Download it if you don't already have it

```sh
npm install -g pnpm
```

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text

├── public/
├── src/
│   └── pages/
│       └── index.astro
│       └── about.astro
|       └── fr
│           └── index.astro
│           └── about.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any React components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                | Action                                           |
| :--------------------- | :----------------------------------------------- |
| `pnpm install`         | Installs dependencies                            |
| `pnpm dev`             | Starts local dev server at `localhost:4321`      |
| `pnpm build`           | Build your production site to `./dist/`          |
| `pnpm preview`         | Preview your build locally, before deploying     |
| `pnpm astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `pnpm astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
