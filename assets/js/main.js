/* Shared site interactions: mobile nav, active link, WeChat modal, copy-to-clipboard */

(function () {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  // Mobile nav toggle
  const navToggle = $("#navToggle");
  const navLinks = $("#navLinks");
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const isHidden = navLinks.getAttribute("aria-hidden") !== "false";
      navLinks.setAttribute("aria-hidden", isHidden ? "false" : "true");
      navToggle.setAttribute("aria-expanded", isHidden ? "true" : "false");
    });

    // Close nav on link click (mobile)
    $$(".nav-link", navLinks).forEach((a) => {
      a.addEventListener("click", () => {
        if (window.matchMedia("(min-width: 900px)").matches) return;
        navLinks.setAttribute("aria-hidden", "true");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Active nav link based on current file
  const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  $$(".nav-link").forEach((a) => {
    const href = (a.getAttribute("href") || "").toLowerCase();
    if (!href) return;
    if (href === path || (path === "" && href === "index.html")) {
      a.classList.add("is-active");
      a.setAttribute("aria-current", "page");
    }
  });

  // WeChat modal
  const modal = $("#wechatModal");
  const openBtns = $$("[data-open-wechat]");
  const closeBtn = $("#wechatModalClose");
  const backdrop = $("#wechatModalBackdrop");

  function openModal() {
    if (!modal) return;
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    // Focus close for accessibility
    if (closeBtn) closeBtn.focus();
  }
  function closeModal() {
    if (!modal) return;
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  openBtns.forEach((btn) => btn.addEventListener("click", (e) => {
    e.preventDefault();
    openModal();
  }));
  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (backdrop) backdrop.addEventListener("click", closeModal);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

  // Copy WeChat ID
  const copyBtn = $("#copyWechatBtn");
  const wechatIdEl = $("#wechatId");
  const copyStatus = $("#copyStatus");
  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Fallback
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "true");
      ta.style.position = "fixed";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(ta);
      return ok;
    }
  }

  if (copyBtn && wechatIdEl) {
    copyBtn.addEventListener("click", async () => {
      const id = (wechatIdEl.textContent || "").trim();
      if (!id) return;
      const ok = await copyText(id);
      if (copyStatus) {
        copyStatus.textContent = ok ? "已复制" : "复制失败，请手动复制";
        copyStatus.style.color = ok ? "#1e40af" : "#7f1d1d";
        setTimeout(() => {
          copyStatus.textContent = "";
          copyStatus.style.color = "";
        }, 1600);
      }
    });
  }
})();

