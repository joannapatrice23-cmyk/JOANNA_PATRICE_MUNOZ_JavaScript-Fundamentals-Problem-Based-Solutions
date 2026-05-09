let goal = Number(localStorage.getItem("goal")) || 2000; 
let intake = Number(localStorage.getItem("intake")) || 0;
let reminderTimer = null;

let history = JSON.parse(localStorage.getItem("history")) || [];

document.addEventListener("DOMContentLoaded", () => {
updateUI();
renderHistory();
  updateUser();
});

function setGoal() {
  const input =
   document.getElementById("goalInput")?.value||
  document.getElementById("goalInputSettings")?.value;

  if (!input || input <= 0) return;

  goal = Number(input) * 1000; // convert L → ml
  intake = 0;

  localStorage.setItem("goal", goal);
  localStorage.setItem("intake", intake);

  updateUI();
}

function addWater(amount) {
  intake += amount;

  if (intake > goal) intake = goal;

  localStorage.setItem("intake", intake);

  
  history.push({
    amount,
    time: new Date().toLocaleTimeString()
  });

  localStorage.setItem("history", JSON.stringify(history));
  
  updateUI();
  renderHistory();
}

function resetTracker() {
 if (confirm("Reset your water intake for today?")) {
    intake = 0;
    localStorage.setItem("intake", intake);
    updateUI();
  }
}

function updateUI() {
  const percent = Math.min((intake / goal) * 100, 100);

  
  const intakeL = (intake / 1000).toFixed(2);
  const goalL = (goal / 1000).toFixed(2);
  const remainingL = ((goal - intake) / 1000).toFixed(2);

   const circle = document.querySelector(".circle-progress");

     if (circle) {
    const r = 60;
    const circumference = 2 * Math.PI * r;
    const offset = circumference - (percent / 100) * circumference;

    circle.style.strokeDasharray = circumference;
    circle.style.strokeDashoffset = offset;

    circle.style.stroke =
      percent < 40 ? "#ef5350" :
      percent < 80 ? "#ffa726" :
      "#42a5f5";
  }

   const progressPercent = document.getElementById("progressPercent");
  if (progressPercent) {
    progressPercent.innerText = Math.round(percent) + "%";
  }

  const currentIntake = document.getElementById("currentIntake");
  const goalAmount = document.getElementById("goalAmount");

  if (currentIntake) currentIntake.innerText = intakeL + "L";
  if (goalAmount) goalAmount.innerText = goalL + "L Goal";

    const status = document.getElementById("status");
  if (status) {
    status.innerText =
      percent === 100
        ? `🎉 Goal reached! ${goalL}L completed`
        : `${intakeL}L / ${goalL}L • ${remainingL}L left`;
  }

    const bodyWater = document.getElementById("bodyWater");
  const bodyPercent = document.getElementById("bodyPercent");

  if (bodyWater) bodyWater.style.height = percent + "%";
  if (bodyPercent) bodyPercent.innerText = Math.round(percent) + "%";
}

// =========================
// HISTORY
// =========================
function renderHistory() {
  const list = document.getElementById("historyList");
  if (!list) return;

  list.innerHTML = "";

  history.forEach((entry, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <span>${entry.amount}ml - ${entry.time}</span>
      <button onclick="deleteEntry(${index})">✖</button>
    `;

    list.appendChild(li);
  });
}

function deleteEntry(index) {
  history.splice(index, 1);
  localStorage.setItem("history", JSON.stringify(history));
  renderHistory();
}

function clearHistory() {
  if (confirm("Clear hydration history?")) {
    history = [];
    localStorage.setItem("history", JSON.stringify(history));
    renderHistory();
  }
}

// REMINDER
// =========================
function startReminder() {
  const minutes = Number(document.getElementById("reminderInterval")?.value);
  if (!minutes || minutes <= 0) return;

  localStorage.setItem("reminderInterval", minutes);

  if (Notification.permission !== "granted") {
    Notification.requestPermission();
  }

  clearInterval(reminderTimer);

  reminderTimer = setInterval(() => {
    const hour = new Date().getHours();
    if (hour < 8 || hour > 18) return;

    const expected = (goal / 10) * (hour - 8);

    if (intake < expected) {
      new Notification("💧 Time to hydrate!");
    }
  }, minutes * 60000);

  alert("Reminder started!");
}

function stopReminder() {
  clearInterval(reminderTimer);
  reminderTimer = null;
  alert("Reminder stopped!");
}

// =========================
// LOGIN
// =========================
function login() {
  const username = document.getElementById("usernameInput")?.value;
  if (!username) return;

  localStorage.setItem("user", username);
  updateUser();
}

function updateUser() {
  const user = localStorage.getItem("user");
  const greeting = document.getElementById("userGreeting");

  if (greeting) {
    greeting.innerText = user ? `Welcome, ${user} 👋` : "";
  }
}

// VIEW SWITCH (FIXED)
// =========================
function showView(viewId, btn) {

  document.querySelectorAll(".view").forEach(v =>
    v.classList.add("d-none")
  );

  const view = document.getElementById(viewId);
  if (view) view.classList.remove("d-none");

  document.querySelectorAll(".nav-pill").forEach(b =>
    b.classList.remove("active")
  );

  if (btn) btn.classList.add("active");
}









