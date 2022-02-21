import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForestalViewComponent } from './forestal-view.component';

describe('ForestalViewComponent', () => {
  let component: ForestalViewComponent;
  let fixture: ComponentFixture<ForestalViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForestalViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForestalViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
