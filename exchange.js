const apiKey = "e061fbd62c7704a496e3596d";
const api = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

document.addEventListener("DOMContentLoaded", function () {
  const fromDropDown = document.getElementById("from-currency-select");
  const toDropDown = document.getElementById("to-currency-select");
  const result = document.getElementById("result");

  if (fromDropDown && toDropDown) {
    // const currencies = ["USD", "EUR", "GBP", "JPY", "CAD"];
    const currencies = [
        "AED", "AFN", "ALL", "AMD", "ANG", "AOA", "ARS", "AUD", "AWG", "AZN",
        "BAM", "BBD", "BDT", "BGN", "BHD", "BIF", "BMD", "BND", "BOB", "BRL",
        "BSD", "BTN", "BWP", "BYN", "BZD", "CAD", "CDF", "CHF", "CLP", "CNY",
        "COP", "CRC", "CUP", "CVE", "CZK", "DJF", "DKK", "DOP", "DZD", "EGP",
        "ERN", "ETB", "EUR", "FJD", "FKP", "FOK", "GBP", "GEL", "GGP", "GHS",
        "GIP", "GMD", "GNF", "GTQ", "GYD", "HKD", "HNL", "HRK", "HTG", "HUF",
        "IDR", "ILS", "IMP", "INR", "IQD", "IRR", "ISK", "JEP", "JMD", "JOD",
        "JPY", "KES", "KGS", "KHR", "KID", "KMF", "KRW", "KWD", "KYD", "KZT",
        "LAK", "LBP", "LKR", "LRD", "LSL", "LYD", "MAD", "MDL", "MGA", "MKD",
        "MMK", "MNT", "MOP", "MRU", "MUR", "MVR", "MWK", "MXN", "MYR", "MZN",
        "NAD", "NGN", "NIO", "NOK", "NPR", "NZD", "OMR", "PAB", "PEN", "PGK",
        "PHP", "PKR", "PLN", "PYG", "QAR", "RON", "RSD", "RUB", "RWF", "SAR",
        "SBD", "SCR", "SDG", "SEK", "SGD", "SHP", "SLL", "SOS", "SRD", "SSP",
        "STN", "SVC", "SYP", "SZL", "THB", "TJS", "TMT", "TND", "TOP", "TRY",
        "TTD", "TWD", "TZS", "UAH", "UGX", "USD", "UYU", "UZS", "VES", "VND",
        "VUV", "WST", "XAF", "XCD", "XDR", "XOF", "XPF", "YER", "ZAR", "ZMW",
        "ZWL", "BYR", "RUR", "RON", "TRL"
    ]
    
     // Example currencies array

    // Create dropdown options for 'from' and 'to' currencies
    currencies.forEach((currency) => {
      const option = document.createElement("option");
      option.value = currency;
      option.text = currency;
      fromDropDown.appendChild(option.cloneNode(true));
      toDropDown.appendChild(option.cloneNode(true));
    });

    // Set default values
    fromDropDown.value = "USD";
    toDropDown.value = "INR";   

    // Function to convert currency
    const convertCurrency = () => {
      const amount = parseFloat(document.getElementById("amount").value);
      const fromCurrency = fromDropDown.value;
      const toCurrency = toDropDown.value;

      if (!isNaN(amount) && amount > 0) {
        fetch(api)
          .then((response) => response.json())
          .then((data) => {
            const fromExchangeRate = data.conversion_rates[fromCurrency];
            const toExchangeRate = data.conversion_rates[toCurrency];
            const convertedAmount = (amount / fromExchangeRate) * toExchangeRate;
            result.textContent = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`;
          })
          .catch((error) => {
            console.error("Error fetching exchange rates:", error);
          });
      } else {
        alert("Please fill in a valid amount.");
      }
    };

    // Event listener
    document.getElementById("convert-button").addEventListener("click", convertCurrency);
  } else {
    console.error("One or both dropdown elements not found.");
  }
});
