// Mobile nav toggle
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });

  // Close menu when a link is clicked (on mobile)
  navLinks.addEventListener("click", (e) => {
    if (e.target.tagName.toLowerCase() === "a") {
      navLinks.classList.remove("open");
    }
  });
}

// Smooth scroll for in-page links
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    const targetId = link.getAttribute("href").slice(1);
    const target = document.getElementById(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// FAQ accordion
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
  const button = item.querySelector(".faq-question");
  button.addEventListener("click", () => {
    const isOpen = item.classList.contains("open");

    // Close other items
    faqItems.forEach((other) => {
      other.classList.remove("open");
    });

    // Toggle current
    if (!isOpen) {
      item.classList.add("open");
    }
  });
});

// Quote form handling (basic front-end simulation)
const quoteForm = document.getElementById("quote-form");
const quoteStatus = document.getElementById("quote-status");

if (quoteForm && quoteStatus) {
  quoteForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = quoteForm.querySelector("#name").value.trim();
    const phone = quoteForm.querySelector("#phone").value.trim();
    const email = quoteForm.querySelector("#email").value.trim();
    const serviceType = quoteForm.querySelector("#service-type").value;

    if (!name || !phone || !email || !serviceType) {
      quoteStatus.textContent = "Please fill out all required fields marked with *.";
      quoteStatus.style.color = "#b91c1c";
      return;
    }

    // In a real site, you'd send the form data to your backend here with fetch()
    // For now, just show a success message.
    quoteStatus.textContent =
      "Thank you! Your request has been received. We’ll contact you soon to schedule your estimate.";
    quoteStatus.style.color = "#065f46";

    quoteForm.reset();
  });
}

// Set current year in footer
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}
