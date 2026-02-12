# How to enable a public URL with GitHub Pages (step by step)

Your repo: **https://github.com/trippywagh/challenger-quiz-ui**

---

## Step 1: Open your repo in the browser

Go to: **https://github.com/trippywagh/challenger-quiz-ui**

Make sure you are **signed in** to GitHub.

---

## Step 2: Open the repo Settings

- Look at the **top menu** of the repo (where it says Code, Issues, Pull requests, etc.).
- Click **Settings** (right side of that menu, next to Insights).
- If you **don’t see Settings**, the account may not have admin access to this repo (only owners/admins see it).

---

## Step 3: Open the Pages section

- In the **left sidebar** of Settings, scroll until you see **“Pages”** (under “Code and automation” or similar).
- Click **Pages**.

---

## Step 4: Choose the source for deployment

- You should see a section called **“Build and deployment”**.
- Under **“Source”** (or “Deploy from”), you’ll see a dropdown. Click it.
- Select **“GitHub Actions”** (not “Deploy from a branch”).
- Don’t change branch or folder; just set Source to **GitHub Actions** and save if there’s a Save button.

---

## Step 5: Push the workflow so deployment can run

The workflow file is in your project. Commit and push it:

```bash
cd /Users/wagh/Downloads/challenger-quiz-ui
git add .
git commit -m "Add GitHub Pages workflow"
git push
```

---

## Step 6: Wait for the workflow to run

- In your repo, click the **Actions** tab.
- You should see a run named **“Deploy to GitHub Pages”**. Wait until it shows a **green checkmark** (a few minutes).
- If it fails (red X), click the run and read the error message.

---

## Step 7: Open your public URL

After the workflow succeeds, your site will be at:

**https://trippywagh.github.io/challenger-quiz-ui/**

Open that in your browser. If it’s blank, wait 1–2 minutes and refresh.

---

## If you don’t see “Pages” or “Settings”

- **No Settings tab:** You’re not an admin. Ask the repo owner to either give you admin access or do Steps 2–4 for you.
- **Pages is missing in the sidebar:** Make sure you’re in **Settings** of the **repo** (github.com/trippywagh/challenger-quiz-ui), not your profile or organization settings.
- **Source dropdown is empty or different:** Take a screenshot of the whole “Build and deployment” section and share it so we can match it to your GitHub layout.
