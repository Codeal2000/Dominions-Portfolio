# Ige Dominion — Portfolio & 3D Showcase

Official portfolio website for **Ige Dominion** — Visual Storyteller, Cinematographer, 3D Animator, and Motion Designer based in Abuja, Nigeria.

Features interactive 3D WebGL model inspection, embedded video productions (Blender + Cascadeur physics), cinematography case studies, and responsive typography.

---

## 🚀 How to Host on GitHub Pages (Step-by-Step)

This project is already pre-configured with **relative path resolution (`base: './'`)** and an **automated GitHub Actions workflow** so you can deploy it in a few clicks.

### Option 1: Automatic GitHub Actions Deployment (Recommended)

1. **Create a GitHub Repository**:
   - Go to [GitHub.com](https://github.com) and click **New Repository**.
   - Name it (e.g., `portfolio` or `ige-dominion-portfolio`).
   - Leave it as **Public** and do not check "Initialize with README".

2. **Push your code to GitHub**:
   If using the terminal:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPOSITORY_NAME.git
   git push -u origin main
   ```
   *(Or if you exported a ZIP from AI Studio Settings -> Export, extract it and upload the files to your GitHub repository).*

3. **Enable GitHub Pages**:
   - In your GitHub repository, click on the **Settings** tab at the top.
   - On the left sidebar, click **Pages** (under the "Code and automation" section).
   - Under **Build and deployment** -> **Source**, select **GitHub Actions**.

4. **Your Site is Live!**:
   - GitHub will automatically run the `.github/workflows/deploy.yml` action.
   - In 1–2 minutes, your website will be live at:
     ```
     https://YOUR_GITHUB_USERNAME.github.io/YOUR_REPOSITORY_NAME/
     ```

---

### Option 2: Deploying to Custom User Domain (`username.github.io`)

If you want your website to be your primary personal domain on GitHub:
1. Name your repository exactly: `YOUR_GITHUB_USERNAME.github.io`
2. Push the files to the `main` branch.
3. In **Settings -> Pages**, set source to **GitHub Actions**.
4. Your site will automatically be live at `https://YOUR_GITHUB_USERNAME.github.io/`.

---

## 💻 Local Development

To run and preview the site locally on your computer:

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` (or the URL printed in your terminal) to view the live app.

3. **Build for production**:
   ```bash
   npm run build
   ```
   This compiles all static assets and the bundle into the `dist/` folder.

---

## 📁 Project Structure

```text
├── .github/
│   └── workflows/
│       └── deploy.yml        # Automatic GitHub Pages CI/CD deployment
├── public/
│   ├── shoe_model.glb        # Interactive 3D WebGL footwear model
│   └── *.jpg                 # Photography & showcase stills
├── src/                      # Source assets, React entry, and utilities
├── index.html                # Main portfolio markup & interactive layout
├── vite.config.ts            # Vite bundler configuration (with base: './')
├── package.json              # Project scripts and dependencies
└── README.md                 # Setup & hosting documentation
```

---

## 📬 Contact & Inquiries

- **Name**: Ige Dominion
- **Location**: Abuja, Nigeria
- **Email**: [igedominion09@gmail.com](mailto:igedominion09@gmail.com)
- **YouTube Showcase**: [Night Alley 3D Sequence](https://www.youtube.com/shorts/PyTLJwkbYds)
