import { UserService } from './user.service';
import { Injectable } from '@angular/core'
import { Router, CanActivate } from '@angular/router';



@Injectable()
export class AuthService implements CanActivate {
    
    constructor(private router: Router, private user: UserService) {

    }

    async canActivate(route) {
        if(await this.user.isAuthenticated()){
            return true
        }

        this.router.navigate(['/login'])
        return false
    }
}