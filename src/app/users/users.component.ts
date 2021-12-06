import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';
import { Router } from '@angular/router';
import { Title } from "@angular/platform-browser";


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  constructor(private httpService: HttpService,  private router: Router, private title: Title) { }
  users: any;
  id:any;
  username:any;
  firstName:any;
  lastName:any;
  email:any;
  password:any;
  phNum:any;
  address:any;
  city:any;
  state:any;
  zipcode:any;
  isActive:any;

  totalUsers= 0;

  ngOnInit(): void {
    this.title.setTitle('Users');
    this.loadAllUsers();
  }

  loadAllUsers() {
    this.httpService.getAll('http://localhost:8000/api/users')
    .subscribe((res) => {
      this.users = res;
      this.totalUsers = this.users.length;
    });
  }

  onEdit(id, username, firstName, lastName, email, password, phNum, address, city, state, zipcode, isActive) {


    this.router.navigate(['cashmoney/admin/edit_user'], { state: {id: id, username: username,
    firstName: firstName, lastName: lastName, email: email, password: password, phNum: phNum, address: address, city: city, state: state, zipcode: zipcode, isActive: isActive} });

    
  }



}
