const nav = document.querySelector(".nav");

function updateNav() {
  nav.classList.toggle("is-scrolled", window.scrollY > 20);
}

window.addEventListener("scroll", updateNav);
updateNav();

// Tell CSS that JavaScript is running
document.documentElement.classList.add("js");

const revealEls = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);   // animate once, then stop watching
    }
  });
}, { threshold: 0.12 });                  // fire when 12% of the element is visible

revealEls.forEach((el) => observer.observe(el));

// ---------- Filter chips ----------
const chips = document.querySelectorAll(".chip");
const cards = document.querySelectorAll(".card");

chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    const filter = chip.dataset.filter;

    chips.forEach((c) => {
      const active = c === chip;
      c.classList.toggle("is-active", active);
      c.setAttribute("aria-pressed", String(active));
    });

    cards.forEach((card) => {
      const categories = card.dataset.category.split(" ");
      card.hidden = !(filter === "all" || categories.includes(filter));
    });
  });
});

// ---------- Project dialog ----------
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
const modalTitle = document.getElementById("modal-title");
const modalDesc = document.getElementById("modal-desc");
const modalTools = document.getElementById("modal-tools");

document.querySelectorAll(".card__btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const img = btn.querySelector("img");
    modalImg.src = img.src;
    modalImg.alt = img.alt;
    modalTitle.textContent = btn.dataset.title;
    modalDesc.textContent = btn.dataset.desc;
    modalTools.textContent = btn.dataset.tools;
    modal.showModal();
  });
});

// clicking the dark backdrop closes it
modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.close();
});