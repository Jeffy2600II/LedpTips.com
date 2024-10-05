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
    // TODO: Add your form submission logic here
    // After successful login, redirect to the homepage.
    window.location.href = 'index.html';
});