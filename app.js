const express = require('express');
const app = express();

const GetAllTodos = require("./Routes/TodoActions/GetAllTodos/GetAllTodos");

const PORT = 3000;

app.use('/todos', GetAllTodos);

app.listen(PORT,  () => {
    console.log(`Listening on port ${PORT}`);
})