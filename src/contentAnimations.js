const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
    } else {
      entry.target.classList.remove('animate');
    }
  });
}, { threshold: 0.05 });

document.querySelectorAll('.text-section, .image-section').forEach(el => {
  observer.observe(el);
});

const scrollers = document.querySelectorAll('.scroller');
if(!window.matchMedia('(prefers-reduced-motion:reduced)').matches) {
  addAnimation();
}

function addAnimation() {
  scrollers.forEach(scroller => {
    scroller.setAttribute('data-animated', true);

    const scrollerInner = scroller.querySelector('.scroller__inner');
    const scrollerContent = Array.from(scrollerInner.children);

    scrollerContent.forEach((item) => {
      const duplicatedItem =  item.cloneNode(true);
      duplicatedItem.setAttribute("aria-hidden", true);
      scrollerInner.appendChild(duplicatedItem);
    });
  });
}