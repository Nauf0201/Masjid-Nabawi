document.addEventListener("DOMContentLoaded", () => {
  // === Animasi muncul saat scroll ===
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      } else {
        entry.target.classList.remove("show");
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll(".hilang").forEach((el) => observer.observe(el));

  // === Efek 3D tiap kartu ===
  const cards = document.querySelectorAll(".card");

  cards.forEach((card) => {
    const shine = card.querySelector(".shine");
    const layers = card.querySelectorAll(".layer > *");

    function handleMove(e) {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const rotateY = (x - 0.5) * 30;
      const rotateX = (0.5 - y) * 25;

      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      shine.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(255,255,255,0.25), transparent 50%)`;

      layers.forEach((el) => {
        const depth = parseFloat(getComputedStyle(el).getPropertyValue("--z")) || 0;
        el.style.transform = `translateZ(${depth}px) translateX(${(x - 0.5) * depth * 0.3}px) translateY(${(y - 0.5) * depth * -0.3}px)`;
      });
    }

    function handleLeave() {
      card.style.transform = "";
      shine.style.background = "";
      layers.forEach((el) => (el.style.transform = ""));
    }

    card.addEventListener("mousemove", handleMove);
    card.addEventListener("mouseleave", handleLeave);
  });
});