import React from 'react';
import {render, screen, within} from '@testing-library/react';
import App from '../App';
import userEvent from "@testing-library/user-event";

const addTodo = async () => {
    const input: HTMLInputElement = screen.getByPlaceholderText('What needs to be done?');
    const button: HTMLButtonElement = screen.getByRole('button', {name: /Add Todo/i});

    await userEvent.type(input, 'brush teeth');
    await userEvent.click(button);

    const item: HTMLLIElement = await screen.findByTestId('list-item');
    return {item, input};
};

describe('Todos actions', () => {
    test('Adding a new todo', async () => {
        render(<App/>);
        const {item, input} = await addTodo();
        expect(item).toBeInTheDocument();
        expect(input).toBeEmptyDOMElement();
    });

    test('Changing todo progress', async () => {
        render(<App/>);
        const checkbox: HTMLInputElement = await screen.findByRole('checkbox');

        await userEvent.click(checkbox);
        expect(checkbox).toBeChecked();

        await userEvent.click(checkbox);
        expect(checkbox).not.toBeChecked();
    });

    test('removing todo', async () => {
        render(<App/>);
        const item: HTMLLIElement = await screen.findByTestId('list-item');

        const deleteButton: HTMLButtonElement = await within(item).findByRole('button');
        await userEvent.click(deleteButton);

        expect(item).not.toBeInTheDocument();
    });

});


// fireEvent.change(input, { target: { value: 'brush teeth' } });
// fireEvent.click(button);