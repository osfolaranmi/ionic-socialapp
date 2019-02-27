import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { post } from 'selenium-webdriver/http';

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {

  postID: string
  post

  heartType: string = "heart-empty"

  constructor(private route: ActivatedRoute, private afs: AngularFirestore) {
    
   }

  ngOnInit() {
    this.postID = this.postID = this.route.snapshot.paramMap.get('id')
    this.post = this.afs.doc(`posts/${this.postID}`).valueChanges()
  }

  toggleHeart() {
    this.heartType = this.heartType == "heart" ? "heart-empty" : "heart"
  }

}
