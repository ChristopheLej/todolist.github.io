import { isLoweredSymbol } from '@angular/compiler';

export interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}
