import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotesService } from 'src/app/service/notes.service';
import { SharedService } from 'src/app/service/shared/shared.service';

@Component({
  selector: 'app-card-pannel',
  templateUrl: './card-pannel.component.html',
  styleUrls: ['./card-pannel.component.scss']
})


export class CardPannelComponent implements OnInit {
  @Input() noteId
  @Input() labelArray
  @Input() noteArray

  labelName = new FormControl("")
  label = this.labelName.value
  reminder

  constructor(private noteService: NotesService, public snackBar: MatSnackBar, private shared: SharedService) {
  }

  ngOnInit(): void {
  }

  trashNote() {
    let noteData = {
      isDeleted: true,
      noteIdList: [this.noteId]
    }
    this.noteService.deleteNote(noteData).subscribe(response => {
      if (response['data'].success == true) {
        this.snackBar.open("note moved to bin", 'success',{duration:2000})
        console.log(response)
        this.shared.sendEvent();
      }
    },
      error => {
        this.snackBar.open("unable to move to trash plz try again", 'failed',{duration:2000})
      }
    )
  }

  archiveNote() {
    let noteData = {
      isArchived: true,
      noteIdList: [this.noteId]
    }
    this.noteService.archiveNote(noteData).subscribe(response => {
      if (response['data'].success == true) {
        this.snackBar.open("note moved to archive", 'success',{duration:2000})
        console.log(response)
        this.shared.sendEvent();
      }
    },
      error => {
        this.snackBar.open("unable to move to archive plz try again", 'failed',{duration:2000})
      }
    )
  }

  addNoteLable() {
    console.log(this.label.value)
    if (this.labelName.value) {
      this.label = this.labelName.value
    }
    let lableData = {
      label: this.label,
      isDeleted: false
    }
    this.noteService.addNoteLable(lableData, this.noteId).subscribe(response => {
      if (response) {
        this.snackBar.open("note lable  added", 'success',{duration:2000})
        this.shared.sendEvent();
        this.shared.getEvent()
      }
    },
      error => {
        this.snackBar.open("unable to add to note lable plz try again", 'failed',{duration:2000})
      }
    )
  }

  setLabelName(labelName) {
    console.log(labelName)
    this.label = labelName
  }

  setReminder(value) {
    let date: Date = new Date()
    if (value == "today") {
      date.setHours(20)
      this.reminder = date.toUTCString() 
    }
    if (value == "tomorrow") {
      date.setDate(date.getDate() + 1);
      date.setHours(20)
      this.reminder = date.toUTCString()
    }
    if (value == "next") {
      date.setDate(date.getDate() + (1 + 7 - date.getDay()) % 7)
      this.reminder = date.toUTCString()
    } 
  }
  
  setReminderToCard() {
    let noteData = {
      reminder: [this.reminder],
      noteIdList: [this.noteId]
    }
    this.noteService.addReminder(noteData).subscribe(response => {
      console.log(response)
      if (response['data'].success == true) {
        this.snackBar.open("reminder  added", 'success',{duration:2000})
        console.log(response)
        this.shared.sendEvent();
      }
      else {
        this.snackBar.open("reminder unable to add", 'failed',{duration:2000})
      }
    })
  }
}