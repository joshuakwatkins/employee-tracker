const express = require('express');
const mainMenu = require('./helpers/prompts');


const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

mainMenu();

app.listen(PORT, () => console.log('Now listening'));
