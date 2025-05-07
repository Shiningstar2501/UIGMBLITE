// const API = "http://localhost:3000/api";  // Your backend

// const redirectTo = new URLSearchParams(window.location.search).get("redirect");

// document.getElementById("loginBtn").onclick = () => handleAuth("login");
// document.getElementById("registerBtn").onclick = () => handleAuth("register");

// function handleAuth(type) {
//   const email = document.getElementById("email").value.trim();
//   const password = document.getElementById("password").value.trim();
//   const msg = document.getElementById("msg");

//   if (!email || !password) {
//     msg.innerText = "❗ Please enter email and password";
//     return;
//   }

//   fetch(`${API}/${type}`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ email, password })
//   })
//     .then(res => res.json())
//     .then(data => {
//       if (data.token) {
//         chrome.storage.local.set({ jwt: data.token }, () => {
//           msg.innerText = "✅ Success!";
//           if (redirectTo) window.location.href = redirectTo;
//         });
//       } else {
//         msg.innerText = data.message || "❌ Something went wrong";
//       }
//     })
//     .catch(err => {
//       console.error(err);
//       msg.innerText = "❌ Server error. Try again.";
//     });
// }

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("toggleModeBtn").addEventListener("click", toggleMode);
});


const API = "http://localhost:3000/api";
let isRegisterMode = false;

const nameEl = document.getElementById("name");
const phoneEl = document.getElementById("phone");
const emailEl = document.getElementById("email");
const passwordEl = document.getElementById("password");
const submitBtn = document.getElementById("submitBtn");
const msgEl = document.getElementById("msg");
const formTitle = document.getElementById("formTitle");
const redirectTo = new URLSearchParams(window.location.search).get("redirect");

function toggleMode() {
  isRegisterMode = !isRegisterMode;
  document.getElementById("registerFields").classList.toggle("hidden", !isRegisterMode);
  submitBtn.textContent = isRegisterMode ? "Register" : "Login";
  formTitle.textContent = isRegisterMode ? "Register" : "Login";
}

submitBtn.onclick = () => {
  const email = emailEl.value.trim();
  const password = passwordEl.value.trim();

  if (!email || !password || (isRegisterMode && (!nameEl.value.trim() || !phoneEl.value.trim()))) {
    msgEl.textContent = "❗ Please fill all required fields.";
    return;
  }

  const payload = {
    email,
    password,
    ...(isRegisterMode ? { name: nameEl.value.trim(), phone: phoneEl.value.trim() } : {})
  };

  const endpoint = isRegisterMode ? "register" : "login";

  fetch(`${API}/${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  })
    .then(res => res.json())
    .then(data => {
      if (data.token) {
        chrome.storage.local.set({ jwt: data.token }, () => {
          msgEl.textContent = "✅ Success!";
          if (redirectTo) window.location.href = redirectTo;
        });
      } else {
        msgEl.textContent = data.message || "❌ Failed.";
      }
    })
    .catch(err => {
      console.error(err);
      msgEl.textContent = "❌ Server error.";
    });
};