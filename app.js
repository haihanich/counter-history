'use strict';

// State
let count = 0;
let history = [];

// DOM
const countEl = document.getElementById('count');
const plusBtn = document.getElementById('plus-btn');
const minusBtn = document.getElementById('minus-btn');
const historyListEl = document.getElementById('history-list');

// Initial render
countEl.textContent = count;

// Render history
function renderHistory() {
  historyListEl.innerHTML = '';

  for (const item of history) {
    const li = document.createElement('li');
    li.textContent = item;
    historyListEl.appendChild(li);
  }
}

// Handlers
plusBtn.addEventListener('click', () => {
  count += 1;
  countEl.textContent = count;

  history.push(`+ → ${count}`);
  renderHistory();
});

minusBtn.addEventListener('click', () => {
  count -= 1;
  countEl.textContent = count;

  history.push(`− → ${count}`);
  renderHistory();
});
