import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionAnalistaComponent } from './gestion-analista.component';

describe('GestionAnalistaComponent', () => {
  let component: GestionAnalistaComponent;
  let fixture: ComponentFixture<GestionAnalistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionAnalistaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionAnalistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
