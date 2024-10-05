// login.js
function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  // TODO: Send ID token to your backend for verification and create a session.
}

document.getElementById('login-form').addEventListener('submit', function(e) {
  e.preventDefault();
  // TODO: Add your form submission logic here
});