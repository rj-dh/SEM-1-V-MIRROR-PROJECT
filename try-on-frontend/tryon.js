/* ================= AUTH CHECK ================= */
const user = localStorage.getItem("vmirrorUser");
if (!user) {
  window.location.href = "../login-frontend/login.html";
}

/* SHOW USERNAME */
const usernameDisplay = document.getElementById("usernameDisplay");
const menuUsername = document.getElementById("menuUsername");

if (usernameDisplay && menuUsername) {
  usernameDisplay.innerText = user;
  menuUsername.innerText = user;
}

/* ================= ACCOUNT DROPDOWN ================= */
const accountBtn = document.getElementById("accountBtn");
const accountMenu = document.getElementById("accountMenu");

if (accountBtn && accountMenu) {
  accountBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    accountMenu.classList.toggle("show");
  });

  document.addEventListener("click", () => {
    accountMenu.classList.remove("show");
  });
}

/* ================= LOGOUT ================= */
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("vmirrorUser");
    window.location.href = "../login-frontend/login.html";
  });
}

/* ================= ABOUT NAVIGATION (FIXED ✅) ================= */
const aboutBtn = document.getElementById("aboutBtn");
if (aboutBtn) {
  aboutBtn.addEventListener("click", () => {
    window.location.href = "about.html"; // ✅ OPEN ABOUT PAGE
  });
}

/* ================= UI LOGIC ================= */

/* HEADER HIDE */
let lastScroll = window.scrollY;
const header = document.querySelector(".glass-header");

window.addEventListener("scroll", () => {
  const current = window.scrollY;
  current > lastScroll && current > 120
    ? header.classList.add("hide")
    : header.classList.remove("hide");
  lastScroll = current;
});

/* PARALLAX HERO */
const hero = document.getElementById("heroSection");
window.addEventListener("scroll", () => {
  hero.style.backgroundPositionY = `${window.scrollY * 0.35}px`;
});

/* AUTO SCROLL */
const startBtn = document.getElementById("startTryOnBtn");
if (startBtn) {
  startBtn.addEventListener("click", () => {
    document
      .getElementById("tryonSection")
      .scrollIntoView({ behavior: "smooth" });
  });
}

/* FADE IN TRY-ON */
const fadeSection = document.querySelector(".fade-section");
if (fadeSection) {
  new IntersectionObserver(
    ([entry]) =>
      entry.isIntersecting
        ? fadeSection.classList.add("visible")
        : fadeSection.classList.remove("visible"),
    { threshold: 0.3 }
  ).observe(fadeSection);
}

/* IMAGE UPLOAD */
const uploadInput = document.getElementById("imageUpload");
const previewImage = document.getElementById("previewImage");
const garment = document.getElementById("garmentOverlay");

if (uploadInput) {
  uploadInput.addEventListener("change", () => {
    const file = uploadInput.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      previewImage.src = reader.result;
      previewImage.style.display = "block";
    };
    reader.readAsDataURL(file);
  });
}

/* GARMENT TOGGLE */
const toggleGarment = document.getElementById("toggleGarment");
if (toggleGarment) {
  toggleGarment.addEventListener("click", () => {
    garment.style.display =
      garment.style.display === "block" ? "none" : "block";
  });
}
