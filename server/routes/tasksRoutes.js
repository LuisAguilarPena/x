const express = require('express')
const tasksRoutes = express.Router()
const getConnection = require('./getConnection.js')

// Displays all tasks in database
tasksRoutes.get('/tasks', (req, res) => {
  getConnection().query("SELECT * FROM Tasks", (err, rows, fields) => { 
    res.json(rows) 
  })
})

// Displays an specific task in database
tasksRoutes.get('/tasks/:id', (req, res) => {
  console.log(`Fetching task with id: ${req.params.id}`);
  const queryString = "SELECT * FROM Tasks WHERE id = ?" // whatever we type inside [ ] is going to be the id, we can change the query a little bit in order to get users by other columns
  const taskId = req.params.id
  getConnection().query(queryString, [taskId], (err, rows, fields) => {
    if(err) {
      console.log(`Failed to query for Tasks: ${err}`)
      res.sendStatus(500)
      return
    }
    console.log('I think we fetched Tasks correctly');
    res.json(rows)
  })
}) 

module.exports = tasksRoutes