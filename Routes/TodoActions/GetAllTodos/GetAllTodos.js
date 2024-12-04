const express = require("express");
const router = express.Router();

const fs = require("fs");

router.use((req, res, next) => {
    const method = req.method;
    const uniqueTodoID = req.params.todoID;
    const description = req.params.description;
    const completed = req.params.completed || false;
    
    // If the player is requesting a specific todo, check the ID given and return the item at that index.
    if (method === "GET" && req.url === "/GetTodo" && uniqueTodoID !== null) {
        fs.readFile('../../../todoList.json', 'utf-8', (err, data) => {
            if (err) {
                console.log(err);
                res.status(500).json({ message: "There was a server error reading the todo list!"});
                return;
            }
            
            next();
        })
    }
    else if (method === "GET" && req.url === "/GetTodo" && uniqueTodoID == null) {
        res.status(400).json({ message: "There was no ID provided in the request!"})
    }
    
    // If the player requests to change one of the entries, we need to make sure that the unique id, description, and completed are true values
    // This function will then parse the json file and change the todo item into the new requested changes.
    if (method === "PUT" && uniqueTodoID !== null && description !== null) {
        fs.readFile('../../../todoList.json', 'utf-8', (err, data) => {
            if (err) {
                console.log(err);
                res.status(500).json({ message: "There was a server error reading the todo list!"});
                return;
            }
            
            let todoListData = JSON.parse(data);
            
            todoListData[uniqueTodoID] = {
                id: uniqueTodoID,
                description: description,
                completed: completed
            };
            
            next();
        })
    }
    else if (method === "PUT" && description == null) {
        res.status(400).json({ message: "There was no description provided for the change!"});
    }
    else if (method === "PUT" && uniqueTodoID == null) {
        res.status(400).json({ message: "There was no ID provided for the change!"});
    }
    
    if (method === "DELETE" && uniqueTodoID !== null) {
        fs.readFile('../../../todoList.json', 'utf-8', (err, data) => {
            if (err) {
                console.log(err);
                res.status(500).json({ message: "There was a server error reading the todo list!"});
            }
            
            if (todoListData[uniqueTodoID] == null) {
                res.status(404).json({ message: "That ID was not found in the todo list!"});
            }
            
            let todoListData = JSON.parse(data);
            
            todoListData.splice(uniqueTodoID, 1);
            
            next();
        })
    }
    else if (method === "DELETE" && uniqueTodoID == null) {
        res.status(400).json({ message: "There was no ID provided for the deletion!"});
    } 
    
    if (method === "POST" && uniqueTodoID !== null && description !== null) {
        fs.readFile('../../../todoList.json', 'utf-8', (err, data) => {
            if (err) {
                console.log(err);
                res.status(500).json({ message: "There was a server error reading the todo list!"});
            }
            
            let todoListData = JSON.parse(data);
            
            todoListData.push({
                id: uniqueTodoID,
                description: description,
                completed: completed
            });
            
            fs.writeFile('../../../todoList.json', todoListData, (err) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({message: "There was a server error writing the todo list!"});
                }
                
                next();
            })
        })
    }
})

router.get("/GetAllTodos", (req, res) => {
    fs.readFile('../../../todoList.json', 'utf8', (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error');
            return;
        }
        
        let todoListData = JSON.parse(data);
        
        res.json(todoListData);
    })
})

module.exports = router;