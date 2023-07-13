const express = require('express');
const app = express();
const fetch = require('node-fetch');

// Define the port the Express application will run on
const app_port = 8080;

// Set EJS as the application's view engine for rendering dynamic HTML pages
app.set('view engine', 'ejs');

// Defines a route (/dynamic) which responds to HTTP GET requests. This route used for dynamic data retrieval.
app.get('/dynamic', async (req, res) => {
    try {
      // Asynchronously send a request to the external API "HTTP Cats" - this API humorously provides HTTP status code images
      const response = await fetch('https://http.cat/status/200');
      // Fetch the status code from the response
      const response_code = await response.status;
      // If the response status code is 200 (OK), send data to the UI template with a success message
      if (response_code == 200) {
        res.render('pages/dynamic', { response_code: response_code, message: "External data fetch was successful." });
      } else {
        // If the response status code is not 200, send data to the UI template with a failure message
        res.render('pages/dynamic', { response_code: response_code, message: "External data fetch was unsuccessful. This is an error state for your plugin." });
      }
    } catch (error) {
      // Log any errors to the console and send a 500 (Internal Server Error) status code to the client
      console.error(error);
      res.status(500).send('Error occurred while fetching data from the API.');
    }
});

// Start the server listening on the defined port
app.listen(app_port, () => {
    // Log message to console when server is running
    console.log(`App running at http://localhost:${app_port}`);
});
