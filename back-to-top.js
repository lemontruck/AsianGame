export const initBackToTop = () => {
 const button = document.querySelector('.back-to-top');
 let frame = null;
 const update = () => {
  frame = null;
  button.hidden = window.scrollY < 600 || Boolean(document.querySelector('dialog[open]'));
 };
 const schedule = () => { if (frame === null) frame = requestAnimationFrame(update); };
 const goToTop = () => {
  document.querySelector('.header .logo').focus({ preventScroll: true });
  window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
 };
 const observer = new MutationObserver(schedule);
 observer.observe(document.querySelector('#app'), { subtree: true, attributes: true, attributeFilter: ['open'] });
 window.addEventListener('scroll', schedule, { passive: true });
 button.addEventListener('click', goToTop);
 update();
 return () => {
  if (frame !== null) cancelAnimationFrame(frame);
  window.removeEventListener('scroll', schedule);
  button.removeEventListener('click', goToTop);
  observer.disconnect();
 };
};
