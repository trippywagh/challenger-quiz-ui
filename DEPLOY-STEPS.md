# Publish to GitHub and get a public URL – step by step

Do these in order. Replace `YOUR_GITHUB_USERNAME` and `YOUR_REPO_NAME` with your real GitHub username and the name you want for the repo (e.g. `challenger-quiz-ui`).

---

## Part 1: Create the repo on GitHub (in the browser)

**Step 1.** Open: **https://github.com/new**

**Step 2.** Set:
- **Repository name:** e.g. `challenger-quiz-ui` (this will be in the URL later).
- **Public.**
- Do **not** check “Add a README” or “Add .gitignore”.
- Click **Create repository**.

**Step 3.** Leave that page open. You’ll need the repo URL, e.g.  
`https://github.com/YOUR_GITHUB_USERNAME/challenger-quiz-ui.git`

---

## Part 2: Push your code (in the terminal)

Open Terminal (or Command Prompt) and run **one block at a time**. Wait for each to finish before the next.

**Step 4.** Go to your project folder:
```bash
cd /Users/wagh/Downloads/challenger-quiz-ui
```

**Step 5.** Start git (only if this is the first time):
```bash
git init
```
If it says “Reinitialized” or “already exists”, that’s fine.

**Step 6.** Add all files:
```bash
git add .
```

**Step 7.** Make the first commit:
```bash
git commit -m "Initial commit"
```

**Step 8.** Name the main branch `main`:
```bash
git branch -M main
```

**Step 9.** Tell git where your GitHub repo is (use YOUR username and repo name):
```bash
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPO_NAME.git
```
Example:
```bash
git remote add origin https://github.com/johndoe/challenger-quiz-ui.git
```
If it says “remote origin already exists”, use:
```bash
git remote set-url origin https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPO_NAME.git
```

**Step 10.** Push the code:
```bash
git push -u origin main
```
If it asks for login, use your GitHub username and a **Personal Access Token** (not your normal password).  
To create a token: GitHub → Settings → Developer settings → Personal access tokens → Generate new token. Give it “repo” scope.

---

## Part 3: Turn on GitHub Pages (in the browser)

**Step 11.** On GitHub, open **your repo** (e.g. `https://github.com/YOUR_GITHUB_USERNAME/challenger-quiz-ui`).

**Step 12.** Click **Settings** (top menu of the repo).

**Step 13.** In the left sidebar, click **Pages**.

**Step 14.** Under **Build and deployment**:
- **Source:** choose **GitHub Actions** (not “Deploy from a branch”).

**Step 15.** Go to the **Actions** tab. You should see a workflow run (e.g. “Deploy to GitHub Pages”). Wait until it has a green tick (about 2–5 minutes).

---

## Part 4: Open your public URL

**Step 16.** Your site will be at:
```
https://YOUR_GITHUB_USERNAME.github.io/YOUR_REPO_NAME/
```
Example: `https://johndoe.github.io/challenger-quiz-ui/`

Open that in your browser. If the workflow is still running, wait for it to finish and refresh.

---

## If something fails

- **Step 10 – “Permission denied” or “Authentication failed”**  
  Use a Personal Access Token instead of your password: GitHub → Settings → Developer settings → Personal access tokens.

- **Step 10 – “remote origin already exists”**  
  Run: `git remote set-url origin https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPO_NAME.git` then try `git push -u origin main` again.

- **Actions tab – workflow fails**  
  Click the failed run and read the red error message. Often it’s a typo in the repo name or a missing file. Fix, then: `git add .` → `git commit -m "Fix"` → `git push`.

- **Page is blank or 404**  
  Make sure in Settings → Pages the source is **GitHub Actions**, and wait a few minutes after the workflow turns green.
