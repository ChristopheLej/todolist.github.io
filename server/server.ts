import * as express from 'express';
import { Application } from 'express';
import { AddressInfo } from 'net';
import { deleteTodo } from './delete-todo';
import { getAllTodos, getTodoById } from './get-todos.route';
import { updateTodo, saveTodo } from './save-todo.route';

const bodyParser = require('body-parser');

const PORT = process.env.PORT || 9000;
const app: Application = express();
app.use(bodyParser.json());

app.route('/api/todos').get(getAllTodos);
app.route('/api/todos').put(saveTodo);

app.route('/api/todos/:id').get(getTodoById);
app.route('/api/todos/:id').put(updateTodo);
app.route('/api/todos/:id').delete(deleteTodo);

const httpServer = app.listen(9300, () => {
  const address: AddressInfo = httpServer.address() as AddressInfo;
  console.log('Server running at http://localhost:' + address.port);
});
