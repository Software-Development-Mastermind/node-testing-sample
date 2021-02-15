const express = require("express");
const app = express();

const usersController = require('./controllers/users-controller');
app.get('/api/users', usersController.getUsers)

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on port ${port}`));