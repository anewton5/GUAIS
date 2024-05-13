document.getElementById('subscribe-form').addEventListener('submit', function(event) {
    event.preventDefault();
    var email = document.getElementById('email').value;
    console.log('Subscribed with email: ' + email);
    // Here you can add the code to send the email to your server
  });