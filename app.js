'use strict';

// ===== Storage keys =====
const COUNT_KEY = 'counter.count';
const HISTORY_KEY = 'counter.history';

// ===== State =====
let count = 0;
let history = [];

// ===== Load from localStorage =====
const savedCount = localStorage.getItem(COUNT_KEY);
const savedHistory = localStorage.getItem(HISTORY_KEY);

if (savedCount !== null) {
  count = Number(savedCount);
}

if (savedHistory !== null) {
  history = JSON.parse(savedHistory);
}

// ===== DOM =====
const countEl = document.getElementById('count');
const plusBtn = document.getElementById('plus-btn');
const minusBtn = document.getElementById('minus-btn');
const historyListEl = document.getElementById('history-list');
const clearHistoryBtn = document.getElementById('clear-history-btn');
const resetAllBtn = document.getElementById('reset-all-btn');

// ===== Save to localStorage =====
function saveState() {
  localStorage.setItem(COUNT_KEY, count);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

// ===== Render =====
function render() {
  // counter value
  countEl.textContent = count;

  // minus button state
  minusBtn.disabled = count === 0;

  // history list
  historyListEl.innerHTML = '';
  history.forEach((item, index) => {
    const li = document.createElement('li');
    li.textContent = `${index + 1}. ${item}`;

    // animate only the last item
    if (index === history.length - 1) {
      li.classList.add('animated');
    }

    historyListEl.appendChild(li);
  });
}

// Initial render
render();

// ===== Handlers =====
plusBtn.addEventListener('click', () => {
  count += 1;
  history.push(`+ → ${count}`);
  saveState();
  render();
});

minusBtn.addEventListener('click', () => {
  if (count === 0) {
    return;
  }

  count -= 1;
  history.push(`− → ${count}`);
  saveState();
  render();
});

clearHistoryBtn.addEventListener('click', () => {
  history = [];
  saveState();
  render();
});

resetAllBtn.addEventListener('click', () => {
  const isConfirmed = confirm('Reset counter and history?');

  if (!isConfirmed) {
    return;
  }

  count = 0;
  history = [];
  localStorage.removeItem(COUNT_KEY);
  localStorage.removeItem(HISTORY_KEY);
  render();
});