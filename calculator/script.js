let a = '';
let b = '';
let sign = '';
let finish = false;
const historyData = [];
let expression = '';

const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const actions = ['+', '-', '*', '/'];

const output = document.querySelector('.calculator-display p');
const clearBtn = document.querySelector('.ac');
const buttons = document.querySelector('.calculator-buttons');

function clearAll() {
  a = '';
  b = '';
  sign = ''
  finish = false;
  output.textContent = '0';
}

clearBtn.addEventListener('click', clearAll);

function handleBtnClick(e) {
  if (!e.target.classList.contains('btn')) return;
  if (e.target.classList.contains('ac')) return;

  output.textContent = '';
  const key = e.target.dataset.action;

  if (digits.includes(key)) {
    if (b === '' && sign === '') {
      a += key;
      output.textContent = a;
    }
    else if (a !== '' && b !== '' && finish) {
      b = key;
      finish = false;
      output.textContent = b;
    }
    else {
      b += key;
      output.textContent = b;
    }
    return;
  }

  if (actions.includes(key)) {
    sign = key;
    output.textContent = sign;
    return;
  }

  if (key === '=') {
    if (b === '') b = a;
    expression = `${a} ${sign} ${b}`;

    switch (sign) {
      case '+':
        a = (+a) + (+b);
        break;
      case '-':
        a = a - b;
        break;
      case '*':
        a = a * b;
        break;
      case '/':
        if (b === '0') {
          output.textContent = 'Ошибка';
          a = '';
          b = '';
          sign = '';
          return;
        }
        a = a / b;
        break;
    }
    finish = true;
    output.textContent = a;

    historyData.push({'expression': expression, 'result': a})
  }
}

buttons.addEventListener('click', (e) => handleBtnClick(e));

const historyBtn = document.querySelector(".history-btn");
const historyOutput = document.querySelector(".history");

function showHistory() {
  let str = '';
  historyOutput.textContent = '';
  for (let item of historyData) {
    str  = `<p>${item['expression']} = ${item['result']}</p>`;
    historyOutput.insertAdjacentHTML('afterbegin', str);
  }
}

historyBtn.addEventListener("click", () => {
  showHistory();
  historyOutput.classList.toggle("show");
});

const calculator = document.querySelector(".calculator");
calculator.addEventListener("click", (e) => {
  if (e.target == historyBtn) return;
  historyOutput.classList.remove("show");
});
