function onSignUp(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId());
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail());

  // Redirect to account settings page
  window.location.href = 'account-settings.html';
}

document.getElementById('signup-form').addEventListener('submit', function(e) {
  e.preventDefault();
  // TODO: Add your form submission logic here

  // Generate random user ID
  function generateRandomUserId() {
    return Math.floor(10000000 + Math.random() * 90000000).toString(); // 8 digits
  }

  // After successful signup, set user ID and redirect to homepage
  const userId = generateRandomUserId();
  console.log('Generated User ID: ' + userId);

  // Redirect to homepage after setting user ID
  window.location.href = 'index.html';
});