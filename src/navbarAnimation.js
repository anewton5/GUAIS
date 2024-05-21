window.addEventListener('scroll', function() {
    const navbar = document.querySelector('#navbar');
    const navLinks = document.querySelectorAll('#nav-link');
    const content = document.querySelector('#divider2');
    const contentPosition = content.getBoundingClientRect().bottom;
    var contentDiv = document.querySelector('#content');

    if (contentPosition <= 125 || contentDiv.classList.contains('fixed')) {
        navbar.style.backgroundColor = 'var(--clr-nav)';
        navLinks.forEach(link => {
            link.classList.add('hover-dark');
            link.classList.remove('hover-light');
        });
        
    } else {
        navbar.style.backgroundColor = 'transparent';
        navLinks.forEach(link => {
            link.classList.add('hover-light');
            link.classList.remove('hover-dark');
        });
    }
});