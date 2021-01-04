import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { RegisterComponent } from './register.component';
import {  UserService } from '../../service/user.service'
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Overlay } from '@angular/cdk/overlay';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

fdescribe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let de:DebugElement;
  let el:HTMLElement
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [ReactiveFormsModule,HttpClientTestingModule,RouterTestingModule,FormsModule],
      providers:[UserService,MatSnackBar,Overlay]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    de=fixture.debugElement.query(By.css('form'))
    el=de.nativeElement
  });
it('invalid input check',()=>{
  component.Email.setValue('')
  component.FirstName.setValue('')
  component.LastName.setValue('')
  component.Password.setValue('')
  expect(component.Email.valid).toBeFalse()
  expect(component.FirstName.valid).toBeFalse()
  expect(component.LastName.valid).toBeFalse()
  expect(component.Password.valid).toBeFalse()
 
})
it('valid input check',()=>{
  component.Email.setValue('jevapa8908@1981pc.com')
  component.FirstName.setValue('hello')
  component.LastName.setValue('lord')
  component.Password.setValue('Gharat!333')
  expect(component.Email.valid).toBeTrue()
  expect(component.FirstName.valid).toBeTrue()
  expect(component.LastName.valid).toBeTrue()
  expect(component.Password.valid).toBeTrue()
})  
});

