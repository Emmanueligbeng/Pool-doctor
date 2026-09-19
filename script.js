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

const mobileLinks = mobileMenu.querySelectorAll("a");


/* =========================================
   NAVBAR SCROLL EFFECT
========================================= */

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

});


/* =========================================
   MOBILE MENU
========================================= */

menuToggle.addEventListener("click", () => {

    const isOpen =
        mobileMenu.classList.toggle("active");

    menuToggle.setAttribute(
        "aria-expanded",
        isOpen
    );

    menuToggle.setAttribute(
        "aria-label",
        isOpen
            ? "Close navigation menu"
            : "Open navigation menu"
    );

});


/* =========================================
   CLOSE MOBILE MENU
   WHEN LINK IS CLICKED
========================================= */

mobileLinks.forEach((link) => {

    link.addEventListener("click", () => {

        mobileMenu.classList.remove("active");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Open navigation menu"
        );

    });

});


/* =========================================
   CLOSE MOBILE MENU
   WHEN CLICKING OUTSIDE
========================================= */

document.addEventListener("click", (event) => {

    const clickedInsideMenu =
        mobileMenu.contains(event.target);

    const clickedToggle =
        menuToggle.contains(event.target);

    if (
        !clickedInsideMenu &&
        !clickedToggle &&
        mobileMenu.classList.contains("active")
    ) {

        mobileMenu.classList.remove("active");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

    }

});

/* =========================================
   SCROLL REVEAL ANIMATION
========================================= */

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("active");

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.15
        }
    );


revealElements.forEach((element) => {

    revealObserver.observe(element);

});

/* =========================================
   REDUCED MOTION
========================================= */

const prefersReducedMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

if (prefersReducedMotion) {

    document
        .querySelectorAll(".reveal")
        .forEach((element) => {

            element.classList.add("active");

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


    // Mouse
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


    // Touch
    comparisonSlider.addEventListener(
        "touchstart",
        (event) => {
            isDragging = true;

            updateComparison(
                event.touches[0].clientX
            );
        },
        { passive: true }
    );


    comparisonSlider.addEventListener(
        "touchmove",
        (event) => {
            if (!isDragging) return;

            updateComparison(
                event.touches[0].clientX
            );
        },
        { passive: true }
    );


    comparisonSlider.addEventListener(
        "touchend",
        () => {
            isDragging = false;
        }
    );

}

/* =========================================
   CONTACT FORM
========================================= */

const contactForm = document.getElementById("contact-form");

if (contactForm) {

    contactForm.addEventListener("submit", (event) => {

        event.preventDefault();

        const submitButton =
            contactForm.querySelector(".form-submit");

        const originalText = submitButton.innerHTML;

        submitButton.innerHTML = `
            Request Sent ✓
        `;

        submitButton.disabled = true;

        setTimeout(() => {

            contactForm.reset();

            submitButton.innerHTML = originalText;

            submitButton.disabled = false;

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