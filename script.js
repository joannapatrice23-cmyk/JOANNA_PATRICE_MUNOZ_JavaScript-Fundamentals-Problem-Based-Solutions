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