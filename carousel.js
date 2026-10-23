// Run animation frames only while the athlete strip can actually move.
export const initAthleteCarousel = section => {
 if (!section) return () => {};
 const viewport = section.querySelector('.athlete-viewport');
 const group = section.querySelector('.athlete-carousel-list');
 const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
 const listeners = [];
 let visible = false, disposed = false, dragging = false, dragged = false;
 let keyboardFocus = false, modalOpen = false;
 let startX = 0, startLeft = 0, lastTime = 0, remainder = 0;
 let resumeAt = 0, loopWidth = 0, stepWidth = 0;
 let frame = null, wakeTimer = null;
 const listen = (target, type, handler, options) => {
  target.addEventListener(type, handler, options);
  listeners.push(() => target.removeEventListener(type, handler, options));
 };
 const stop = () => {
  if (frame !== null) cancelAnimationFrame(frame);
  if (wakeTimer !== null) clearTimeout(wakeTimer);
  frame = null; wakeTimer = null; lastTime = 0;
 };
 const canMove = () => visible && !document.hidden && !reducedMotion.matches && !dragging && !keyboardFocus && !modalOpen && loopWidth > 0;
 const reconcile = () => {
  if (disposed) return;
  if (!canMove()) { stop(); return; }
  const delay = resumeAt - performance.now();
  if (delay > 0) {
   stop();
   wakeTimer = setTimeout(() => { wakeTimer = null; reconcile(); }, delay);
  } else if (frame === null) {
   if (wakeTimer !== null) clearTimeout(wakeTimer);
   wakeTimer = null;
   frame = requestAnimationFrame(tick);
  }
 };
 const defer = () => { resumeAt = performance.now() + 3000; remainder = 0; reconcile(); };
 const tick = now => {
  frame = null;
  if (disposed) return;
  if (!canMove() || now < resumeAt) { reconcile(); return; }
  const delta = lastTime ? Math.min(now - lastTime, 64) : 0;
  lastTime = now;
  remainder += delta * .032;
  const pixels = Math.floor(remainder);
  remainder -= pixels;
  if (pixels > 0) {
   viewport.scrollLeft += pixels;
   if (viewport.scrollLeft >= loopWidth) viewport.scrollLeft -= loopWidth;
  }
  frame = requestAnimationFrame(tick);
 };
 const measure = () => {
  loopWidth = group.getBoundingClientRect().width;
  stepWidth = group.firstElementChild.getBoundingClientRect().width + (parseFloat(getComputedStyle(group).gap) || 0);
  if (loopWidth > 0 && viewport.scrollLeft >= loopWidth) viewport.scrollLeft %= loopWidth;
  reconcile();
 };
 const resizeObserver = new ResizeObserver(measure);
 resizeObserver.observe(viewport); resizeObserver.observe(group);
 const intersectionObserver = new IntersectionObserver(entries => { visible = entries[0].isIntersecting; reconcile(); });
 intersectionObserver.observe(viewport);
 const modalObserver = new MutationObserver(() => {
  const wasOpen = modalOpen;
  modalOpen = Boolean(document.querySelector('dialog[open]'));
  if (wasOpen && !modalOpen) defer();
  else reconcile();
 });
 modalObserver.observe(document.querySelector('#app'), { subtree: true, attributes: true, attributeFilter: ['open'] });
 listen(document, 'visibilitychange', reconcile);
 listen(viewport, 'pointerdown', event => {
  if (event.button !== 0) return;
  dragging = true; dragged = false; keyboardFocus = false;
  startX = event.clientX; startLeft = viewport.scrollLeft;
  defer();
  if (event.pointerType === 'mouse' && !event.target.closest('a,button')) event.preventDefault();
 });
 listen(viewport, 'pointermove', event => {
  if (!dragging || event.pointerType !== 'mouse') return;
  if (Math.abs(event.clientX - startX) > 6) {
   dragged = true;
   viewport.setPointerCapture(event.pointerId);
   viewport.classList.add('is-dragging');
   viewport.scrollLeft = startLeft - (event.clientX - startX);
   defer();
  }
 });
 const endPointer = event => {
  if (!dragging) return;
  dragging = false;
  viewport.classList.remove('is-dragging');
  if (viewport.hasPointerCapture(event.pointerId)) viewport.releasePointerCapture(event.pointerId);
  defer();
 };
 listen(window, 'pointerup', endPointer);
 listen(viewport, 'pointercancel', endPointer);
 listen(viewport, 'click', event => {
  if (dragged) { event.preventDefault(); event.stopPropagation(); dragged = false; }
 }, true);
 listen(viewport, 'wheel', event => { if (event.deltaX !== 0 || event.shiftKey) defer(); }, { passive: true });
 listen(viewport, 'keydown', event => {
  if (event.target !== viewport || !['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) return;
  keyboardFocus = true; defer(); event.preventDefault();
  if (event.key === 'Home') viewport.scrollLeft = 0;
  else if (event.key === 'End') viewport.scrollLeft = Math.max(0, loopWidth - viewport.clientWidth);
  else if (loopWidth > 0) viewport.scrollLeft = (viewport.scrollLeft + (event.key === 'ArrowRight' ? stepWidth : -stepWidth) + loopWidth) % loopWidth;
 });
 listen(viewport, 'focusin', event => { keyboardFocus = event.target.matches(':focus-visible'); reconcile(); });
 listen(viewport, 'focusout', event => { if (!viewport.contains(event.relatedTarget)) { keyboardFocus = false; defer(); } });
 listen(reducedMotion, 'change', reconcile);
 listen(viewport, 'carousel:resume', defer);
 return () => {
  disposed = true; stop();
  intersectionObserver.disconnect(); resizeObserver.disconnect(); modalObserver.disconnect();
  listeners.forEach(remove => remove());
 };
};
