import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintConstruccionComponent } from './print-construccion.component';

describe('PrintConstruccionComponent', () => {
  let component: PrintConstruccionComponent;
  let fixture: ComponentFixture<PrintConstruccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintConstruccionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintConstruccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
