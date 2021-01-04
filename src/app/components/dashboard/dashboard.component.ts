import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NotesService } from 'src/app/service/notes.service';
import { SharedService } from 'src/app/service/shared/shared.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  showFiller = false;
  isButtonVisible = true;
  label = []
  notelable = []
  type = true
  isExpanded = true
  isMenuOpen = true
  contentMargin = 240;
  token = localStorage.getItem('token')
  name = localStorage.getItem('name')
  email = localStorage.getItem('email')
  constructor(private http: UserService, private noteService: NotesService, public snackBar: MatSnackBar, public route: Router, public shared: SharedService) {

  }

  ngOnInit(): void {
    this.getLable()
  }
  onToolbarMenuToggle() {
    this.isMenuOpen = !this.isMenuOpen
    if (!this.isMenuOpen) {
      this.contentMargin = 70;
    } else {
      this.contentMargin = 240;
    }
  }

  changeType() {
    this.type = !this.type
    this.shared.changeType(this.type)
  }

  logout() {
    let data = {}
    this.http.logout(data).subscribe(response => {
      if (!response) {
        this.snackBar.open("logout successfully.", 'success', { duration: 2000 })
        localStorage.clear()
        this.route.navigate(['login'])
      }
    }, error => {
      this.snackBar.open("logout unsuccessfully.", 'failed', { duration: 2000 })
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
}