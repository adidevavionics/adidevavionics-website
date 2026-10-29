/* ==========================================================
   Adidev Avionics Private Limited: main script
   Handles: mobile menu, scroll fade-in, footer year
   ========================================================== */

(function () {
  "use strict";

  // Tell the stylesheet that JavaScript is running,
  // so fade-in effects only apply when they can actually work.
  document.documentElement.classList.add("js");

  /* ---------- Mobile menu ---------- */
  var toggle = document.querySelector(".menu-toggle");
  var nav = document.querySelector(".primary-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      toggle.textContent = isOpen ? "Close" : "Menu";
    });

    // Close the menu when the Escape key is pressed
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && nav.classList.contains("open")) {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.textContent = "Menu";
        toggle.focus();
      }
    });

    // Close the menu if the window is resized to desktop width
    window.addEventListener("resize", function () {
      if (window.innerWidth > 820 && nav.classList.contains("open")) {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.textContent = "Menu";
      }
    });
  }

  /* ---------- Fade-in on scroll ---------- */
  var revealItems = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealItems.forEach(function (item) { observer.observe(item); });
  } else {
    // Very old browsers: just show everything
    revealItems.forEach(function (item) { item.classList.add("visible"); });
  }

  /* ---------- Footer year ---------- */
  var yearSpot = document.getElementById("year");
  if (yearSpot) {
    yearSpot.textContent = new Date().getFullYear();
  }
})();