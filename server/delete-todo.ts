import { Request, Response } from 'express';
import { TODOS } from './db-data';

export function deleteTodo(req: Request, res: Response) {
  console.log('Deleting todo ' + req.params['id'] + '...');

  const id = req.params['id'];

  let index = TODOS.findIndex(t => t.id.toString() === id);

  if (index === -1) {
    res.status(404).json('Task not found');
  } else {
    let todos = TODOS;
    todos = todos.splice(index, 1);
    res.status(200).json();
  }
}
