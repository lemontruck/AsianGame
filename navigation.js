export const initMainNavigation = isBlog => {
 if (isBlog) return () => {};
 const header = document.querySelector('.site-header');
 const links = [...header.querySelectorAll('[data-nav]')];
 const sections = ['matches', 'guide', 'athletes'].map(id => ({ id, element: document.getElementById(id) }));
 let frame = null;
 const update = () => {
  frame = null;
  const line = header.getBoundingClientRect().height + 36;
  const current = sections.find(({ element }) => {
   const bounds = element.getBoundingClientRect();
   return bounds.top <= line && bounds.bottom > line;
  })?.id || 'home';
  links.forEach(link => {
   if (link.dataset.nav === current) link.setAttribute('aria-current', current === 'home' ? 'page' : 'location');
   else link.removeAttribute('aria-current');
  });
 };
 const schedule = () => { if (frame === null) frame = requestAnimationFrame(update); };
 window.addEventListener('scroll', schedule, { passive: true });
 window.addEventListener('resize', schedule);
 update();
 return () => {
  if (frame !== null) cancelAnimationFrame(frame);
  window.removeEventListener('scroll', schedule);
  window.removeEventListener('resize', schedule);
 };
};
