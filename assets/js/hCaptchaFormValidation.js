document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const submitButton = document.getElementById('submitButton');
    const captchaError = document.getElementById('captchaError');

    // Initially disable the submit button
    submitButton.disabled = true;
    submitButton.classList.add('disabled');

    // Form submission handler
    form.addEventListener('submit', function(event) {
        // Check if hCaptcha is completed
        const hcaptchaResponse = hcaptcha.getResponse();

        if (!hcaptchaResponse) {
            event.preventDefault();
            captchaError.style.display = 'block';
            return false;
        }

        // If we get here, the form is valid and can be submitted
        captchaError.style.display = 'none';
        return true;
    });
});

// Function called by hCaptcha when captcha is solved
function enableSubmit() {
    const submitButton = document.getElementById('submitButton');
    const captchaError = document.getElementById('captchaError');

    submitButton.disabled = false;
    submitButton.classList.remove('disabled');
    captchaError.style.display = 'none';
}
