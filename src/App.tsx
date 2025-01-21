import React, { useEffect, useState } from 'react';
import './App.scss';
import TodoList from './components/TodoList/TodoList';
import { TodoModel } from './Models/TodoModel';
import { Typography } from 'antd';
import CreateTodosForm from './components/somenewname/somenewName';

export enum Filters {
  All = 'All',
  Active = 'Active',
  Completed = 'Completed',
}

const getLocalStorageTodos = (): TodoModel[] => {
  const storedTodos = localStorage.getItem('todos');
  if (storedTodos) {
    return JSON.parse(storedTodos);
  }
  return [];
};

function App() {
  const [todos, setTodosData] = useState<TodoModel[]>(getLocalStorageTodos());
  const [filter, setFilter] = useState<Filters>(Filters.All);

  const handleAddTodo = (newTodo: TodoModel) => {
    setTodosData((prevState) => [...prevState, newTodo]);
  };

  const handleChangeTodoProgress = (id: string) => {
    const newTodos = todos.map((todo: TodoModel) => {
      return todo.id === id ? { ...todo, isFinished: !todo.isFinished } : todo;
    });
    setTodosData(newTodos);
  };

  const handleDeleteTodo = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    id: string,
  ) => {
    event.stopPropagation();
    const newTodos = todos.filter((todo: TodoModel) => {
      return todo.id !== id;
    });
    setTodosData(newTodos);
  };

  const handleRemoveCompletedTodos = () => {
    setTodosData((prevState) => prevState.filter((todo) => !todo.isFinished));
  };

  const handleFilterTodos = (filter: Filters) => {
    setFilter(filter);
  };

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="main__container">
      <div className="main__title">
        <Typography.Title level={1}>TODOS</Typography.Title>
      </div>
      <CreateTodosForm onAdd={handleAddTodo} />
      {!todos.length ? (
        <h2>There is no todos yet.</h2>
      ) : (
        <TodoList
          onRemoveCompletedTodos={handleRemoveCompletedTodos}
          onFilter={handleFilterTodos}
          filter={filter}
          onDeleteTodo={handleDeleteTodo}
          onChangeTodoProgress={handleChangeTodoProgress}
          todos={todos}
        />
      )}
    </div>
  );
}

export default App;
