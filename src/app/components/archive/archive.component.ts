import { Component, OnInit } from '@angular/core';
import { NotesService } from 'src/app/service/notes.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit {
  note = []
  nonoteCondition = false
  hoverIndex = -1
  constructor(private notesService: NotesService) { }

  ngOnInit(): void {
    this.getArchiveNote()
  }
  getArchiveNote(){
    this.notesService.getArchiveNote().subscribe(response => {
      for (let i = 0; i < response['data'].data.length; i++) {
        this.note.push(response['data'].data[i]);
      }
      this.note.reverse()
    })
  }
}