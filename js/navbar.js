// js/navbar.js
fetch('partials/navbar.html')
  .then(response => response.text())
  .then(html => {
    document.getElementById('navbar').innerHTML = html;
  })
  .catch(err => {
    console.error('Error loading navbar:', err);
  });
