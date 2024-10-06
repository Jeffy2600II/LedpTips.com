function onSignUp(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId());
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail());

  // Redirect to account settings page for additional information
  window.location.href = 'account-settings.html';
}

document.getElementById('signup-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirm-password').value;

  if (password !== confirmPassword) {
    alert('Passwords do not match.');
    return;
  }

  // Check if the account already exists
  const db = new SQL.Database();
  const accountExists = db.exec(`SELECT * FROM users WHERE email = ?`, [email]);
  if (accountExists.length > 0) {
    alert('Account already exists. Please login.');
    window.location.href = 'Login.html';
    return;
  }

  // Generate a random user ID
  const userId = generateRandomUserId();
  const createdAt = new Date().toISOString();

  // Insert new user into the database
  db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY,
        username TEXT,
        email TEXT,
        password TEXT,
        created_at TEXT,
        status TEXT
    )`);

  db.run(`INSERT INTO users (id, username, email, password, created_at, status) VALUES (?, ?, ?, ?, ?, ?)`,
        [userId, name, email, password, createdAt, 'active']);

  // Automatically login after signup
  alert('Account created successfully. Logging you in...');
  window.location.href = 'index.html';
});

// Generate a random user ID
function generateRandomUserId() {
  return Math.floor(10000000 + Math.random() * 90000000).toString(); // 8 digits
}