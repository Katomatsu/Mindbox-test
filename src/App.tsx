import React, {useEffect, useState} from 'react';
import './App.css';
import CreateTodosForm from "./components/createTodosForm/createTodosForm";
import TodoList from "./components/Todos/TodoList";
import {TodoModel} from "./Models/TodoModel";
import {Typography} from "antd";

export enum Filters {
  All = 'All',
  Active = 'Active',
  Completed = 'Completed',
}

const getLocalStorageTodos = (): TodoModel[] => {
  const storedTodos = localStorage.getItem('todos');
  if (storedTodos) {
    return JSON.parse(storedTodos)
  }
  return []
}

function App() {
  const [todos, setTodosData] = useState<TodoModel[]>(getLocalStorageTodos())
  const [filter, setFilter] = useState<Filters>(Filters.All)


  const handleAddTodo = (newTodo: TodoModel) => {
    setTodosData(prevState => [...prevState, newTodo])
  }

  const handleChangeTodoProgress = (id: string) => {
    const newTodos = todos.map((todo: TodoModel) => {
      return todo.id === id ? {...todo, isFinished: !todo.isFinished} : todo
    })
    setTodosData(newTodos)
  }

  const handleDeleteTodo = (id: string) => {
    const newTodos = todos.filter((todo: TodoModel) => {
      return todo.id !== id
    })
    setTodosData(newTodos)
  }

  const handleRemoveCompletedTodos = () => {
    setTodosData(prevState => prevState.filter(todo => !todo.isFinished))   
  }  

  const handleFilterTodos = (filter: Filters) => {
    setFilter(filter)
  }

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  return (
    <div className={'container'}>
      <Typography.Title level={1} style={{textAlign: 'center'}}>TODOS</Typography.Title>
      <CreateTodosForm onAdd={handleAddTodo}/>
      {!todos.length ? <h2 style={{textAlign: 'center'}}>There is no todos yet.</h2> :
        <TodoList
          onRemoveCompletedTodos={handleRemoveCompletedTodos}
          onFilter={handleFilterTodos} filter={filter} onDeleteTodo={handleDeleteTodo}
          onChangeTodoProgress={handleChangeTodoProgress}
          todos={todos}/>}
    </div>
  );
}

export default App;
