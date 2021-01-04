import { Component, Input, OnInit } from '@angular/core';
import { NotesService } from 'src/app/service/notes.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogNoteComponent } from '../dialog-note/dialog-note.component';
import { SharedService } from '../../service/shared/shared.service'
import { Subscription } from "rxjs"
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-get-note',
  templateUrl: './get-note.component.html',
  styleUrls: ['./get-note.component.scss']
})

export class GetNoteComponent implements OnInit {
  @Input() note
  pinnedNote = []
  unPinnedNote = []
  notelable = []
  pin: boolean
  nonoteCondition = false
  label = []
  removable = true;
  labelName
  clickEventSubscription: Subscription;
  activePin: boolean;
  hoverIndexPin = -1
  hoverIndexunPin = -1
  hoverIndexUnPin: any;
  type: boolean = true
  constructor(private noteService: NotesService, public dialog: MatDialog, public shared: SharedService, public snackBar: MatSnackBar, public route: ActivatedRoute) {
    this.shared.styleType.subscribe(type => this.type = type)
    console.log(this.type)
    this.clickEventSubscription = this.shared.getEvent().subscribe(() => {
      this.ngOnInit()
    })
  }

  ngOnInit(): void {
    this.getNote()
    this.getLable()
  }

  getNote() {
    this.labelName = null
    this.labelName = this.route.snapshot.paramMap.get('label')
    if (this.route.snapshot.url[0].path.includes('note')) {
      this.note = []
    }
    this.noteService.getNotes().subscribe(response => {
      for (let i = 0; i < response['data'].data.length; i++) {
        if (response['data'].data[i].isDeleted || response['data'].data[i].isArchived) { }
        else {
          if (this.labelName != null) {
            for (let j = 0; j < response['data'].data[i].noteLabels.length; j++) {
              if (response['data'].data[i].noteLabels[j].label === this.labelName) {
                this.note.push(response['data'].data[i]);
              }
            }
          } else {
            if (this.route.snapshot.url[0].path.includes('note')) {
              this.note.push(response['data'].data[i]);
            }
          }
        }
      }
      this.note.reverse()
      this.pinnedNote = []
      this.unPinnedNote = []
      this.note.forEach(element => {
        if (element.isPined) {
          this.pinnedNote.push(element)
        } else {
          this.unPinnedNote.push(element)
        }
      });
    })
  }
  getLable() {
    this.noteService.getNotes().subscribe(response => {
      for (let i = 0; i < response['data'].data.length; i++) {
        if (response['data'].data[i].isDeleted || response['data'].data[i].isArchived) { }
        else {
          this.notelable.push(response['data'].data[i]);
        }
      }
      this.notelable.forEach(element => {
        for (let i = 0; i < element.noteLabels.length; i++)
          this.label.push(element.noteLabels[i].label)
      });
      function onlyUnique(value, index, self) {
        return self.indexOf(value) === index
      }
      this.label = this.label.filter(onlyUnique)
      console.log(this.label)
    })
  }

  onHover(i) {
    this.hoverIndexPin = i
  }

  onHoverPin(i) {
    this.hoverIndexUnPin = i
  }

  noNote() {
    return (this.note.length == 0) ? this.nonoteCondition = true : this.nonoteCondition = false;
  }

  openDialog(title, description, id) {
    this.dialog.open(DialogNoteComponent, { data: { title: title, description: description, id: id } });
  }

  removeLable(note): void {
    this.note.forEach(element => {
      const index = element.noteLabels.indexOf(note);
      if (index >= 0) {
        console.log(element.noteLabels[index].id)
        this.noteService.deleteNoteLable(element.id, element.noteLabels[index].id).subscribe(response => {
          this.snackBar.open("note label deleted", 'success', { duration: 2000 })
        },
          error => {
            this.snackBar.open("unable to delete label", 'failed', { duration: 2000 })
          })
        element.noteLabels.splice(index, 1);
      }
    });
  }

  removeReminder(index): void {
    console.log(index)
    let noteData = {
      reminder: [],
      noteIdList: [index]
    }
    this.noteService.removeReminder(noteData).subscribe(response => {
      console.log(response)
      if (response['data'].success == true) {
        this.snackBar.open("reminder  deleted", 'success', { duration: 2000 })
        console.log(response)
        this.shared.sendEvent();
      }
      else {
        this.snackBar.open("reminder unable to delete", 'failed', { duration: 2000 })
      }
    })
  }

  addPin(index) {
    let noteData = {
      isPined: !this.pin,
      noteIdList: [index]
    }
    this.noteService.pinNote(noteData).subscribe(response => {
      if (response['data'].success == true) {
        this.snackBar.open("note pinned successfully", 'success', { duration: 2000 })
        this.shared.sendEvent()
      }
    },
      error => {
        this.snackBar.open("unable to pin note plz try again", 'failed', { duration: 2000 })
      })
  }

  deleteForever(id: string, index) {
    let noteData = {
      isDeleted: true,
      noteIdList: [id]
    }
    this.noteService.deleteNoteForever(noteData).subscribe(response => {
      if (response['data'].success == true) {
        this.snackBar.open("note deleted successfully", 'success', { duration: 2000 })
        this.note.splice(index, 1);
        this.shared.sendEvent();
      }
    },
      error => {
        this.snackBar.open("unable to delete plz try again", 'failed', { duration: 2000 })
      })
  }

  restoreDelete(id: string, index) {
    let noteData = {
      isDeleted: false,
      noteIdList: [id]
    }
    this.noteService.deleteNote(noteData).subscribe(response => {
      if (response['data'].success == true) {
        this.snackBar.open("note restored successfully", 'success', { duration: 2000 })
        this.note.splice(index, 1);
        this.shared.sendEvent();
      }
    },
      error => {
        this.snackBar.open("unable to restore plz try again", 'failed', { duration: 2000 })
      })
  }

  unArchive(id: string, index) {
    let noteData = {
      isArchived: false,
      noteIdList: [id]
    }
    this.noteService.archiveNote(noteData).subscribe(response => {
      if (response) {
        this.snackBar.open("note unarchive successfully", 'success', { duration: 2000 })
        this.note.splice(index, 1);
        this.shared.sendEvent();
      }
    },
      error => {
        this.snackBar.open("unable to unarchive note plz try again", 'failed', { duration: 2000 })
      })
  }
}