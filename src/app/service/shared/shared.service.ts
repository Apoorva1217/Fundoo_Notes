import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private subject = new Subject<any>();
  private data = new BehaviorSubject([]);
  private type = new BehaviorSubject(true);
  dataArray = this.data.asObservable();
  styleType = this.type.asObservable();
  
  constructor() { }
  sendEvent() {
    this.subject.next();
  }
  getEvent(): Observable<any> {
    return this.subject.asObservable();
  }
  change(array: Array<any>) {
    this.data.next(array)
  }
  changeType(type: boolean) {
    this.type.next(type)
  }
}

