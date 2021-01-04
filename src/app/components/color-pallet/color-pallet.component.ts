import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotesService } from '../../service/notes.service';
import { SharedService } from '../../service/shared/shared.service';

@Component({
  selector: 'app-color-pallet',
  templateUrl: './color-pallet.component.html',
  styleUrls: ['./color-pallet.component.scss']
})

export class ColorPalletComponent implements OnInit {
@Input() noteIdcard
  constructor(private noteService:NotesService,public shared:SharedService,public snackBar:MatSnackBar) { }

  ngOnInit(): void {
  }
  getColor(color){
    let noteColorData = {
      color: color,
      noteIdList: [this.noteIdcard]
    }
    this.noteService.changeNotecolor(noteColorData).subscribe(response=>{
      if (response['data'].success == true) {
        this.snackBar.open("note color changed", 'success',{duration:2000})
        console.log(response)
        this.shared.sendEvent();
      }
    },
      error => {
        this.snackBar.open("unable to change color plz try again", 'failed',{duration:2000})
      }
    )
  }
}