import React from 'react';
import { Button, Checkbox, List, Space, Typography } from 'antd';
import './TodoItem.scss';
import { DeleteFilled } from '@ant-design/icons';

interface TodoItemProps {
  title: string;
  isFinished: boolean;
  onChangeTodoProgress: () => void;
  onDeleteTodo: (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    id: string,
  ) => void;
  id: string;
}

const TodoItem = ({
  title,
  isFinished,
  onChangeTodoProgress,
  onDeleteTodo,
  id,
}: TodoItemProps) => {
  return (
    <List.Item
      onClick={onChangeTodoProgress}
      data-testid="list-item"
    >
      <Typography.Text
        strong
        className={`todo-item__title ${isFinished ? 'finished' : ''}`}
      >
        {title}
      </Typography.Text>
      <Space size={24}>
        <Checkbox
          className="todo-item__checkbox"
          checked={isFinished}
        />
        <Button
          htmlType="button"
          onClick={(event) => onDeleteTodo(event, id)}
          type="text"
          icon={<DeleteFilled className="todo-item__trash-button" />}
        ></Button>
      </Space>
    </List.Item>
  );
};

export default TodoItem;
