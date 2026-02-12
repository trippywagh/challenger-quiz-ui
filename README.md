# Challenger Quiz UI

A prototype quiz app with chapter landing and challenger (friend/bot) modes. Built with Next.js and deployable to **GitHub Pages** for a public URL.

## Run locally

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy to GitHub Pages (public URL)

1. **Create a GitHub repo** and push this code:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git branch -M main
   git push -u origin main
   ```

2. **Turn on GitHub Pages** in the repo:
   - Go to **Settings → Pages**
   - Under **Build and deployment**, set **Source** to **GitHub Actions**

3. **Trigger a deploy**  
   Pushing to `main` runs the workflow and deploys the site. You can also run it manually: **Actions → Deploy to GitHub Pages → Run workflow**.

4. **Open your site**  
   After the workflow finishes, the site will be at:
   - **https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/**

The workflow builds a static export with the correct base path for that URL, so all links and assets work on the live page.

## Build for production (static export)

```bash
pnpm build
```

Output is in the `out/` folder. For GitHub Pages the workflow runs this with `BASE_PATH=/YOUR_REPO_NAME` so the app works at the GitHub Pages URL.
