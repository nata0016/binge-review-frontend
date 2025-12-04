# binge-review-frontend
# BingeReview – Frontend

BingeReview is a simple review website for TV series by genre (comedy, drama, thriller, etc.).  
This repo contains the frontend built with Vue that displays the reviews from our Strapi backend.

## Tech Stack

- Vue 3 + Vite
- JavaScript
- Vue Router
- CSS (custom styles or a CSS framework)
- Data from Strapi REST API (binge-review-backend)

## Main Features

- Show a list of TV series reviews (at least 10)
- Search reviews (ex: by title or genre)
- Click on a review to see a full detail page
- Site-wide navigation (header/menu)
- Responsive layout for mobile, tablet, and desktop

## Project Structure

- `src/main.js` – App entry
- `src/router/` – Routes (home + review detail)
- `src/views/HomeView.vue` – List of reviews + search
- `src/views/ReviewDetailView.vue` – Single review page
- `src/components/` – Reusable UI components

## How to Run the Project

```bash
npm install
npm run dev
