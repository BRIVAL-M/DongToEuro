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

//// Sauvegarde du taux de change + date dans le LS (modifié par le user)

// Récupération de l'élément input et de la span pour la date
const conversionRateInput = document.getElementById("conversionRate");
const dateSpan = document.getElementById("date");

// Écouteur d'événement pour le changement de la valeur de l'input
conversionRateInput.addEventListener("change", function () {
  // Mise à jour du taux de conversion dans le localStorage
  localStorage.setItem("conversionRate", conversionRateInput.value);

  // Mise à jour de la date dans le localStorage et dans la span
  const currentDate = new Date().toLocaleDateString("fr-FR");
  localStorage.setItem("conversionDate", currentDate);
  dateSpan.textContent = currentDate;

  // Chargement du taux de conversion et de la date depuis le localStorage
  const savedConversionRate = localStorage.getItem("conversionRate");
  const savedConversionDate = localStorage.getItem("conversionDate");
  if (savedConversionRate !== null) {
    conversionRateInput.value = savedConversionRate;
  }
  if (savedConversionDate !== null) {
    dateSpan.textContent = savedConversionDate;
  }
});

///// Vider le LS 

// Récupération de l'élément bouton pour la suppression
const removeButton = document.getElementById("removeConversion");

// Fonction pour vider le localStorage et actualiser la page
function clearLocalStorageAndReload() {
  localStorage.clear(); // Vide le localStorage
  location.reload(); // Actualise la page
}

// Écouteur d'événement pour le clic sur le bouton de suppression
removeButton.addEventListener("click", clearLocalStorageAndReload);










