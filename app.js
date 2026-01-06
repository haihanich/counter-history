'use strict';

// State
let count = 0;
let history = [];

// DOM
const countEl = document.getElementById('count');
const plusBtn = document.getElementById('plus-btn');
const minusBtn = document.getElementById('minus-btn');
const historyListEl = document.getElementById('history-list');
const clearHistoryBtn = document.getElementById('clear-history-btn');

// Render
function render() {
  // counter value
  countEl.textContent = count;

  // minus button state
  minusBtn.disabled = count === 0;

  // history list
  historyListEl.innerHTML = '';
  for (const item of history) {
    const li = document.createElement('li');
    li.textContent = item;
    historyListEl.appendChild(li);
  }
}

// Initial render
render();

// Handlers
plusBtn.addEventListener('click', () => {
  count += 1;
  history.push(`+ → ${count}`);
  render();
});

minusBtn.addEventListener('click', () => {
  if (count === 0) {
    return;
  }

  count -= 1;
  history.push(`− → ${count}`);
  render();
});

clearHistoryBtn.addEventListener('click', () => {
  history = [];
  render();
});
