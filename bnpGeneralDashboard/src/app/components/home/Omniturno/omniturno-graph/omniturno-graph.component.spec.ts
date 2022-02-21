import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OmniturnoGraphComponent } from './omniturno-graph.component';

describe('OmniturnoGraphComponent', () => {
  let component: OmniturnoGraphComponent;
  let fixture: ComponentFixture<OmniturnoGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OmniturnoGraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OmniturnoGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
