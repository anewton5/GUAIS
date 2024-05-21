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
  .then(data => console.log(data.message))
  .catch(error => console.error('Error:', error));
});