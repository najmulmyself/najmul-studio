"use client";

import { useEffect } from "react";

// Fades in every `.reveal` element the first time it scrolls into view.
// The hidden starting state only applies once <html> has the `js` class,
// so the page is fully visible without JavaScript.
export function RevealOnScroll() {
  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>(".reveal");
    if (!("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08 },
    );
    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return null;
}
