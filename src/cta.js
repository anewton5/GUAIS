document.getElementById('subscribe-form').addEventListener('submit', function(event) {
  event.preventDefault();
  var email = document.getElementById('email').value;

  fetch('/submit-email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email: email })
  })
  .then(response => response.json())
  .then(data => {
    if (data.message === 'Subscription successful!') {
      alert('Thanks for subscribing!');
    } else if (data.message === 'Email already subscribed') {
      alert('You have already subscribed with this email!');
    } else {
      alert('An error occurred. Please try again.');
    }
  })
  .catch(error => console.error('Error:', error));
});