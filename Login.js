function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId());
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail());
  // TODO: Send ID token to your backend for verification and create a session.
  // After verification, redirect to the homepage.
  window.location.href = 'index.html';
}

document.getElementById('login-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Mock login function - replace with actual login logic
  function getLoggedInUser(email, password) {
    const db = new SQL.Database();
    const stmt = db.prepare("SELECT * FROM users WHERE email = ? AND password = ?");
    stmt.bind([email, password]);
    if (stmt.step()) {
      return stmt.getAsObject();
    }
    return null;
  }

  const user = getLoggedInUser(email, password);

  if (!user) {
    alert('No account found with this email and password. Please sign up.');
    return;
  }

  // After successful login, redirect to the homepage.
  window.location.href = 'index.html';
});