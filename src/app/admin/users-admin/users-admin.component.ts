import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { User } from '../../services/user/user.model';
import { AlertService } from '../../services/alert/alert.service';
import { UserFull } from '../../services/user/user-full';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RolesAdminComponent } from '../roles-admin/roles-admin.component';

@Component({
  selector: 'app-users-admin',
  templateUrl: './users-admin.component.html',
  styleUrls: ['./users-admin.component.scss']
})
export class UsersAdminComponent implements OnInit {

  public users: UserFull[] = [];
  public user: User;
  
  constructor(public userService: UserService, public alertsService: AlertService, 
  	public modalService: NgbModal) { }

  ngOnInit() {
  	this.updateUserList();
  }

  updateUserList() {
  	this.userService.getAllUsers().subscribe((users: UserFull[]) => {
  		this.users = users;
  		this.users.sort((u1, u2) => u1.id - u2.id);
  	});
  }

  updateUser(user: UserFull) {
  	this.userService.updateUser(user).subscribe(() => {
  		this.alertsService.addAlert({
  			type: 'success',
  			message: 'Updated Successfully'
  		});
  		this.updateUserList();
  	});
  }

  deleteUser(id: number) {
  	this.userService.deleteUser(id).subscribe(() => {
  		this.alertsService.addAlert({
  			type: 'success',
  			message: 'Deleted Successfully'
  		});
  		this.updateUserList();
  	});
  }

  editRoles(user: UserFull) {
  	let modalRef = this.modalService.open(RolesAdminComponent, {size: 'lg'});
  	modalRef.componentInstance.userRoles = this.deepClone(user.roles).sort((r1, r2) => r1.id - r2.id);
  	modalRef.result.then((roles) => {
  		user.roles = roles;
  	});
  }

  deepClone(oldArray: Object[]) {
  	let newArray: any = [];
    oldArray.forEach((item) => {
   	  newArray.push(Object.assign({}, item));
    });
    return newArray;
  }
}
