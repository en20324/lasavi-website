function setupMenuModal() {
  const modal = document.getElementById("menu-modal");
  if (!modal) return;
  const title = document.getElementById("modal-title");
  const desc = document.getElementById("modal-desc");
  const price = document.getElementById("modal-price");
  document.querySelectorAll(".menu-card").forEach((card) => {
    card.addEventListener("click", () => {
      title.textContent = card.dataset.title || "";
      desc.textContent = card.dataset.desc || "";
      price.textContent = card.dataset.price || "";
      modal.classList.add("open");
      document.body.style.overflow = "hidden";
    });
  });
  function close() {
    modal.classList.remove("open");
    document.body.style.overflow = "";
  }
  const closeBtn = document.getElementById("menu-close");
  const backdrop = document.getElementById("menu-backdrop");
  if (closeBtn) closeBtn.addEventListener("click", close);
  if (backdrop) backdrop.addEventListener("click", close);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });
}

function setupShareButton() {
  const btn = document.getElementById("share-btn");
  if (!btn) return;
  btn.addEventListener("click", async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: document.title, url });
      } else if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(url);
        const old = btn.textContent;
        btn.textContent = "✓";
        window.setTimeout(() => (btn.textContent = old), 1200);
      }
    } catch (_) {}
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("menu-toggle");
  const mobileNav = document.getElementById("mobile-nav");
  if (hamburger && mobileNav) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      mobileNav.classList.toggle("active");
    });
    mobileNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        mobileNav.classList.remove("active");
      });
    });
  }
  setupMenuModal();
  setupShareButton();
});
