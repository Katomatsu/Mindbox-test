import React from 'react';
import { Flex, List } from 'antd';
import { TodoModel } from '../../Models/TodoModel';
import TodoItem from './TodoItem';
import { Filters } from '../../App';
import FiltersPanel from '../FiltersPanel/FiltersPanel';

interface TodoListProps {
  todos: TodoModel[];
  onChangeTodoProgress: (id: string) => void;
  onDeleteTodo: (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    id: string,
  ) => void;
  filter: Filters;
  onFilter: (filter: Filters) => void;
  onRemoveCompletedTodos: () => void;
}

const TodoList = ({
  todos,
  onChangeTodoProgress,
  onDeleteTodo,
  filter,
  onFilter,
  onRemoveCompletedTodos,
}: TodoListProps) => {
  const filteredTodos = todos.filter((todo) => {
    if (filter === Filters.Completed) return todo.isFinished;
    if (filter === Filters.Active) return !todo.isFinished;
    return true;
  });

  return (
    <Flex
      vertical
      gap="middle"
    >
      <List bordered>
        {filteredTodos.map((todo: TodoModel) => (
          <TodoItem
            key={todo.id}
            id={todo.id}
            isFinished={todo.isFinished}
            onDeleteTodo={onDeleteTodo}
            onChangeTodoProgress={() => onChangeTodoProgress(todo.id)}
            title={todo.title}
          />
        ))}
      </List>
      <FiltersPanel
        onRemoveCompletedTodos={onRemoveCompletedTodos}
        onFilter={onFilter}
        todosCount={todos.length}
      />
    </Flex>
  );
};

export default TodoList;
