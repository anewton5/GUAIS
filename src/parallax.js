window.addEventListener('scroll', function() {
    const parallaxSection = document.querySelector('.parallax');
    const layer1 = document.querySelector('.layer1');
    const layer2 = document.querySelector('.layer2');
    const layer3 = document.querySelector('.layer3');
  
    const parallaxSectionTop = parallaxSection.offsetTop;
    const parallaxSectionHeight = parallaxSection.offsetHeight;
  
    var scrollAmount = window.scrollY;
  
    if (scrollAmount >= parallaxSectionTop && scrollAmount <= parallaxSectionTop + parallaxSectionHeight) {
      const localScrollAmount = scrollAmount - parallaxSectionTop;
  
      layer1.style.transform = `translate3d(0, ${localScrollAmount * 0.5}px, 0)`;
      layer2.style.transform = `translate3d(0, ${localScrollAmount * 0.3}px, 0)`;
      
      // Add an offset to the local scroll amount for layer 3
      const layer3Offset = 100; // Adjust this value as needed
      if (localScrollAmount > layer3Offset) {
        layer3.style.transform = `translate3d(0, ${(localScrollAmount - layer3Offset) * 0.1}px, 0)`;
      } else {
        layer3.style.transform = 'translate3d(0, 0, 0)';
      }
    } else {
      layer1.style.transform = 'translate3d(0, 0, 0)';
      layer2.style.transform = 'translate3d(0, 0, 0)';
      layer3.style.transform = 'translate3d(0, 0, 0)';
    }
});