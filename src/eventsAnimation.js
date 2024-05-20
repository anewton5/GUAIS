const eventsObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
    } else {
      entry.target.classList.remove('animate');
    }
  });
}, { threshold: 0.05 });

document.querySelectorAll('.bg-container').forEach(el => {
  eventsObserver.observe(el);
});