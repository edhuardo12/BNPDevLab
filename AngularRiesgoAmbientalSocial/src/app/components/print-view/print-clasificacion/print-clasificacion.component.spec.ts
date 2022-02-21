import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintClasificacionComponent } from './print-clasificacion.component';

describe('PrintClasificacionComponent', () => {
  let component: PrintClasificacionComponent;
  let fixture: ComponentFixture<PrintClasificacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintClasificacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintClasificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
