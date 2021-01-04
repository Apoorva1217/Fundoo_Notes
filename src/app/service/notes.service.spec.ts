import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { NotesService } from './notes.service';

fdescribe('NotesService', () => {
  let service: NotesService;
  let httpmock: HttpTestingController
  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(NotesService);
    httpmock = TestBed.get(HttpTestingController)
  });
  afterEach(() => {
    httpmock.verify()
  })
  it('retrive data', () => {
    const dummyPost = [
      {
        title: "hg;hgh;g",
        description: "fdfdfdfd",
        isPined: false,
        isArchived: true,
        isDeleted: false,
        reminder: [],
        createdDate: "2020-10-29T14:41:37.079Z",
        modifiedDate: "2020-10-29T14:41:37.079Z",
        color: "#aecbfa",
        label: [],
        imageUrl: "",
        linkUrl: "",
        collaborators: [],
        id: "5f9ad4a1beb12f0022223a2c",
        userId: "5f984ef6beb12f0022223a03",
        collaberator: [],
        noteCheckLists: [],
        noteLabels: [
          {
            label: "2020",
            isDeleted: false,
            id: "5fac1a8ad5d3de001e5d8111"
          }
        ],
        questionAndAnswerNotes: [],
        user: {
          firstName: "himnhu",
          lastName: "gharat",
          role: "user",
          service: "advance",
          createdDate: "2020-10-27T16:46:46.205Z",
          modifiedDate: "2020-10-27T16:46:46.205Z",
          username: "car@llubed.com",
          email: "car@llubed.com",
          emailVerified: true,
          id: "5f984ef6beb12f0022223a03"
        }
      }]
    service.getNotes().subscribe((note) => {
      expect(note).toBe(dummyPost)
    })
    const req = httpmock.expectOne(`${service._url}getNotesList`)
    expect(req.request.method).toBe('GET')
    req.flush(dummyPost);
  });
 
});
