import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogNoteComponent } from './dialog-note.component';

describe('DialogNoteComponent', () => {
  let component: DialogNoteComponent;
  let fixture: ComponentFixture<DialogNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogNoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
