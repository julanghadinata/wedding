// plugins/animate.client.js
export default defineNuxtPlugin(() => {
  if (process.client) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const el = entry.target;
        const animation = el.dataset.animate || "fadeInUp";
        const once = el.dataset.once !== "false"; // default true
        const delay = parseInt(el.dataset.delay || 0);
        const duration = parseFloat(el.dataset.duration || 0.8);

        // set durasi CSS custom property
        el.style.setProperty("--duration", duration + "s");

        if (entry.isIntersecting) {
          setTimeout(() => {
            // reset animasi biar bisa main ulang
            el.classList.remove("animate", animation);
            void el.offsetWidth; // reflow hack
            el.classList.add("animate", animation);
          }, delay);

          if (once) {
            observer.unobserve(el);
          }
        } else {
          if (once === false) {
            // hapus class biar bisa animasi lagi pas masuk viewport
            el.classList.remove("animate", animation);
          }
        }
      });
    }, { threshold: 0.2 });

    // observe semua elemen dengan data-animate
    document.querySelectorAll("[data-animate]").forEach((el) => observer.observe(el));
  }
});
