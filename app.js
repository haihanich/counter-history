'use strict';

let count = 0;

const countEl = document.getElementById('count');
const plusBtn = document.getElementById('plus-btn');
const minusBtn = document.getElementById('minus-btn');

countEl.textContent = count;

plusBtn.addEventListener('click', () => {
  count += 1;
  countEl.textContent = count;
});

minusBtn.addEventListener('click', () => {
  count -= 1;
  countEl.textContent = count;
});