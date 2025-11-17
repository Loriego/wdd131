// W03 Country Page (place.html)

// Example temperature and wind speed.
// You can adjust these numbers to match your chosen day's weather.
const tempElement = document.querySelector("#temp");
const windSpeedElement = document.querySelector("#wind-speed");
const windChillElement = document.querySelector("#windchill");

// Convert Celsius to Fahrenheit for the wind chill calculation.
const tempCelsius = Number(tempElement?.textContent) || 30;
const windSpeedKmh = Number(windSpeedElement?.textContent) || 18;
const tempFahrenheit = tempCelsius * 9 / 5 + 32;
const windSpeedMph = windSpeedKmh / 1.609;

// Required function: one line of code only
const calculateWindChill = (t, v) => 35.74 + 0.6215 * t - 35.75 * Math.pow(v, 0.16) + 0.4275 * t * Math.pow(v, 0.16);

// Only call function if the conditions are met
// (standard: temp <= 50°F and wind speed > 3 mph)
if (windChillElement) {
  if (tempFahrenheit <= 50 && windSpeedMph > 3) {
    const chill = calculateWindChill(tempFahrenheit, windSpeedMph);
    windChillElement.textContent = `${chill.toFixed(1)} °F`;
  } else {
    windChillElement.textContent = "N/A";
  }
}

// Mobile navigation toggle (re-use pattern from W02)
const menuButton = document.querySelector("#menu-button");
const menu = document.querySelector("#menu");

if (menuButton && menu) {
  menuButton.addEventListener("click", () => {
    menu.classList.toggle("show");
    menu.classList.toggle("hide");
  });
}
