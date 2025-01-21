import React from 'react';
import { Button, Form, Input, Space } from 'antd';
import { TodoModel } from '../../Models/TodoModel';
import { v4 as uuidv4 } from 'uuid';
import './CreateTodosForm.scss';
interface CreateTodoFormProps {
  onAdd: (newTodo: TodoModel) => void;
}

const CreateTodosForm = ({ onAdd }: CreateTodoFormProps) => {
  const [form] = Form.useForm();

  const handleAddTodo = (values: { todo: string }) => {
    const newTodo: TodoModel = {
      title: values.todo,
      isFinished: false,
      id: uuidv4(),
    };
    onAdd(newTodo);
    form.resetFields();
  };

  return (
    <Form
      className="form"
      onFinish={handleAddTodo}
      form={form}
    >
      <Form.Item
        name={'todo'}
        rules={[
          { required: true, message: 'Please input your todo!' },
          { min: 3, message: 'Todo must be at least 3 characters long!' },
        ]}
      >
        <Space.Compact block>
          <Input
            size={'large'}
            placeholder={'What needs to be done?'}
          />
          <Button
            size={'large'}
            type="primary"
            htmlType={'submit'}
          >
            Add Todo
          </Button>
        </Space.Compact>
      </Form.Item>
    </Form>
  );
};

export default CreateTodosForm;
