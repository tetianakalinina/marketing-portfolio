"use strict";

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

const banner = document.getElementById("cookieBanner");
const accept = document.getElementById("cookieAccept");
const decline = document.getElementById("cookieDecline");

if (banner && !localStorage.getItem("cookieConsent")) {
  banner.style.display = "block";
}

if (accept) {
  accept.onclick = () => {
    localStorage.setItem("cookieConsent", "accepted");
    banner.style.display = "none";
  };
}

if (decline) {
  decline.onclick = () => {
    localStorage.setItem("cookieConsent", "declined");
    banner.style.display = "none";
  };
}
