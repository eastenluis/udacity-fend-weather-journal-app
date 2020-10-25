# Weather-Journal App Project

This project is developed based on Udacity front-end development project (https://github.com/udacity/fend/tree/refresh-2019/projects/weather-journal-app). Following changes have been made:

- Removed comments only sample codes.
- Reorganize page elements and update page styles.
- Add package.json and eslint file to assist package installation.
- Front-end: Add click listener to request weather data from OpenWeather, update server data and update journal entry UI accordingly.
- Back-end:
  - Add GET and POST routes to store and fetch journal data.
  - Use `body-parser` and `cors` middlewares.

## Run web app
- Install node packages through `npm install`.
- Start the server through `npm start`.
- Access the web app through `http://localhost:8000`.

## Note
- The OpenWeather API Key included in the code is for review purpose only. It may be deleted upon review completed.
