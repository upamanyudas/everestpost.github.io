document.addEventListener('DOMContentLoaded', function() {
    // Clone main menu for mobile
    const mainMenu = document.getElementById('main-menu');
    const mobileNavLinks = document.querySelector('.mobile-nav-links');

    // Clone the menu items but exclude the logo container
    mainMenu.querySelectorAll('li').forEach(function(item) {
        if (!item.classList.contains('logo-container')) {
            const clone = item.cloneNode(true);

            // If it's a dropdown, modify it for mobile
            if (clone.classList.contains('dropdown')) {
                const dropdownLink = clone.querySelector('a');
                const dropdownContent = clone.querySelector('.dropdown-content');

                // Convert to mobile dropdown format
                clone.classList.add('mobile-dropdown');
                clone.classList.remove('dropdown');

                // Add chevron icon to dropdown toggle
                dropdownLink.classList.add('mobile-dropdown-toggle');
                dropdownLink.innerHTML += ' <i class="fas fa-chevron-down"></i>';

                // Convert dropdown content to mobile format
                const mobileDropdownContent = document.createElement('ul');
                mobileDropdownContent.classList.add('mobile-dropdown-content');

                // Move links from dropdown content to mobile dropdown content
                dropdownContent.querySelectorAll('a').forEach(function(link) {
                    const li = document.createElement('li');
                    li.appendChild(link.cloneNode(true));
                    mobileDropdownContent.appendChild(li);
                });

                // Replace the original dropdown content with mobile version
                clone.removeChild(dropdownContent);
                clone.appendChild(mobileDropdownContent);
            }

            mobileNavLinks.appendChild(clone);
        }
    });

    // Desktop dropdown menu
    const dropdown = document.querySelector('.dropdown');
    const dropdownContent = document.querySelector('.dropdown-content');

    // Show dropdown on mouseenter
    dropdown.addEventListener('mouseenter', function() {
        this.classList.add('active');
    });

    // Don't hide immediately, check if mouse is over dropdown content
    dropdown.addEventListener('mouseleave', function(e) {
        // Get the position of the mouse and the dropdown content
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        const dropdownRect = dropdownContent.getBoundingClientRect();

        // Check if mouse is moving toward the dropdown content
        if (!(mouseX >= dropdownRect.left &&
              mouseX <= dropdownRect.right &&
              mouseY >= dropdownRect.top - 10 &&
              mouseY <= dropdownRect.bottom)) {
            this.classList.remove('active');
        }
    });

    // Also check when leaving the dropdown content
    dropdownContent.addEventListener('mouseleave', function(e) {
        const dropdownRect = dropdown.getBoundingClientRect();
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        // If mouse is not moving back to the dropdown trigger, close the dropdown
        if (!(mouseX >= dropdownRect.left &&
              mouseX <= dropdownRect.right &&
              mouseY >= dropdownRect.top &&
              mouseY <= dropdownRect.bottom)) {
            dropdown.classList.remove('active');
        }
    });

    // Mobile hamburger menu toggle
    const hamburger = document.querySelector('.hamburger-menu');
    const mobileMenu = document.querySelector('.mobile-menu');
    const body = document.body;

    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        body.classList.toggle('menu-open');
    });

    // Mobile dropdown toggle
    document.querySelectorAll('.mobile-dropdown-toggle').forEach(function(toggle) {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            this.closest('.mobile-dropdown').classList.toggle('active');
        });
    });

    // Smooth scroll when clicking on the scroll down indicator
    const scrollDownAnimation = document.getElementById('scroll-down-animation');
    if (scrollDownAnimation) {
        scrollDownAnimation.addEventListener('click', function() {
            const clientsSection = document.querySelector('.clients');
            if (clientsSection) {
                clientsSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
});
