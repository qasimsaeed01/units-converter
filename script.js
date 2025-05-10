
const category = document.getElementById('category');

const fromUnit = document.getElementById('fromUnit');

const toUnit = document.getElementById('toUnit');

const resultArea = document.getElementById('resultArea');

const inputValue = document.getElementById('inputValue');

const units = {
  weight: ['Kilograms (kg)', 'Pounds (lb)'],
  distance: ['Kilometers (km)', 'Miles (mi)'],
  temperature: ['Celsius (°C)', 'Fahrenheit (°F)']
};

function populateUnits() {
  const selected = category.value;
  fromUnit.innerHTML = '';
  toUnit.innerHTML = '';
  units[selected].forEach(unit => {
    fromUnit.innerHTML += `<option value="${unit}">${unit}</option>`;
    toUnit.innerHTML += `<option value="${unit}">${unit}</option>`;
  });
}

category.addEventListener('change', populateUnits);
populateUnits(); // Initial load

function convert() {
  const value = parseFloat(inputValue.value);
  const from = fromUnit.value;
  const to = toUnit.value;
  const cat = category.value;

  if (isNaN(value)) {
    resultArea.textContent = '⚠️ Please enter a valid number.';
    return;
  }

  if (cat !== 'temperature' && value < 0) {
    resultArea.textContent = '⚠️ Only temperature can be negative.';
    return;
  }

  let result = value;

  if (cat === 'weight') {
    if (from === to) result = value;
    else if (from.includes('kg')) result = value * 2.20462;
    else result = value / 2.20462;
  }

  if (cat === 'distance') {
    if (from === to) result = value;
    else if (from.includes('km')) result = value * 0.621371;
    else result = value / 0.621371;
  }

  if (cat === 'temperature') {
    if (from === to) result = value;
    else if (from.includes('C')) result = (value * 9/5) + 32;
    else result = (value - 32) * 5/9;
  }

  resultArea.textContent = `✅ Result: ${result.toFixed(2)} ${to}`;
}

function resetForm() {
  inputValue.value = '';
  populateUnits();
  resultArea.textContent = '🔁 Result will appear here';
}