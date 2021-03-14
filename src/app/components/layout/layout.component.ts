import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Theme } from '@models';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  @Input() themes: Theme[];
  @Output() themeSelected = new EventEmitter<Theme>();

  constructor() {}

  ngOnInit(): void {}

  selectTheme(theme: Theme) {
    this.themeSelected.emit(theme);
  }
}
