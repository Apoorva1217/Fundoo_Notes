import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing'
import { GetNoteComponent } from './get-note.component';
import { NotesService } from '../../service/notes.service'
import {Overlay} from '@angular/cdk/overlay'
import {MatDialogModule,MatDialogRef} from '@angular/material/dialog' 


describe('GetNoteComponent', () => {
  let component: GetNoteComponent;
  let fixture: ComponentFixture<GetNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[RouterTestingModule ,HttpClientTestingModule,MatDialogModule],
      declarations: [ GetNoteComponent ],
      providers:[NotesService,Overlay,MatDialogRef]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should call getPost',()=>{
    expect(component.noNote()).toBeTruthy()
  }
  );
});
