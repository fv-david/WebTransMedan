import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, 
	Router, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../user/user.service';

@Injectable()
export class AdminGuardService implements CanActivate {

  constructor(private userService: UserService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  	if(this.userService.hasRole('ADMINISTRATOR')) {
  		return true;
  	}

  	console.log("role: USER");
  	this.router.navigate(['/']);
  	return false;
  }

}
