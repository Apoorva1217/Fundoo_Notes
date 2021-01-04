import { Component, OnInit } from '@angular/core';
import { NotesService } from 'src/app/service/notes.service';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss']
})
export class TrashComponent implements OnInit {
  note = []
  constructor(private notesService: NotesService) { }

  ngOnInit(): void {
    this.getArchive()
  }
  getArchive() {
    this.notesService.getTrashNote().subscribe(response => {
      for (let i = 0; i < response['data'].data.length; i++) {
        this.note.push(response['data'].data[i]);
      }
      this.note.reverse()
    })
  }
}
