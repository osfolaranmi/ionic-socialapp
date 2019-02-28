import { UserService } from './../user.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  mainuser: AngularFirestoreDocument
  userPosts
  sub
  posts: string
  username: string
  profilePic: string

  constructor(private router: Router, private user: UserService, private afs: AngularFirestore) {
      this.mainuser = afs.doc(`users/${user.getUID()}`)
      this.sub = this.mainuser.valueChanges().subscribe(event => {
        this.posts = event.posts
        this.username = event.username
        this.profilePic = event.profilePic
      })
  }

ngOnDestroy() {
  this.sub.unsubscribe()
}

  goTo(postID: string){
      this.router.navigate(['/tabs/post/' + postID.split('/')[0]])
  }

  ngOnInit() {
  }

}
