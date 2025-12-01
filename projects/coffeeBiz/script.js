// Simple state for the fake cart
const cart = [];

function formatPrice(num) {
  return "$" + num.toFixed(2);
}

// NAV + SMOOTH SCROLL
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const siteNav = document.getElementById("siteNav");
  const cartButton = document.getElementById("cartButton");
  const cartDrawer = document.getElementById("cartDrawer");
  const cartClose = document.getElementById("cartClose");
  const checkoutBtn = document.getElementById("checkoutBtn");
  const specialsBtn = document.getElementById("specialsBtn");
  const toast = document.getElementById("toast");
  const yearSpan = document.getElementById("year");

  yearSpan.textContent = new Date().getFullYear();

  // Mobile nav toggle
  if (menuToggle && siteNav) {
    menuToggle.addEventListener("click", () => {
      siteNav.classList.toggle("open");
    });

    // Close nav when clicking a link
    siteNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        siteNav.classList.remove("open");
      });
    });
  }

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const targetId = anchor.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const targetEl = document.querySelector(targetId);
      if (!targetEl) return;

      e.preventDefault();
      targetEl.scrollIntoView({ behavior: "smooth" });
    });
  });

  // MENU FILTERS
  const chips = document.querySelectorAll(".chip");
  const items = document.querySelectorAll(".menu-item");

  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      const filter = chip.getAttribute("data-filter");
      chips.forEach((c) => c.classList.remove("chip-active"));
      chip.classList.add("chip-active");

      items.forEach((item) => {
        const cat = item.getAttribute("data-category");
        if (filter === "all" || filter === cat) {
          item.style.display = "";
        } else {
          item.style.display = "none";
        }
      });
    });
  });

  // ADD TO CART
  document.querySelectorAll(".add-to-cart").forEach((btn) => {
    btn.addEventListener("click", () => {
      const name = btn.getAttribute("data-name");
      const price = parseFloat(btn.getAttribute("data-price") || "0");
      addToCart(name, price);
      showToast(`${name} added to cart`);
    });
  });

  // Cart drawer open/close
  if (cartButton && cartDrawer) {
    cartButton.addEventListener("click", () => {
      cartDrawer.classList.add("open");
      renderCart();
    });
  }

  if (cartClose && cartDrawer) {
    cartClose.addEventListener("click", () => {
      cartDrawer.classList.remove("open");
    });
  }

  // Fake checkout
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      if (!cart.length) {
        showToast("Your cart is empty.");
        return;
      }
      showToast("Thanks for your (fake) order! ☕");
    });
  }

  // Specials button
  if (specialsBtn) {
    specialsBtn.addEventListener("click", () => {
      showToast("Today’s special: Hazelnut Cold Brew – $5.25");
      const menuSection = document.getElementById("menu");
      if (menuSection) {
        menuSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  }

  // CONTACT FORM
  const contactForm = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");

  if (contactForm && formStatus) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      if (!name || !email || !message) {
        formStatus.textContent = "Please fill in all required fields.";
        formStatus.style.color = "#ff5c5c";
        return;
      }

      // Very basic fake submit
      formStatus.textContent = "Thanks for reaching out! We’ll reply soon.";
      formStatus.style.color = "#a0e3a2";

      contactForm.reset();
    });
  }

  // Toast helper
  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(showToast._timeout);
    showToast._timeout = setTimeout(() => {
      toast.classList.remove("show");
    }, 2300);
  }

  // Expose showToast for other functions if needed
  window.showToast = showToast;
});

// CART LOGIC

function addToCart(name, price) {
  const existing = cart.find((item) => item.name === name);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ name, price, qty: 1 });
  }
  updateCartSummary();
  renderCart();
}

function updateCartSummary() {
  const countSpan = document.getElementById("cartCount");
  if (!countSpan) return;

  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
  countSpan.textContent = totalQty;
}

function renderCart() {
  const list = document.getElementById("cartItems");
  const emptyMsg = document.getElementById("cartEmpty");
  const totalSpan = document.getElementById("cartTotal");

  if (!list || !emptyMsg || !totalSpan) return;

  list.innerHTML = "";

  if (!cart.length) {
    emptyMsg.style.display = "block";
    totalSpan.textContent = "$0.00";
    return;
  }

  emptyMsg.style.display = "none";

  let total = 0;

  cart.forEach((item) => {
    const li = document.createElement("li");
    li.className = "cart-item";

    const left = document.createElement("div");
    const right = document.createElement("div");

    const title = document.createElement("span");
    title.className = "cart-item-title";
    title.textContent = item.name;

    const meta = document.createElement("span");
    meta.className = "cart-item-meta";
    meta.textContent = `${item.qty} × ${formatPrice(item.price)}`;

    left.appendChild(title);
    left.appendChild(meta);

    const lineTotal = item.price * item.qty;
    total += lineTotal;

    right.textContent = formatPrice(lineTotal);

    li.appendChild(left);
    li.appendChild(right);

    list.appendChild(li);
  });

  totalSpan.textContent = formatPrice(total);
}
