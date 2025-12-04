import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:1337/api",
});

export const getReviews = async () => {
  const res = await api.get("/reviews?populate=*");
  return res.data.data;
};

export const getReviewBySlug = async (slug) => {
  const res = await api.get(`/reviews?filters[slug][$eq]=${slug}&populate=*`);
  return res.data.data[0];
};