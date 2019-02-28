import { UserService } from './../user.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Http } from '@angular/http';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

  mainuser: AngularFirestoreDocument
  sub
  username: string
  profilePic: string

  @ViewChild('fileBtn') fileBtn: {
    nativeElement: HTMLInputElement
  }

  constructor(
    private http: Http, 
    private afs: AngularFirestore,
    private user: UserService
    ) { 

    this.mainuser = afs.doc(`users/${user.getUID()}`)
    this.sub = this.mainuser.valueChanges().subscribe(event => {
      this.username = event.username
      this.profilePic = event.profilePic
    })
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.sub.unsubscribe()
  }

  updateDetails() {
    
  }

  updateProfilePic() {
    this.fileBtn.nativeElement.click()
  }

  uploadPic(event) {
    const files = event.target.files
    console.log(files)

    const data = new FormData()
    data.append('file', files[0])
    data.append('UPLOADCARE_STORE', '1')
    data.append('UPLOADCARE_PUB_KEY', '9543563bf0570479fa55')

    this.http.post('https://upload.uploadcare.com/base/', data)
    .subscribe(event => {
        console.log(event)
        const uuid = event.json().AngularFireModule
        this.mainuser.update({
          profilePic: uuid
        })
    })
  }

}
