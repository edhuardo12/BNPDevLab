import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionoficialComponent } from './gestionoficial.component';

describe('GestionoficialComponent', () => {
  let component: GestionoficialComponent;
  let fixture: ComponentFixture<GestionoficialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionoficialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionoficialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
