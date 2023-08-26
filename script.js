function formatNumberWithSpaces(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

document.addEventListener('DOMContentLoaded', function () {
  const vndAmountInput = document.getElementById('vndAmount');
  const resultElement = document.getElementById('result');
  const selectedRateDisplay = document.getElementById('selectedRateDisplay');
  const conversionRateInput = document.getElementById('conversionRate');
  const rateSelect = document.getElementById('rateSelect');

  vndAmountInput.addEventListener('input', updateConversion);
  conversionRateInput.addEventListener('input', updateConversion);
  rateSelect.addEventListener('change', updateConversion);

  function updateConversion() {
    const vndAmount = parseFloat(vndAmountInput.value);
    const conversionRate = parseFloat(conversionRateInput.value);

    const euroEquivalent = convertVNDToEuro(vndAmount, conversionRate);
    const selectedRate = parseFloat(rateSelect.value);
    const euroEquivalentSelectedRate = convertVNDToEuro(selectedRate, conversionRate);

    if (!isNaN(vndAmount) && !isNaN(conversionRate)) {
      const formattedVNDAmount = formatNumberWithSpaces(vndAmount);
      const formattedEuroEquivalent = formatNumberWithSpaces(euroEquivalent);
      resultElement.textContent = `${formattedVNDAmount} Đ = ${formattedEuroEquivalent} €`;
    } else {
      resultElement.textContent = '';
    }

    if (!isNaN(selectedRate) && !isNaN(conversionRate)) {
      const formattedSelectedRate = formatNumberWithSpaces(selectedRate);
      const formattedEuroEquivalentSelectedRate = formatNumberWithSpaces(euroEquivalentSelectedRate);
      selectedRateDisplay.textContent = `${formattedSelectedRate} Đ = ${formattedEuroEquivalentSelectedRate} €`;
    } else {
      selectedRateDisplay.textContent = '';
    }
  }

  function convertVNDToEuro(amount, conversionRate) {
    const euroAmount = amount / conversionRate;
    return euroAmount.toFixed(2); // Arrondi à 2 décimales
  }

  // Conversion initiale lors du chargement de la page
  updateConversion();
});







