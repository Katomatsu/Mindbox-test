import React from 'react';
import {Button, Checkbox, List, Space, Typography} from "antd";

import {DeleteFilled} from '@ant-design/icons';

interface TodoItemProps {
    title: string;
    isFinished: boolean;
    onChangeTodoProgress: () => void;
    onDeleteTodo: (event: React.MouseEvent<HTMLElement, MouseEvent>, id: string) => void;
    id: string;
}

const TodoItem = ({title, isFinished, onChangeTodoProgress, onDeleteTodo, id}: TodoItemProps) => {
    return (
        <List.Item style={{display: 'flex'}} onClick={onChangeTodoProgress} data-testid={`list-item`}>
            <Typography.Text style={{textDecoration: isFinished ? 'line-through' : 'none'}}>{title}</Typography.Text>
            <Space size={24}>
                <Checkbox style={{transform: 'scale(1.5)'}} checked={isFinished}/>
                <Button htmlType={'button'} onClick={(event) => onDeleteTodo(event, id)} type={'text'}
                        icon={<DeleteFilled style={{color: 'red', fontSize: 22}}/>}></Button>
            </Space>
        </List.Item>
    );
};

export default TodoItem;