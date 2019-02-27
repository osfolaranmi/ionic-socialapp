import { UserService } from './../user.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  userPosts

  constructor(private router: Router, private user: UserService, private afs: AngularFirestore) {
      const posts = afs.doc(`users/${user.getUID()}`)
      this.userPosts = posts.valueChanges()
  }

  goTo(postID: string){
      this.router.navigate(['/tabs/post/' + postID])
  }

  ngOnInit() {
  }

}
