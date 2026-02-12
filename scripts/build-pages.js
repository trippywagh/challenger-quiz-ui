const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

const root = path.join(__dirname, '..')
// Use repo name for GitHub Pages base path (change if your repo name is different)
const basePath = '/challenger-quiz-ui'

process.env.BASE_PATH = basePath
process.env.NEXT_PUBLIC_BASE_PATH = basePath
execSync('npm run build', { cwd: root, stdio: 'inherit' })

const outDir = path.join(root, 'out')
const docsDir = path.join(root, 'docs')
if (fs.existsSync(docsDir)) fs.rmSync(docsDir, { recursive: true })
fs.cpSync(outDir, docsDir, { recursive: true })
fs.writeFileSync(path.join(docsDir, '.nojekyll'), '')
console.log('Copied build to docs/ for GitHub Pages (Deploy from branch).')
console.log('Next: git add docs && git commit -m "Update docs" && git push')
console.log('Then set Settings → Pages → Source: Deploy from branch, Branch: main, Folder: /docs')
