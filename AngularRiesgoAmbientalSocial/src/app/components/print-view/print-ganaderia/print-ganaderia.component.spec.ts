import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintGanaderiaComponent } from './print-ganaderia.component';

describe('PrintGanaderiaComponent', () => {
  let component: PrintGanaderiaComponent;
  let fixture: ComponentFixture<PrintGanaderiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintGanaderiaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintGanaderiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
