import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintAgricolaComponent } from './print-agricola.component';

describe('PrintAgricolaComponent', () => {
  let component: PrintAgricolaComponent;
  let fixture: ComponentFixture<PrintAgricolaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintAgricolaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintAgricolaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
