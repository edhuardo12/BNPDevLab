import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintSeguimientoComponent } from './print-seguimiento.component';

describe('PrintSeguimientoComponent', () => {
  let component: PrintSeguimientoComponent;
  let fixture: ComponentFixture<PrintSeguimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintSeguimientoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintSeguimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
