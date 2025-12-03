// Booking URL placeholder – change this to your real booking link
const BOOKING_URL = "https://your-booking-link.com";

// Attach booking behavior to all .book-btn buttons
document.querySelectorAll(".book-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    window.open(BOOKING_URL, "_blank");
  });
});

// Mobile nav toggle
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("is-open");
  });

  // Close menu when clicking a link
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("is-open");
    });
  });
}

// Smooth scroll for any element with data-scroll
document.querySelectorAll("[data-scroll]").forEach((el) => {
  el.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.querySelector(el.getAttribute("data-scroll"));
    if (target) {
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  });
});

// Set current year in footer
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}
