import { ComponentFixture, TestBed } from '@angular/core/testing';

import { forgotPassword } from './forgot-password.component';

describe('ResetComponent', () => {
  let component: forgotPassword;
  let fixture: ComponentFixture<forgotPassword>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ forgotPassword ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(forgotPassword);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
