/**
 * SEO Helper Script for Everest Post
 * Enhances on-page SEO elements and user experience
 */

document.addEventListener("DOMContentLoaded", () => {
  // Add alt text to images that are missing it
  const images = document.querySelectorAll("img:not([alt])")
  images.forEach((img) => {
    // Extract filename from src
    const src = img.getAttribute("src")
    const filename = src.split("/").pop().split(".")[0]
    // Convert filename to readable alt text
    const altText = filename.replace(/[-_]/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())

    img.setAttribute("alt", `${altText} - Everest Post Auckland`)
  })

  // Add title attributes to links without them
  const links = document.querySelectorAll("a:not([title])")
  links.forEach((link) => {
    const text = link.textContent.trim()
    if (text) {
      link.setAttribute("title", text)
    }
  })

  // Track outbound links for analytics
  const externalLinks = document.querySelectorAll('a[href^="http"]:not([href*="' + window.location.hostname + '"])')
  externalLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      // If you have analytics, you can track outbound clicks here
      console.log("Outbound link clicked:", link.href)

      // Add rel attributes for security and SEO
      if (!link.getAttribute("rel")) {
        link.setAttribute("rel", "noopener noreferrer")
      }
    })
  })

  // Add schema.org breadcrumbs for better navigation in search results
  if (window.location.pathname !== "/") {
    const pathSegments = window.location.pathname.split("/").filter((segment) => segment)

    if (pathSegments.length > 0) {
      const breadcrumbList = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: window.location.origin,
          },
        ],
      }

      let currentPath = ""

      pathSegments.forEach((segment, index) => {
        currentPath += "/" + segment

        breadcrumbList.itemListElement.push({
          "@type": "ListItem",
          position: index + 2,
          name: segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " "),
          item: window.location.origin + currentPath,
        })
      })

      const script = document.createElement("script")
      script.type = "application/ld+json"
      script.textContent = JSON.stringify(breadcrumbList)
      document.head.appendChild(script)
    }
  }
})
