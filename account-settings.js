document.getElementById('settings-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const username = document.getElementById('username').value;

  // TODO: Add logic to save the username and other settings to the database

  // After saving the settings, redirect to the homepage
  window.location.href = 'index.html';
});