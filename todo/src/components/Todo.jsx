import React, { useState } from "react";
import './todo.css'


const AddTodo = (todo, setTodos) => {
    
}

const ShowTodo = (todos) => {
    console.log(todos.value)
    return(
        <>
        <ol>
            {
                todos.value.map((todo)=>{
                    return(
                        <li>{todo}</li>
                    )
                })
            }
        </ol>
        </>
    )
}

const DeleteTodo = (todos, setTodos) => {

}

const Todo = () => {

    const [todos, setTodos] = useState(["Eat", "Code", "Sleep", "Repeat"]);
    const [todo, setTodo] = useState("");

  return (
    <>
      <h1>Todo</h1>
        <ShowTodo value={todos}/>

    </>
  );
};

export default Todo;
