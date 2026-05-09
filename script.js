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
}

function resetTracker() {
  const confirmReset = confirm("Reset your water intake for today?");
  
  if (confirmReset) {
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

   document.getElementById("progressBar").style.width = percent + "%";

     if (percent === 100) {
    document.getElementById("status").innerText =
      `🎉 Goal reached! ${goalL}L completed`;
  } else {
    document.getElementById("status").innerText =
      `${intakeL}L / ${goalL}L • ${remainingL}L left`;
  }
}