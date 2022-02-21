import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GanaderoViewComponent } from './ganadero-view.component';

describe('GanaderoViewComponent', () => {
  let component: GanaderoViewComponent;
  let fixture: ComponentFixture<GanaderoViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GanaderoViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GanaderoViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
