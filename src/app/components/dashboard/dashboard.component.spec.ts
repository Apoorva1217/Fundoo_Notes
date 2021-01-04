import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing'
import { DashboardComponent } from './dashboard.component';
import { NotesService } from '../../service/notes.service'
import {MatSnackBar} from '@angular/material/snack-bar' 
import {Overlay} from '@angular/cdk/overlay'
import { MatMenuModule } from '@angular/material/menu';
import { By } from '@angular/platform-browser';
import { GetNoteComponent } from '../get-note/get-note.component';
import { RoutesRecognized } from '@angular/router';


describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let service: NotesService;
  let httpmock: HttpTestingController

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[RouterTestingModule.withRoutes(
        [
          {path:"add",component:GetNoteComponent}
        ]
      ),HttpClientTestingModule,MatMenuModule,],
      declarations: [ DashboardComponent ],
      providers:[NotesService,MatSnackBar,Overlay]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('test sideNav', () => {
    component.onToolbarMenuToggle()
    expect(component.isMenuOpen).toBeFalse()
    component.onToolbarMenuToggle()
    expect(component.isMenuOpen).toBeTrue()
  });
  // it('check route link',()=>{
  //   const navButton=fixture.debugElement;
  //   const iconButton=navButton.query(By.css(".material-icons-outlined"));
  //   const route:HTMLElement=iconButton.nativeElement;
  //   const tete=TestBed.get(location)
  //   expect(tete.path()).toBe("")
  // })
});
