import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { NotesService } from 'src/app/service/notes.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SharedService } from 'src/app/service/shared/shared.service';
@Component({
  selector: 'app-dialog-note',
  templateUrl: './dialog-note.component.html',
  styleUrls: ['./dialog-note.component.scss']
})
export class DialogNoteComponent implements OnInit {
  title
  description
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public noteService: NotesService, public snackBar: MatSnackBar,
    private shared: SharedService) { }

  ngOnInit(): void {
  }
  changeDesc(value) {
    this.description = value
  }
  changeTitle(value) {
    this.title = value
  }
  updateNote() {
    let noteData = {
      "noteId": this.data.id,
      "title": this.title,
      "description": this.description
    }
    this.noteService.updateNote(noteData).subscribe(response => {
      if (response['data'].success == true) {
        console.log(response)
        this.snackBar.open("note added successfully", 'success', { duration: 2000 })
      }
    },
      error => {
        console.log(error)
        this.snackBar.open("unable to add plz try again", 'failed', { duration: 2000 })
      }
    )
  }
  UpdateNoteComponent() {
    this.shared.sendEvent();
  }
}
