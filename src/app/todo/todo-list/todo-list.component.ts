import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Todo } from '@models';
import { UpdateEventTodo } from '../utils';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  @Input() todos: Todo[] | null = [];
  @Output() updateTodo = new EventEmitter<UpdateEventTodo>();
  @Output() removeTodo = new EventEmitter<{ id: number }>();

  currentFilter = 'All';

  constructor() {}

  ngOnInit(): void {}

  filterCompleted = todo => todo.completed;

  filterAvailable = todo => !todo.completed;

  updateFilter(event) {
    this.currentFilter = event;
  }
}
