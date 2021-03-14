import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Todo } from '@models';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.scss']
})
export class TodoDetailComponent implements OnInit {
  todo: Todo;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.todo = this.route.snapshot.data['todo'];
  }
}
