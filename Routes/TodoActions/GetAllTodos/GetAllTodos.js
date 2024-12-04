const express = require("express");
const router = express.Router();

const fs = require("fs");

router.use((req, res, next) => {
    
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