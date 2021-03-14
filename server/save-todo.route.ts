import { Request, Response } from 'express';
import { TODOS } from './db-data';

export function updateTodo(req: Request, res: Response) {
  console.log('Saving todo ' + req.params['id'] + '...');

  const id = req.params['id'],
    changes = req.body;

  let index = TODOS.findIndex(t => t.id.toString() === id);

  if (index === -1) {
    res.status(404).json('Task not found');
  } else {
    TODOS[index] = {
      ...TODOS[index],
      ...changes
    };
    res.status(200).json({ payload: TODOS[index] });
  }
}

export function saveTodo(req: Request, res: Response) {
  console.log('Saving new todo...');
  const changes = req.body;

  const reducer = (accumulator, currentValue) => [...accumulator, currentValue.id];

  const id = Math.max(...(TODOS.reduce(reducer, []) as number[])) + 1;

  const todo = { id: id, ...changes };
  TODOS.push(todo);

  res.status(200).json({ payload: todo });
}
