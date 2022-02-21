import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSubRegistComponent } from './admin-sub-regist.component';

describe('AdminSubRegistComponent', () => {
  let component: AdminSubRegistComponent;
  let fixture: ComponentFixture<AdminSubRegistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSubRegistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSubRegistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
