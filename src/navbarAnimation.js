window.addEventListener('scroll', function() {
    const navbar = document.querySelector('#navbar');
    const content = document.querySelector('#divider2');
    const contentPosition = content.getBoundingClientRect().bottom;
    var contentDiv = document.querySelector('#content');

    if (contentPosition <= 125 || contentDiv.classList.contains('fixed')) {
        navbar.style.backgroundColor = 'var(--clr-nav)';
        
        
    } else {
        navbar.style.backgroundColor = 'transparent';
    }
});