# Challenger Quiz UI

A prototype quiz app with chapter landing and challenger (friend/bot) modes. Built with Next.js and deployable to **GitHub Pages** for a public URL.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy to GitHub Pages (public URL)

This repo uses **Deploy from a branch** (no GitHub Actions). The built site lives in the `docs/` folder.

1. **Build the site and update `docs/`:**
   ```bash
   npm run build:pages
   ```

2. **Push the `docs` folder:**
   ```bash
   git add docs
   git commit -m "Update site"
   git push
   ```

3. **In your GitHub repo:** **Settings → Pages**
   - **Source:** Deploy from a branch
   - **Branch:** `main`
   - **Folder:** **/docs** ← must be **/docs**, not root
   - Save

4. **Open your site:**  
   **https://YOUR_USERNAME.github.io/challenger-quiz-ui/**

If you see the README instead of the app, the **Folder** in Settings → Pages is not set to **/docs**.

## Build for production (static export)

```bash
npm run build
```

Output is in the `out/` folder. Use `npm run build:pages` to build and copy into `docs/` for GitHub Pages.
