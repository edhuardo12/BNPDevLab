import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeguimientoViewComponent } from './seguimiento-view.component';

describe('SeguimientoViewComponent', () => {
  let component: SeguimientoViewComponent;
  let fixture: ComponentFixture<SeguimientoViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeguimientoViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeguimientoViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
