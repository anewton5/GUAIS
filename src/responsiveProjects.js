function disableAnimations() {
  const cardArticleElements = document.querySelectorAll('.card-article');
  const cardDataElements = document.querySelectorAll('.card-data');

  if (window.innerWidth <= 989) {
    cardArticleElements.forEach(element => {
      element.classList.add('no-animation');
    });
    cardDataElements.forEach(element => {
      element.classList.add('no-animation');
    });
  } else {
    cardArticleElements.forEach(element => {
      element.classList.remove('no-animation');
    });
    cardDataElements.forEach(element => {
      element.classList.remove('no-animation');
    });
  }
}

window.addEventListener('resize', disableAnimations);
window.addEventListener('load', disableAnimations);