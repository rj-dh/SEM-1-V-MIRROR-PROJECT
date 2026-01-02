/* AUTH CHECK */
const user = localStorage.getItem("vmirrorUser");
if (!user) {
  window.location.href = "../login-frontend/login.html";
}

/* SHOW USERNAME */
document.getElementById("usernameDisplay").innerText = user;
document.getElementById("menuUsername").innerText = user;

/* ACCOUNT DROPDOWN */
const accountBtn = document.getElementById("accountBtn");
const accountMenu = document.getElementById("accountMenu");

accountBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  accountMenu.classList.toggle("show");
});

document.addEventListener("click", () => {
  accountMenu.classList.remove("show");
});

/* LOGOUT */
document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("vmirrorUser");
  window.location.href = "../login-frontend/login.html";
});
