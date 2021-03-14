import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { TodoEffects } from '@store/effects/todo.effect';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoComponent } from './todo/todo.component';
import { MaterialModule } from '../material.module';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { TodoHeaderComponent } from './todo-header/todo-header.component';
import { TodoDetailComponent } from './todo-detail/todo-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { TodoResolver } from '@resolvers';
import { TodoFooterComponent } from './todo-footer/todo-footer.component';
import { TodoDialogComponent } from './todo-dialog/todo-dialog.component';

export const coursesRoutes: Routes = [
  { path: '', component: TodoComponent },
  {
    path: ':id',
    component: TodoDetailComponent,
    resolve: { todo: TodoResolver }
  }
];

@NgModule({
  declarations: [
    TodoComponent,
    TodoListComponent,
    TodoItemComponent,
    TodoHeaderComponent,
    TodoDetailComponent,
    TodoFooterComponent,
    TodoDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(coursesRoutes),
    EffectsModule.forFeature([TodoEffects])
  ],
  exports: [TodoComponent],
  providers: [TodoResolver]
})
export class TodoModule {}
