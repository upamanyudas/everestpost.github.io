/**
 * TMDB API Integration for Everest Post
 * This script fetches movie and TV show data from TMDB API
 */

// Configuration
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500"
const PLACEHOLDER_IMAGE = "/assets/img/placeholder.jpg"

/**
 * Extract TMDB ID and type (movie or tv) from URL
 */
function extractTMDBInfo(url) {
  try {
    // Handle different TMDB URL formats
    // Format 1: https://www.themoviedb.org/movie/12345-movie-title
    // Format 2: https://www.themoviedb.org/tv/67890-show-title
    const regex = /themoviedb\.org\/(movie|tv)\/(\d+)/
    const match = url.match(regex)

    if (match && match.length >= 3) {
      return {
        type: match[1], // 'movie' or 'tv'
        id: match[2], // The numeric ID
      }
    }

    console.error("Could not parse TMDB URL format:", url)
    return null
  } catch (e) {
    console.error("Error parsing TMDB URL:", e, url)
    return null
  }
}

/**
 * Fetch data from TMDB API based on URL
 */
async function fetchTMDBData() {
  // Get all portfolio items with TMDB URLs
  const portfolioItems = document.querySelectorAll(".portfolio-item[data-tmdb-url]")
  if (portfolioItems.length === 0) {
    console.log("No portfolio items with TMDB URLs found")
    return
  }

  // Get the API key from the meta tag
  const metaTag = document.querySelector('meta[name="tmdb-api-key"]')
  if (!metaTag) {
    console.error("TMDB API key meta tag not found")
    return
  }

  const apiKey = metaTag.getAttribute("content")
  if (!apiKey || apiKey === "YOUR_DEVELOPMENT_TMDB_KEY") {
    console.error("TMDB API key is not configured properly")
    return
  }

  console.log("Found", portfolioItems.length, "portfolio items with TMDB URLs")

  // Process each portfolio item
  for (const item of portfolioItems) {
    const tmdbUrl = item.getAttribute("data-tmdb-url")
    if (!tmdbUrl) continue

    console.log("Processing TMDB URL:", tmdbUrl)

    const tmdbInfo = extractTMDBInfo(tmdbUrl)
    if (!tmdbInfo) {
      console.error("Failed to extract TMDB info from URL:", tmdbUrl)
      continue
    }

    const { type, id } = tmdbInfo
    console.log("Extracted type:", type, "and ID:", id)

    try {
      // Fetch data from TMDB API
      const apiUrl = `https://api.themoviedb.org/3/${type}/${id}?api_key=${apiKey}&append_to_response=credits`
      console.log("Fetching from API URL:", apiUrl.replace(apiKey, "API_KEY_HIDDEN"))

      const response = await fetch(apiUrl)
      if (!response.ok) {
        throw new Error(`TMDB API error: ${response.status}`)
      }

      const data = await response.json()
      console.log("Received data for", data.title || data.name)

      // Update the portfolio item with the fetched data
      updatePortfolioItem(item, data, type)
    } catch (error) {
      console.error(`Error fetching TMDB data for ${tmdbUrl}:`, error)
      setPlaceholderData(item)
    }
  }
}

/**
 * Update portfolio item with fetched data
 */
function updatePortfolioItem(element, data, type) {
  // Get or create the image element
  let imgElement = element.querySelector("img")
  if (!imgElement) {
    imgElement = document.createElement("img")
    element.appendChild(imgElement)
  }

  // Set the image source
  if (data.poster_path) {
    imgElement.src = `${TMDB_IMAGE_BASE_URL}${data.poster_path}`
  } else {
    imgElement.src = PLACEHOLDER_IMAGE
  }

  // Set the image alt text
  const title = type === "movie" ? data.title : data.name
  imgElement.alt = title || "Portfolio item"

  // Update title if it exists
  const titleElement = element.querySelector("h3")
  if (titleElement && title) {
    titleElement.textContent = title
  }

  // Add or update description
  if (data.overview) {
    let descElement = element.querySelector(".portfolio-description")
    if (!descElement) {
      descElement = document.createElement("p")
      descElement.className = "portfolio-description"
      element.appendChild(descElement)
    }
    descElement.textContent = data.overview
  }

  // Add year and director/creator info if available
  let metaInfo = ""

  // Year
  if (type === "movie" && data.release_date) {
    metaInfo += `${data.release_date.substring(0, 4)}`
  } else if (type === "tv" && data.first_air_date) {
    metaInfo += `${data.first_air_date.substring(0, 4)}`
  }

  // Director (for movies) or creator (for TV shows)
  if (type === "movie" && data.credits && data.credits.crew) {
    const directors = data.credits.crew.filter((person) => person.job === "Director")
    if (directors.length > 0) {
      metaInfo += metaInfo ? " | " : ""
      metaInfo += `Dir: ${directors.map((d) => d.name).join(", ")}`
    }
  } else if (type === "tv" && data.created_by && data.created_by.length > 0) {
    metaInfo += metaInfo ? " | " : ""
    metaInfo += `Created by: ${data.created_by.map((c) => c.name).join(", ")}`
  }

  // Add meta info to the element
  if (metaInfo) {
    let metaElement = element.querySelector(".portfolio-meta")
    if (!metaElement) {
      metaElement = document.createElement("div")
      metaElement.className = "portfolio-meta"
      element.appendChild(metaElement)
    }
    metaElement.textContent = metaInfo
  }
}

/**
 * Set placeholder data when API fails
 */
function setPlaceholderData(element) {
  // Get or create the image element
  let imgElement = element.querySelector("img")
  if (!imgElement) {
    imgElement = document.createElement("img")
    element.appendChild(imgElement)
  }

  // Set placeholder image
  imgElement.src = PLACEHOLDER_IMAGE
  imgElement.alt = "Portfolio item"

  // Add a note about the error
  let errorElement = element.querySelector(".portfolio-error")
  if (!errorElement) {
    errorElement = document.createElement("p")
    errorElement.className = "portfolio-error"
    element.appendChild(errorElement)
  }
  errorElement.textContent = "Could not load data from TMDB"
}

// Run the fetcher when the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM loaded, initializing TMDB fetcher")
  fetchTMDBData()
})

