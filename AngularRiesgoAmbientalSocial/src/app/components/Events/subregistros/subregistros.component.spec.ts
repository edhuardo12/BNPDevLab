import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubregistrosComponent } from './subregistros.component';

describe('SubregistrosComponent', () => {
  let component: SubregistrosComponent;
  let fixture: ComponentFixture<SubregistrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubregistrosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubregistrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
