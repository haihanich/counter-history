'use strict';

// ===== Storage keys =====
const COUNT_KEY = 'counter.count';
const HISTORY_KEY = 'counter.history';

// ===== State =====
let count = 0;
let history = [];

// Prevent animating existing history on first page load
let isFirstRender = true;

// ===== Load from localStorage =====
const savedCount = localStorage.getItem(COUNT_KEY);
const savedHistory = localStorage.getItem(HISTORY_KEY);

if (savedCount !== null) {
  count = Number(savedCount);
}

if (savedHistory !== null) {
  try {
    history = JSON.parse(savedHistory);
  } catch {
    history = [];
    localStorage.removeItem(HISTORY_KEY);
  }
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
  localStorage.setItem(COUNT_KEY, String(count));
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

// ===== Render =====
function render() {
  // counter value
  countEl.textContent = String(count);

  // minus button state
  minusBtn.disabled = count === 0;

  // history action buttons state
  const hasHistory = history.length > 0;
  clearHistoryBtn.disabled = !hasHistory;
  resetAllBtn.disabled = !hasHistory && count === 0; 
  // reset имеет смысл, если есть история ИЛИ count не ноль

  // history list
  historyListEl.innerHTML = '';
  history.forEach((item, index) => {
    const li = document.createElement('li');
    li.textContent = `${index + 1}. ${item}`;

    // animate only the newly added item (not on first render)
    if (!isFirstRender && index === history.length - 1) {
      li.classList.add('animated');
    }

    historyListEl.appendChild(li);
  });

  isFirstRender = false;
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
  if (history.length === 0) {
    return;
  }

  history = [];
  saveState();
  render();
});

resetAllBtn.addEventListener('click', () => {
  if (history.length === 0 && count === 0) {
    return;
  }

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
