import { Request, Response } from 'express';
import { TODOS } from './db-data';

export function getAllTodos(req: Request, res: Response) {
  console.log('Retrieving todos data ...');

  res.status(200).json({ payload: Object.values(TODOS) });
}

export function getTodoById(req: Request, res: Response) {
  const todoId = parseInt(req.params['id'], 10);

  const todos = Object.values(TODOS);

  const todo = todos.find(todo => todo.id === todoId);

  res.status(200).json(todo);
}
