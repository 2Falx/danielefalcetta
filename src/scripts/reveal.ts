/**
 * Time-based reveals that work in every browser (the scroll-driven ones in
 * global.css need animation-timeline). Any element with `data-reveal` gets
 * `data-reveal="in"` the first time it scrolls into view; component CSS
 * decides what the pending state looks like, always scoped to `:root.js` and
 * to `prefers-reduced-motion: no-preference`. Observed targets are marked
 * "pending"; a CSS fail-safe shows content still marked "" (script never ran)
 * after 3s. With reduced motion everything is marked "in" at once.
 */
const targets = document.querySelectorAll<HTMLElement>('[data-reveal]');

if (targets.length) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reduce.matches || !('IntersectionObserver' in window)) {
    targets.forEach((el) => (el.dataset.reveal = 'in'));
  } else {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.reveal = 'in';
          io.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -12% 0px' },
    );
    targets.forEach((el) => {
      // "pending" tells the CSS fail-safe that the script is running.
      if (el.dataset.reveal !== 'in') el.dataset.reveal = 'pending';
      io.observe(el);
    });
  }
}
