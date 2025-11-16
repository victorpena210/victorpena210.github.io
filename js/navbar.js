// js/navbar.js
fetch('/partials/navbar.html')   // <-- leading slash is the key
  .then(response => response.text())
  .then(html => {
    const target = document.getElementById('navbar');
    if (target) {
      target.innerHTML = html;
    }
  })
  .catch(err => {
    console.error('Error loading navbar:', err);
  });
