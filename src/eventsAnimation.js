const eventsObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        eventsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.02 });
  
  const eventsContainer = document.querySelector('.bg-container');
  eventsObserver.observe(eventsContainer);