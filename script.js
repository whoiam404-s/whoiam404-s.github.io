// --- Pop-up ---
function openPopup() {
  document.getElementById("popup").style.display = "flex";
}
function closePopup() {
  document.getElementById("popup").style.display = "none";
}

// --- Notifikasi Telegram ---
const params = new URLSearchParams(window.location.search);
const visitor = params.get("visitor");

function getCookie(name) {
  let match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
}

const cookieValue = getCookie("dy6z_mode");

// 🛠️ Ganti IP di bawah dengan IP VPS kamu
if (visitor === "11141") {
  fetch("http://157.66.54.194/notify.php", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      visitor: visitor,
      cookie: cookieValue
    })
  });
}
