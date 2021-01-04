import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NotesService } from 'src/app/service/notes.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SharedService } from 'src/app/service/shared/shared.service';

@Component({
  selector: 'app-notes',
  templateUrl: './create-notes.component.html',
  styleUrls: ['./create-notes.component.scss']
})
export class CreateNotesComponent implements OnInit {
  reset = true
  constructor(private noteService: NotesService, public snackBar: MatSnackBar, private shared: SharedService) { }
  note = []
  ngOnInit(): void {
    this.getNote()
  }
  title = new FormControl("", Validators.minLength(3));
  description = new FormControl();
  notePinned = false;
  card = false;
  reminder = false;

  addNote() {
    let noteData = {
      "title": this.title.value,
      "description": this.description.value
    }
    this.noteService.addNotes(noteData).subscribe(response => {
      if (response['status'].success == true) {
        this.snackBar.open("note added successfully", 'success', { duration: 2000 })
      }
    },
      error => {
        this.snackBar.open("unable to add plz try again", 'failed', { duration: 2000 })
      }
    )

  }
  getNote() {
    this.noteService.getNotes().subscribe(response => {
      for (let i = 0; i < response['data'].data.length; i++) {
        if (response['data'].data[i].isDeleted || response['data'].data[i].isArchived) { }
        else {
          this.note.push(response['data'].data[i])
        }
      }
      console.log(this.note)
    })
  }
  changeNotePinned() {
    return this.notePinned = !this.notePinned
  }
  UpdateNoteComponent() {
    this.shared.sendEvent();
  }
}
