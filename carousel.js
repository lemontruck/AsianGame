// Athlete portraits flow continuously; match cards advance in readable steps.
export const initHorizontalCarousel = (section, { viewportSelector, groupSelector, continuous = false }) => {
 if (!section) return () => {};
 const viewport = section.querySelector(viewportSelector);
 const group = section.querySelector(groupSelector);
 const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
 const listeners = [];
 let visible = false, disposed = false, dragging = false, dragged = false;
 let keyboardFocus = false, hovered = false;
 let startX = 0, startLeft = 0, lastTime = 0, remainder = 0;
 let resumeAt = 0, nextStepAt = 0, frame;
 const listen = (target, type, handler, options) => {
  target.addEventListener(type, handler, options);
  listeners.push(() => target.removeEventListener(type, handler, options));
 };
 const defer = () => {
  resumeAt = performance.now() + 3000;
  nextStepAt = resumeAt;
  remainder = 0;
 };
 const width = () => group.getBoundingClientRect().width;
 const stepSize = () => group.firstElementChild.getBoundingClientRect().width + (parseFloat(getComputedStyle(group).gap) || 0);
 const advance = direction => {
  const max = viewport.scrollWidth - viewport.clientWidth;
  if (continuous) viewport.scrollLeft = (viewport.scrollLeft + direction * stepSize() + width()) % width();
  else {
   const left = viewport.scrollLeft;
   const destination = direction > 0 ? (left >= max - 2 ? 0 : Math.min(max, left + stepSize())) : Math.max(0, left - stepSize());
   viewport.scrollTo({ left: destination, behavior: reducedMotion.matches ? 'instant' : 'smooth' });
  }
 };
 const observer = new IntersectionObserver(entries => {
  const wasVisible = visible;
  visible = entries[0].isIntersecting;
  if (visible && !wasVisible) {
   // Start portraits immediately on entry, without a hover or three-second delay.
   nextStepAt = performance.now() + 4500;
   lastTime = 0;
  }
 });
 observer.observe(viewport);
 const tick = now => {
  if (disposed) return;
  const delta = lastTime ? Math.min(now - lastTime, 64) : 0;
  lastTime = now;
  if (visible && !document.hidden && !reducedMotion.matches && !dragging && !keyboardFocus && !hovered && !document.querySelector('dialog[open]') && now >= resumeAt) {
   if (continuous) {
    remainder += delta * .032;
    const pixels = Math.floor(remainder);
    remainder -= pixels;
    if (pixels > 0) {
     viewport.scrollLeft += pixels;
     if (width() > 0 && viewport.scrollLeft >= width()) viewport.scrollLeft -= width();
    }
   } else if (now >= nextStepAt) {
    if (viewport.scrollWidth > viewport.clientWidth + 2) advance(1);
    nextStepAt = now + 4500;
   }
  }
  frame = requestAnimationFrame(tick);
 };
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
 listen(viewport, 'wheel', event => {
  if (event.deltaX !== 0 || event.shiftKey) defer();
 }, { passive: true });
 // Pause clickable match cards under the mouse so links do not move away.
 if (!continuous) {
  listen(viewport, 'pointerenter', event => { if (event.pointerType === 'mouse') hovered = true; });
  listen(viewport, 'pointerleave', () => { hovered = false; defer(); });
 }
 listen(viewport, 'keydown', event => {
  if (event.target !== viewport || !['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) return;
  keyboardFocus = true; defer(); event.preventDefault();
  if (event.key === 'Home') viewport.scrollLeft = 0;
  else if (event.key === 'End') viewport.scrollLeft = continuous ? Math.max(0, width() - viewport.clientWidth) : viewport.scrollWidth - viewport.clientWidth;
  else advance(event.key === 'ArrowRight' ? 1 : -1);
 });
 listen(viewport, 'focusin', event => { keyboardFocus = event.target.matches(':focus-visible'); });
 listen(viewport, 'focusout', event => {
  if (!viewport.contains(event.relatedTarget)) { keyboardFocus = false; defer(); }
 });
 listen(reducedMotion, 'change', defer);
 listen(viewport, 'carousel:resume', defer);
 frame = requestAnimationFrame(tick);
 return () => {
  disposed = true;
  cancelAnimationFrame(frame);
  observer.disconnect();
  listeners.forEach(remove => remove());
 };
};
