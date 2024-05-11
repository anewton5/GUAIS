window.addEventListener('beforeunload', function() {
    window.location.reload(true);
  });
  document.addEventListener('DOMContentLoaded', function() {
    const loadingScreen = document.getElementById('loading-screen');
    const enterButton = document.getElementById('enter-button');
    const loadingText = document.getElementById('loading-text');
    const spinner = document.querySelector('.spinner');
    const body = document.body;

    body.style.overflow = 'hidden';
    setTimeout(function() {
      enterButton.disabled = false;
      loadingText.classList.add('load-complete');
      if (spinner) {
        spinner.style.opacity = '0';
        spinner.outerHTML = '<h2>GUAIS</h2>';
      }
    }, 3500);
  
    enterButton.addEventListener('click', function() {
      loadingScreen.style.opacity = '0';
      setTimeout(function() {
        loadingScreen.style.display = 'none';
        body.style.overflow = 'auto';
      }, 1000);
    });
    window.onbeforeunload = function() {
      document.body.style.overflow = 'auto';
    };
});