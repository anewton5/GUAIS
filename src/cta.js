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
    var messageDiv = document.getElementById('message');
    if (!messageDiv) {
      messageDiv = document.createElement('div');
      messageDiv.id = 'message';
      document.getElementById('subscribe-form').insertBefore(messageDiv, document.getElementById('input-section'));
    }

    if (data.message === 'Subscription successful!') {
      messageDiv.textContent = 'Thanks for subscribing!';
    } else if (data.message === 'Email already subscribed') {
      messageDiv.textContent = 'You have already subscribed with this email!';
    } else {
      messageDiv.textContent = 'An error occurred. Please try again.';
    }
  })
  .catch(error => console.error('Error:', error));
});