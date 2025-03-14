/**
 * Sitemap Generator Helper
 * This script helps generate a dynamic sitemap for Everest Post
 */

document.addEventListener("DOMContentLoaded", () => {
  // This is a placeholder for any client-side sitemap functionality
  // For example, you might want to add a sitemap link in the footer

  const footer = document.querySelector("footer")
  if (footer) {
    const sitemapLink = document.createElement("a")
    sitemapLink.href = "/sitemap.xml"
    sitemapLink.textContent = "Sitemap"
    sitemapLink.className = "sitemap-link"
    sitemapLink.style.marginLeft = "15px"
    sitemapLink.style.fontSize = "0.8em"
    sitemapLink.style.color = "#999"

    const socialIcons = footer.querySelector(".social-icons")
    if (socialIcons) {
      socialIcons.appendChild(sitemapLink)
    }
  }
})

