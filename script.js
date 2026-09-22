/* =========================================
   POOL DOCTOR
   MAIN JAVASCRIPT
========================================= */

/* =========================================
   ELEMENTS
========================================= */
const header = document.getElementById("header");
const menuToggle = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");
const mobileLinks = mobileMenu ? mobileMenu.querySelectorAll("a") : [];

/* =========================================
   NAVBAR SCROLL EFFECT
========================================= */
if (header) {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });
}

/* =========================================
   MOBILE MENU
========================================= */
if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () => {
        const isOpen = mobileMenu.classList.toggle("active");

        menuToggle.setAttribute("aria-expanded", isOpen);
        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );
    });

    /* Close mobile menu when a link is clicked */
    mobileLinks.forEach((link) => {
        link.addEventListener("click", () => {
            mobileMenu.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation menu");
        });
    });

    /* Close mobile menu when clicking outside */
    document.addEventListener("click", (event) => {
        const clickedInsideMenu = mobileMenu.contains(event.target);
        const clickedToggle = menuToggle.contains(event.target);

        if (
            !clickedInsideMenu &&
            !clickedToggle &&
            mobileMenu.classList.contains("active")
        ) {
            mobileMenu.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation menu");
        }
    });
}

/* =========================================
   REDUCED MOTION CHECK
========================================= */
const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

if (prefersReducedMotion) {
    document.querySelectorAll(".reveal").forEach((element) => {
        element.classList.add("active");
    });
}

/* =========================================
   SCROLL REVEAL ANIMATION
========================================= */
const revealElements = document.querySelectorAll(".reveal");

if (revealElements.length > 0 && !prefersReducedMotion) {
    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15 }
    );

    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });
}

/* =========================================
   BEFORE & AFTER COMPARISON SLIDER
========================================= */
const comparisonSlider = document.getElementById("comparison-slider");
const comparisonAfter = document.querySelector(".comparison-after");
const comparisonHandle = document.getElementById("comparison-handle");
const comparisonLine = document.querySelector(".comparison-line");

if (
    comparisonSlider &&
    comparisonAfter &&
    comparisonHandle &&
    comparisonLine
) {
    let isDragging = false;

    function updateComparison(clientX) {
        const rect = comparisonSlider.getBoundingClientRect();
        let position = ((clientX - rect.left) / rect.width) * 100;

        // Keep slider between 0% and 100%
        position = Math.max(0, Math.min(100, position));

        comparisonAfter.style.width = `${position}%`;
        comparisonHandle.style.left = `${position}%`;
        comparisonLine.style.left = `${position}%`;
    }

    // Mouse events
    comparisonSlider.addEventListener("mousedown", (event) => {
        isDragging = true;
        updateComparison(event.clientX);
    });

    window.addEventListener("mousemove", (event) => {
        if (!isDragging) return;
        updateComparison(event.clientX);
    });

    window.addEventListener("mouseup", () => {
        isDragging = false;
    });

    // Touch events
    comparisonSlider.addEventListener(
        "touchstart",
        (event) => {
            isDragging = true;
            updateComparison(event.touches[0].clientX);
        },
        { passive: true }
    );

    comparisonSlider.addEventListener(
        "touchmove",
        (event) => {
            if (!isDragging) return;
            updateComparison(event.touches[0].clientX);
        },
        { passive: true }
    );

    comparisonSlider.addEventListener("touchend", () => {
        isDragging = false;
    });
}

/* =========================================
   CONTACT FORM & WHATSAPP REDIRECT
========================================= */
const contactForm = document.getElementById("contact-form");

if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        // Get form input values
        const nameInput = document.getElementById("name");
        const phoneInput = document.getElementById("phone");
        const emailInput = document.getElementById("email");
        const serviceInput = document.getElementById("service");
        const messageInput = document.getElementById("message");

        const name = nameInput ? nameInput.value.trim() : "";
        const phone = phoneInput ? phoneInput.value.trim() : "";
        const email = emailInput ? emailInput.value.trim() : "";
        const service = serviceInput ? serviceInput.value : "";
        const message = messageInput ? messageInput.value.trim() : "";

        // UI state update
        const submitButton = contactForm.querySelector(".form-submit");
        let originalText = "";

        if (submitButton) {
            originalText = submitButton.innerHTML;
            submitButton.innerHTML = `Request Sent ✓`;
            submitButton.disabled = true;
        }

        // WhatsApp integration
        const whatsappNumber = "2347017195937";
        const whatsappMessage = `
Hello Pool Doctor,

I would like to request a service.

*Customer Details*
Name: ${name}
Phone: ${phone}
Email: ${email || "Not provided"}

*Service Needed*
${service}

*Additional Information*
${message || "No additional information provided."}

Thank you.
        `.trim();

        const encodedMessage = encodeURIComponent(whatsappMessage);
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

        // Open WhatsApp in a new tab
        window.open(whatsappURL, "_blank");

        // Reset UI after 3 seconds
        setTimeout(() => {
            contactForm.reset();
            if (submitButton) {
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            }
        }, 3000);
    });
}

/* =========================================
   CURRENT YEAR
========================================= */
const currentYear = document.getElementById("current-year");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}