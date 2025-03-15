document.addEventListener("DOMContentLoaded", () => {
  // Simple gallery functionality
  const galleryItems = document.querySelectorAll(".gallery-item")
  const modal = document.getElementById("galleryModal")
  const modalImage = document.getElementById("modalImage")
  const modalTitle = document.getElementById("modalTitle")
  const modalDescription = document.getElementById("modalDescription")
  const closeModal = document.querySelector(".close-modal")

  // Open modal when clicking on gallery items
  galleryItems.forEach((item) => {
    item.addEventListener("click", function () {
      const image = this.querySelector("img").src
      const title = this.getAttribute("data-title")
      const description = this.getAttribute("data-description")

      modalImage.src = image
      modalTitle.textContent = title
      modalDescription.textContent = description
      modal.classList.add("active")
    })
  })

  // Close modal when clicking the close button
  closeModal.addEventListener("click", () => {
    modal.classList.remove("active")
  })

  // Close modal when clicking outside the content
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active")
    }
  })

  // Close modal with Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      modal.classList.remove("active")
    }
  })
})

