const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
      }
    });
  }, { threshold: 0.1 });
  
  document.querySelector('#content').querySelectorAll('.text-section, .image-section').forEach(el => {
    observer.observe(el);
  });