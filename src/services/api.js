import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:1337/api",
});

export async function getReviews() {
  const res = await api.get("/reviews?populate=*");
  // IMPORTANT : on renvoie bien res.data.data (le tableau de Strapi)
  return res.data?.data ?? [];
}

export async function getReviewBySlug(slug) {
  const res = await api.get(
    `/reviews?filters[slug][$eq]=${slug}&populate=*`
  );
  return res.data?.data?.[0] ?? null;
}