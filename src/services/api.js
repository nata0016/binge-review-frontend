import axios from 'axios'

const API_URL = "http://localhost:1337/api/reviews?populate=*";

export async function getReviews() {
  const res = await axios.get(API_URL)
  // Return the full Strapi response object so callers can access `res.data` and `res.meta` consistently
  return res.data
}

export async function getReview(slug) {
  const res = await axios.get(API_URL)
  return res.data.data.find(r => r.attributes.slug === slug)
}