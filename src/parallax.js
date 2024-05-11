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
var scrollHeight = 0
window.addEventListener('scroll', function() {
    var contentDivs = document.querySelectorAll('#content');
    var placeholder = document.getElementById('placeholder');
    var footer = document.getElementById('footer');

    contentDivs.forEach(function(contentDiv, index) {
        var rect = contentDiv.getBoundingClientRect();
        var footerRect = footer.getBoundingClientRect();
        var observer = new ResizeObserver(function() {
        var computedStyle = window.getComputedStyle(contentDiv);
        var paddingTop = parseInt(computedStyle.paddingTop);
        var paddingBottom = parseInt(computedStyle.paddingBottom);

        placeholder.style.height = `${contentDiv.offsetHeight + paddingTop + paddingBottom}px`;
        });
        observer.observe(contentDiv);
        
        if (rect.top <= 55 && !contentDiv.classList.contains('fixed')) {
        contentDiv.classList.add('fixed');
        placeholder.classList.add('placeholder');
        contentDiv.style.paddingBottom = `90px`;
        scrollHeight = window.scrollY
        } else if (window.scrollY < scrollHeight && contentDiv.classList.contains('fixed')) {
        contentDiv.classList.remove('fixed');
        placeholder.classList.remove('placeholder');
        contentDiv.style.paddingBottom = '0';
        }
    });
});