// plugins/animate.client.js
export default defineNuxtPlugin(() => {
  if (process.client) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const el = entry.target;
        const animation = el.dataset.animate || "fadeInUp";
        const delay = parseInt(el.dataset.delay || 0);
        const duration = parseFloat(el.dataset.duration || 0.8);

        // set durasi via CSS custom property
        el.style.setProperty("--duration", duration + "s");

        if (entry.isIntersecting) {
          setTimeout(() => {
            el.classList.add("animate", animation);
          }, delay);
        } else {
          // hapus class biar bisa animasi ulang pas masuk lagi
          el.classList.remove("animate", animation);
        }
      });
    }, { threshold: 0.2 });

    document.querySelectorAll("[data-animate]").forEach((el) =>
      observer.observe(el)
    );
  }
});
