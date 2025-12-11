# BingeReview – Movie & TV Series Review Site

BingeReview is a student-built review site that displays reviews for movies and TV series.  
The website uses **Strapi** as a Headless CMS and **Vue 3 + Vite** for the frontend.  
This project was created as part of a web development course assignment.

---

## 🧾 Project Overview

BingeReview is a small but complete **review platform** where users can:

- Browse a list of reviews (movies and TV series),
- Search reviews by **title** or **genre**,
- Open a **detail page** for each review,
- View ratings, short descriptions, and cover images.

All review content is managed in **Strapi** (Headless CMS) and exposed through a **REST API**.  
The Vue frontend consumes this API and renders the content dynamically.

---

## ✅ Assignment Requirements Coverage

This project covers the assignment requirements as follows:

- **Headless CMS created and populated**  
  - Strapi is used as the Headless CMS.  
  - A `Review` content type is created and filled with data.

- **Data available through a REST API**  
  - Strapi exposes review data via endpoints such as:  
    `GET /api/reviews` and `GET /api/reviews/:id` (with `populate` for images).

- **Frontend consumes Strapi data**  
  - The Vue frontend calls the Strapi REST API using `fetch`/`axios` through a service layer (`api.js`).

- **Static site displays a list of review titles (minimum 10 reviews)**  
  - The Home page shows a **grid of review cards** with title, rating, genre, description, and image.  
  - There are **at least 10 reviews** stored and published in Strapi.

- **Search functionality**  
  - A search input filters reviews **by title and genre** in real time on the Home page.

- **Clicking a review opens a full review page**  
  - Each card links to a **Review Detail** page (`/reviews/:title`) showing the full review content and hero image.

- **Site-wide navigation**  
  - Header navigation includes links to:  
    - `Home / Reviews` (`/`)  
    - `About` (`/about`)  
    - `Contact` (`/contact`)

- **Responsive design**  
  - The layout is responsive and tested on mobile, tablet, and desktop screen sizes.

- **Use of JavaScript framework**  
  - The frontend is built with **Vue 3** and **Vite**.

- **Static site publicly published**  
  - The frontend is deployed to a static host  **GitHub Pages**


---

## ✨ Features

- Dynamic list of reviews fetched from Strapi
- Search by **title** or **genre**
- Individual review detail pages
- Cover images for each review
- Site-wide navigation (Home, Reviews, About, Contact)
- Responsive card grid layout
- Clear separation between **backend (CMS)** and **frontend (client)**

---

## 🛠 Technology Stack

**Backend (Headless CMS)**  
- Strapi (Node.js / REST API)

**Frontend**  
- Vue 3  
- Vite  
- Vue Router  
- Custom CSS (no heavy UI framework)

**Deployment**  
- Static hosting with [GitHub Pages]  
- GitHub private repositories for:
  - `binge-review-backend` (Strapi)
  - `binge-review-frontend` (Vue)

---

## 🧩 Architecture

The project is split into **two separate repositories**:

1. **Backend – Strapi**   
   - Defines the `Review` content type  
   - Manages content and media (cover images)  
   - Exposes review data via REST API

2. **Frontend – Vue 3**   
   Live site: `[LIVE_SITE_URL_HERE]`  
   - Consumes Strapi API  
   - Displays the list of reviews  
   - Provides search and navigation  
   - Shows review details on dedicated pages

---

## 🧱 Data Model

In Strapi, the main content type is:

### `Review`

Fields (example):

- `title` (Text) – title of the movie/series  
- `genre` (Text) – e.g. Drama, Sci-Fi, Thriller  
- `rating` (Number) – rating out of 5  
- `shortDescription` (Text) – short summary displayed in the card  
- `content` (Rich Text / Text) – full review text  
- `image` (Media) – cover/poster image

---

## 🧪 How to Run the Project Locally

> ⚠️ Prerequisites:
> - Node.js and npm installed  
> - Git installed

You need to run **Strapi (backend)** and **Vue (frontend)** at the same time.

---


⚠️ Important Note About the Backend
The Strapi backend is not deployed publicly and runs locally for this project.
When Strapi is running locally (http://localhost:1337) and the frontend is also running locally (http://localhost:5173), the site displays live review data from Strapi.



