"use strict";

function $(id) { return document.getElementById(id); }

const CONSENT_KEY = "cookieConsent"; 

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
