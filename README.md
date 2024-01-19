# Interactive Workspace Sidebar-Components

This project contains interactive side-bar components for use in AR applications. These components are built using the React framework (Typescript) and other thrid-party API such as Spotify API.

## Screenshots / Demos

| World Clocks       | Reminders                  | Weather              |   
|------------------|------------------------|---------------------|
| World Clocks using JavaScript's built-in Date.UTC() functions | Basic manager for checking off tasks  | Current Weather for a city as specified in the URL. Example: `http://localhost:3000/#/weather/Toronto` will show Toronto Canada's forcast when running a dev build. All weather data is fetched from [openweathermap.org](https://openweathermap.org/). |   |   |
| <img src='https://github.com/adrianpolimeni/workspace/blob/main/public/screenshots/Clock.gif' width='240'>  | <img src='https://github.com/adrianpolimeni/workspace/blob/main/public/screenshots/Tasks.gif' width='260'>   | <img src='https://github.com/adrianpolimeni/workspace/blob/main/public/screenshots/Weather.gif' width='420'>  |  

| Spotify Player |
|:----------------:|
| This music player widget uses the Spotify API to view and control songs being streamed on other devices. The demo below shows songs within a playlist being skipped. *Left: Widget displaying album art, titles, and controls. Right: Spotify Desktop App which is outputting the audio on a separate device.*     |
| <img src='https://github.com/adrianpolimeni/workspace/blob/main/public/screenshots/SpotifyPlayer.gif' width='716'> |
| *Note: A Spotify Premium account is needed for full functionality* |


## Available Scripts

In the project directory, you can run:

### `npm install`

Installs all npm dependancies
See `package.json` for list of dependancies.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
