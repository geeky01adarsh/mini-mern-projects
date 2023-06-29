const express = require('express');
const pool = require('./db.js')

const app = express();
app.use(express.json());


app.get('/', (req, res)=> {
    res.send("<h1>Hello World!!!</h1><p>Learning Postgres</p>")
})

// todo routes

//create a todo
app.post('/todos', async(req, res)=>{
    try {
        const {description} = req.body;
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1)  RETURNING *", [description]);
        res.status(200).json(newTodo.rows[0])
    } catch (error) {
        console.error(error.message)
    }
})

// get all todos
app.get('/todos', async(req, res)=>{
    try {
        const todo = await pool.query("SELECT * FROM todo");
        return res.json(todo.rows)
    } catch (error) {
        console.error(error.message)
    }
})

// get todo by id
app.get('/todos/:id', async(req, res)=>{
    try {
        const id = req.params.id;
        const todo = await pool.query("SELECT * FROM todo WHERE t_id=($1)", [id]);
        return res.json(todo.rows[0])
    } catch (error) {
        console.error(error.message)
    }
})

// update todo by id
app.put('/todos/:id', async(req, res)=>{
    try {
        const id = req.params.id;
        const {description} = req.body;
        const todo = await pool.query("UPDATE todo set description=$1 WHERE t_id=($2)", [description,id]);
        return res.json({msg:"todo updated!"})
    } catch (error) {
        console.error(error.message)
    }
})

// delete todo by id
app.delete('/todos/:id', async(req, res)=>{
    try {
        const id = req.params.id;
        const todo = await pool.query("DELETE FROM todo WHERE t_id=($1)", [id]);
        return res.json({msg:"todo deleted!"})
    } catch (error) {
        console.error(error.message)
    }
})

app.listen(8282, ()=> console.log("App is listening to PORT 8282"))