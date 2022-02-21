import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteClasificacionComponent } from './reporte-clasificacion.component';

describe('ReporteClasificacionComponent', () => {
  let component: ReporteClasificacionComponent;
  let fixture: ComponentFixture<ReporteClasificacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteClasificacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteClasificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
