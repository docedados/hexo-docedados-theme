document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('.header-nav');

  hamburger.addEventListener('click', () => {
    const isActive = hamburger.classList.toggle('is-active');
    nav.classList.toggle('is-active');
    hamburger.setAttribute('aria-expanded', isActive);
  });
});
