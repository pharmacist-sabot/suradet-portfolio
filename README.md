<div align="center">

# **Suradet Pratomsak | Portfolio**

### _A dynamic portfolio to showcase professional works, innovations, and speaker experiences._

<br>

<p>
  <a href="https://github.com/pharmacist-sabot/suradet-portfolio/commits/main">
    <img src="https://img.shields.io/github/last-commit/pharmacist-sabot/suradet-portfolio?style=for-the-badge&color=blue&logo=github" alt="Last Commit">
  </a>
  <a href="https://github.com/pharmacist-sabot/suradet-portfolio">
    <img src="https://img.shields.io/github/languages/top/pharmacist-sabot/suradet-portfolio?style=for-the-badge&color=yellow&logo=javascript" alt="Top Language">
  </a>
  <a href="https://github.com/pharmacist-sabot/suradet-portfolio">
    <img src="https://img.shields.io/github/languages/count/pharmacist-sabot/suradet-portfolio?style=for-the-badge&color=informational" alt="Language Count">
  </a>
</p>

</div>

---

This repository contains the source code for the personal portfolio of Suradet Pratomsak, an Expert Pharmacist and developer. The site is designed to be a clean, modern, and easily updatable platform to display a curated list of professional achievements, including academic works, innovations, and speaking engagements.

## ✨ Features

- **Dynamic Content:** Portfolio items are fetched from a **Supabase** backend, allowing for easy updates without redeploying the site.
- **Categorized View:** Projects are automatically grouped by category (e.g., Speaker, Academic Work, Innovation) for clear and organized browsing.
- **Detailed Modals:** Clicking on an item opens a modal with more detailed information.
- **Responsive Design:** A mobile-first approach ensures a seamless experience on all devices.
- **Secure Content Management:** A dedicated, key-protected route (`/add`) allows for the easy addition of new portfolio items.
- **Smooth Animations:** Subtle scroll-reveal animations provide a modern and engaging user experience.

## 🛠️ Built With the Tools and Technologies:

<p align="center">
  <img src="https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vue.js&logoColor=4FC08D" alt="Vue.js">
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite">
  <img src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase">
  <img src="https://img.shields.io/badge/Vue_Router-35495E?style=for-the-badge&logo=vue.js&logoColor=4FC08D" alt="Vue Router">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3">
</p>

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js (v18 or higher)
- npm (or any other package manager like yarn, pnpm)

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/pharmacist-sabot/suradet-portfolio.git
    cd suradet-portfolio
    ```

2.  **Install NPM packages:**
    ```sh
    npm install
    ```

3.  **Set up environment variables:**

    Create a `.env.local` file in the root of the project and add your Supabase credentials. You can find these in your Supabase project dashboard.
    ```env
    VITE_SUPABASE_URL="YOUR_SUPABASE_URL"
    VITE_SUPABASE_ANON_KEY="YOUR_SUPABASE_ANON_KEY"
    VITE_ADD_POST_SECRET_KEY="YOUR_SECRET_KEY_FOR_ADDING_POSTS"
    ```

4.  **Run the development server:**
    ```sh
    npm run dev
    ```
    The application will be available at `http://localhost:5173` (or another port if 5173 is busy).

