const projectsObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
    } else {
      entry.target.classList.remove('animate');
    }
  });
}, { threshold: 0.04 });

document.querySelectorAll('.bg-container1').forEach(el => {
  projectsObserver.observe(el);
});