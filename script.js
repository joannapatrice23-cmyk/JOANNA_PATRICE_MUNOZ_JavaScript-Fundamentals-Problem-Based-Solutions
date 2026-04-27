let goal = Number(localStorage.getItem("goal")) || 2000; 
let intake = Number(localStorage.getItem("intake")) || 0;

updateUI();

function setGoal() {
  const input = document.getElementById("goalInput").value;
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

  const percent = Math.min((intake / goal) * 100, 100);

  // Convert to liters for display
  const intakeL = (intake / 1000).toFixed(2);
  const goalL = (goal / 1000).toFixed(2);
  const remainingL = ((goal - intake) / 1000).toFixed(2);

   document.getElementById("progressBar").style.width = percent + "%";