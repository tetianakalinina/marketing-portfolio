"use strict";

function $(id) { return document.getElementById(id); }

/* Footer year */
(function setYear(){
  const y = $("year");
  if (y) y.textContent = String(new Date().getFullYear());
})();

/* Cookie consent */
const CONSENT_KEY = "cookieConsent"; // accepted | declined

(function cookieBanner(){
  const banner = $("cookieBanner");
  const accept = $("cookieAccept");
  const decline = $("cookieDecline");

  if (!banner) return;

  const consent = localStorage.getItem(CONSENT_KEY);
  if (consent !== "accepted" && consent !== "declined") {
    banner.style.display = "block";
  }

  if (accept) {
    accept.addEventListener("click", () => {
      localStorage.setItem(CONSENT_KEY, "accepted");
      banner.style.display = "none";
    });
  }

  if (decline) {
    decline.addEventListener("click", () => {
      localStorage.setItem(CONSENT_KEY, "declined");
      banner.style.display = "none";
    });
  }
})();

/* Work filtering */
(function workFilters(){
  const buttons = document.querySelectorAll(".filter-btn");
  const items = document.querySelectorAll(".work-item");
  if (!buttons.length || !items.length) return;

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const filter = btn.dataset.filter;

      buttons.forEach(b => b.classList.remove("is-active"));
      btn.classList.add("is-active");

      items.forEach(item => {
        const cat = item.dataset.category;
        const show = (filter === "all") || (cat === filter);
        item.style.display = show ? "" : "none";
      });
    });
  });
})();

/* Lightbox (click work card -> modal) */
(function lightbox(){
  const modalEl = $("lightboxModal");
  if (!modalEl) return;

  const titleEl = $("lightboxTitle");
  const descEl = $("lightboxDesc");
  const imgEl = $("lightboxImg");

  const modal = new bootstrap.Modal(modalEl);

  document.querySelectorAll(".work-card").forEach(card => {
    card.addEventListener("click", () => {
      const title = card.dataset.title || "Work example";
      const desc = card.dataset.desc || "";
      const img = card.dataset.img || "";

      if (titleEl) titleEl.textContent = title;
      if (descEl) descEl.textContent = desc;
      if (imgEl) imgEl.src = img;

      modal.show();
    });
  });
})();

/* Contact form validation */
(function contactForm(){
  const form = $("contactForm");
  const status = $("formStatus");
  if (!form || !status) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const inputs = form.querySelectorAll("input, textarea");
    let valid = true;

    inputs.forEach(el => {
      if (!el.checkValidity()) {
        el.classList.add("is-invalid");
        valid = false;
      } else {
        el.classList.remove("is-invalid");
      }
    });

    if (!valid) {
      status.textContent = "Please fix the highlighted fields and try again.";
      return;
    }

    status.textContent = "Thanks! I’ll get back to you soon.";
    form.reset();
  });
})();
