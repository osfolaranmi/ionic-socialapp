import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore'

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  username: string = ""
  password: string = ""
  cpassword: string = ""

  constructor(
    public afStore: AngularFirestore, 
    public afAuth: AngularFireAuth, 
    public alert: AlertController, 
    public user: UserService,
    public route: Router) { }

  ngOnInit() {
  }

  async register(){
    const { username, password, cpassword } = this
    if(password !== cpassword) {
      this.showAlert("Error!", "Password doesn't match")
      return console.error("Password doesn't match")
    }

    try{
      const res = await this.afAuth.auth.createUserWithEmailAndPassword(username + '@gmail.com',password)
      console.log(res)

      this.afStore.doc(`users/${res.user.uid}`).set({
        username
      })

      this.user.setUser({
        username,
        uid: res.user.uid
      })

      this.showAlert("Success!", "You are registered")
       this.route.navigate(['/tabs'])
    }
    catch(err){
      console.dir(err)
      this.showAlert("Error", err.message)
    }
  }

  async showAlert(title: string, content: string) {
    const alert = await this.alert.create({
      header: title,
      message: content,
      buttons: ["Dismiss"]
    })

    await alert.present()
  }
}
