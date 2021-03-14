import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Todo } from '@models';
import { UpdateEventTodo } from '../utils';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo;
  @Output() updateTodo = new EventEmitter<UpdateEventTodo>();
  @Output() removeTodo = new EventEmitter<{ id: number }>();

  constructor() {}

  ngOnInit(): void {}

  toggleSatus(completed: boolean) {
    this.updateTodo.emit({ id: this.todo.id, completed });
  }

  removeTask() {
    this.removeTodo.emit({ id: this.todo.id });
  }
}
