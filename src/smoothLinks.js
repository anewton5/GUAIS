const navLinks = document.querySelectorAll('nav ul a');
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        const targetPosition = target.offsetTop - window.innerHeight / 2 + target.offsetHeight / 2;
        window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
        });
    });
});