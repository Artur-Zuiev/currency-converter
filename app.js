// === Currency Converter Logic ===

const currencies = ["USD", "EUR", "GBP", "UAH", "JPY"];

const fromSelect = document.getElementById("from-currency");
const toSelect = document.getElementById("to-currency");
const amountInput = document.getElementById("amount");
const resultDiv = document.getElementById("result");
const convertBtn = document.getElementById("convert");
const swapBtn = document.getElementById("swap");

// === Populate currency dropdowns ===
currencies.forEach((currency) => {
  const option1 = document.createElement("option");
  const option2 = document.createElement("option");
  option1.value = option2.value = currency;
  option1.textContent = option2.textContent = currency;
  fromSelect.appendChild(option1);
  toSelect.appendChild(option2);
});

// === Set default currencies ===
fromSelect.value = "EUR";
toSelect.value = "USD";

// === Convert currency using API ===
async function convert() {
  const amount = parseFloat(amountInput.value);
  const from = fromSelect.value;
  const to = toSelect.value;

  if (isNaN(amount) || amount <= 0) {
    resultDiv.textContent = "Please enter a valid amount.";
    resultDiv.classList.remove("hidden");
    return;
  }

  if (from === to) {
    resultDiv.textContent = `Result: ${amount.toFixed(2)} ${to}`;
    resultDiv.classList.remove("hidden");
    return;
  }

  try {
    const url = `https://open.er-api.com/v6/latest/${from}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data && data.rates && data.rates[to]) {
      const rate = data.rates[to];
      const result = amount * rate;
      resultDiv.textContent = `Result: ${result.toFixed(2)} ${to}`;
    } else {
      resultDiv.textContent = "Exchange rate not found.";
    }
  } catch (error) {
    console.error("Error fetching exchange rates:", error);
    resultDiv.textContent = "Failed to retrieve exchange rates.";
  }

  resultDiv.classList.remove("hidden");
}

// === Convert on button click ===
convertBtn.addEventListener("click", convert);

// === Swap currency selections and re-convert ===
swapBtn.addEventListener("click", () => {
  const temp = fromSelect.value;
  fromSelect.value = toSelect.value;
  toSelect.value = temp;
  convert(); // trigger conversion after swap
});

// === Clock and Date Logic ===

function updateClock() {
  const now = new Date();

  // Get time
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  const timeString = `${hours}:${minutes}:${seconds}`;

  // Get date in localized format
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const dateString = now.toLocaleDateString(undefined, options);

  // Display time + date
  document.getElementById(
    "clock"
  ).innerHTML = `${timeString}<small>${dateString}</small>`;
}

// === Start clock loop ===
setInterval(updateClock, 1000);
updateClock();
