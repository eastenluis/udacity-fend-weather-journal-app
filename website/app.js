/* Global Variables */
// Note: This API key may be deactivated after review.
const OPEN_WEATHER_API_KEY = '7763228b84aa4eba0706cdf3f4a60425';
const OPEN_WEATHER_BASE_PATH = 'https://api.openweathermap.org/data/2.5/weather';

/** New Entry Submission Handler */
const retrieveWeatherData = async (zip) => {
    const response = await fetch(`${OPEN_WEATHER_BASE_PATH}?zip=${zip}&appid=${OPEN_WEATHER_API_KEY}&units=metric`, {
        method: 'GET',
        mode: 'cors',
    });
    if (!response.ok) {
        throw new Error(`HTTP Status: ${response.status}`);
    }
    return response.json();
};

const saveWeatherJournal = async (temperature, userResponse) => {
    const payload = {
        temp: temperature,
        date: new Date().toISOString(),
        userResponse,
    };
    const response = await fetch('/api/journals', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });
    if (!response.ok) {
        throw new Error(`HTTP Status: ${response.status}`);
    }
};

const updateLastWeatherJournal = async () => {
    const response = await fetch('/api/journals');
    if (!response.ok) {
        throw new Error(`HTTP Status: ${response.status}`);
    }
    const { temp, date, userResponse } = await response.json();
    const tempElm = document.getElementById('temp');
    tempElm.innerText = temp ? `${temp}℃` : '';
    const dateElm = document.getElementById('date');
    dateElm.innerText = date ? new Date(date).toLocaleDateString() : '';
    const contentElm = document.getElementById('content');
    contentElm.innerText = userResponse || '';
};

const onGenerateClicked = async (evt) => {
    evt.stopPropagation();
    const zip = document.getElementById('zip').value;
    const userResponse = document.getElementById('feeling').value;
    try {
        const weatherData = await retrieveWeatherData(zip);
        const temperature = weatherData.main.temp;
        await saveWeatherJournal(temperature, userResponse);
        await updateLastWeatherJournal();
    } catch (e) {
        console.error(e);
    }
};

/** Initialization */
window.addEventListener('load', () => {
    const generateButton = document.getElementById('generate');
    generateButton.addEventListener('click', onGenerateClicked);

    // Update initial values
    updateLastWeatherJournal().catch(e => console.error(e));
});
