import { Component, OnInit } from '@angular/core';
import { NotesService } from 'src/app/service/notes.service';

@Component({
  selector: 'app-reminder-note',
  templateUrl: './reminder-note.component.html',
  styleUrls: ['./reminder-note.component.scss']
})
export class ReminderNoteComponent implements OnInit {
  note = []
  constructor(public notesService: NotesService) { }

  ngOnInit(): void {
    this.getReminder()
  }
  getReminder() {
    this.notesService.getReminderNotesList().subscribe(response => {
      for (let i = 0; i < response['data'].data.length; i++) {
        this.note.push(response['data'].data[i]);
        console.log(this.note)
      }
      this.note.reverse()
    })
  }
}