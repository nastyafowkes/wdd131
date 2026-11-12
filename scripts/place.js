
// Footer dates
document.querySelector("#currentyear").textContent =
    new Date().getFullYear();

document.querySelector("#lastModified").textContent =
    `Last Modification: ${document.lastModified}`;

// Weather data
const temperature = Number(
    document.querySelector("#temperature").textContent
);

const windSpeed = Number(
    document.querySelector("#windSpeed").textContent
);

// Wind chill formula for Celsius and km/h
function calculateWindChill(temp, wind) {
    return (13.12 + 0.6215 * temp - 11.37 * wind ** 0.16 + 0.3965 * temp * wind ** 0.16).toFixed(1);
}

// Only calculate when the conditions are met
const windChill = document.querySelector("#windChill");

if (temperature <= 10 && windSpeed > 4.8) {
    windChill.textContent =
        `${calculateWindChill(temperature, windSpeed)} °C`;
} else {
    windChill.textContent = "N/A";
}
