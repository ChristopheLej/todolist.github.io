import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '../../material.module';
import { THEMES } from '@stubs/themes.stub';
import { By } from '@angular/platform-browser';

import { LayoutComponent } from './layout.component';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LayoutComponent],
      imports: [MaterialModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    component.themes = THEMES;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select a menu', () => {
    spyOn(component.themeSelected, 'emit');
    component.selectTheme(THEMES[2]);

    expect(component.themeSelected.emit).toHaveBeenCalledWith(THEMES[2]);
  });
});
