import { Component, Inject, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserService } from 'src/app/service/user.service';
import {User} from './user.interface';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  usersServices: User[] = [];
  users: User[] = [];
  user: User = {
    id: 0,
    login: '',
    type: '',
  }

  private ngProcessosUnsubscribe = new Subject();

  displayedColumns: string[] = ['id', 'name', 'login'];
  dataSource = this.usersServices;

  @Input() login: string  = '';
  @Input() type: string  = '';

  constructor(private userService: UserService, public dialog: MatDialog ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userService
      .getUsers()
      .pipe(takeUntil(this.ngProcessosUnsubscribe))
      .subscribe((users) => {
        console.log(users);
        const data = users;
        this.usersServices = JSON.parse(JSON.stringify(data));
        this.users = [];
        this.users = this.usersServices.slice(15);
      });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(UserModalComponent, {
      width: '250px',
      data: {login: '', type: ''}
    });

    dialogRef.afterClosed().subscribe(result => {
      const user = result;

    });
  }
}

@Component({
  selector: 'User-Modal-Component',
  templateUrl: '../modal/modal.html',
})
export class UserModalComponent {

  constructor(
    public dialogRef: MatDialogRef<UserModalComponent>, @Inject(MAT_DIALOG_DATA) public user: User) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  public getUser(): User
  {
return this.user;


}

}
