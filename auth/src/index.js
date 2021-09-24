const express = require('express');
const mongoose = require('mongoose');
const app = express();
const { port, db, host, apiUrl } = require('./configuration');
const axios = require('axios');

const launchServer = () => {
  app.listen(port, async () => {
    console.log('Auth server is up and running on PORT: ' + port);
  });
}

app.get('/test', async (req, res, next) => {
  res.status(200);
  res.send('Api is working correctly!');
});

app.get('/api/currentUser', (req, res, next) => {
	res.json({
		id: '1234',
		email: 'foo@gmail.com'
	});
}); 

app.get('/testwithapidata', async (req, res) => {
	const response = await axios.get(apiUrl + '/testapidata');

	res.json({
		testApiData: response.data
	});
});

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to db: ', db);
    launchServer();
  })
  .catch(e => console.log(e));

