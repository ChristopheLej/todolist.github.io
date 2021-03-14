import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Theme } from '@models';
import { Store } from '@ngrx/store';
import { ApplicationState } from '@storeConfig';
import * as fromSelector from '@store/selectors/layout.selector';
import { TodoDialogComponent } from '../todo-dialog/todo-dialog.component';
import { saveTodo } from '@store/actions/todo.actions';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styleUrls: ['./todo-footer.component.scss']
})
export class TodoFooterComponent implements OnInit {
  @Output() updateFilter = new EventEmitter<string>();

  activeTheme: Theme;
  filters = [
    { caption: 'All', selected: true },
    { caption: 'Active', selected: false },
    { caption: 'Completed', selected: false }
  ];

  constructor(private store: Store<ApplicationState>, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.store.select(fromSelector.getActiveTheme).subscribe(theme => (this.activeTheme = theme));
  }

  newTodo() {
    const todo = {
      title: '',
      description: '',
      completed: false
    };

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '400px';
    dialogConfig.data = todo;
    dialogConfig.panelClass = this.activeTheme.class;

    const dialogRef = this.dialog.open(TodoDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(data => {
      if (data !== undefined) {
        this.store.dispatch(saveTodo({ todo: data }));
      }
    });
  }
}
