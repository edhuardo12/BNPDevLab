import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstruccionViewComponent } from './construccion-view.component';

describe('ConstruccionViewComponent', () => {
  let component: ConstruccionViewComponent;
  let fixture: ComponentFixture<ConstruccionViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConstruccionViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConstruccionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
