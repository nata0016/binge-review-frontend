const API_BASE = 'http://localhost:1337/api/reviews'

export async function getReviews() {
  const res = await fetch(`${API_BASE}?populate=*`)
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Failed to fetch reviews: ${res.status} ${text}`)
  }
  const json = await res.json()
  // Return the full Strapi response object (same shape as axios' res.data)
  return json
}

export async function getReview(param) {
  // If the param looks like a numeric id, fetch by id endpoint
  const isId = /^[0-9]+$/.test(String(param))
  let url
  if (isId) {
    url = `${API_BASE}/${encodeURIComponent(param)}?populate=*`
  } else {
    // Query Strapi for a review with the given title
    url = `${API_BASE}?filters[title][$eq]=${encodeURIComponent(param)}&populate=*`
  }
  const res = await fetch(url)
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Failed to fetch review: ${res.status} ${text}`)
  }
  const json = await res.json()
  // If fetched by id, Strapi returns an object in `data`; if fetched by filter it returns an array in `data`.
  if (!json.data) return null
  if (Array.isArray(json.data)) return json.data[0] ?? null
  return json.data
}