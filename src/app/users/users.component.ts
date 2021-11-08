import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  // <td>{{ u.id }}</td>
  // <td>{{ u.username }}</td>
  // <td>{{ u.lastName }}, {{ u.firstName }}</td>
  // <td>{{ u.email }}</td>
  // <td>{{ u.phNum }}</td>
  // <td>{{ u.isActive == true ? "ACTIVE" : "INACTIVE" }}</td>


  constructor(private httpService: HttpService,  private router: Router) { }
  users: any;
  id:any;
  username:any;
  firstName:any;
  lastName:any;
  email:any;
  password: any;
  phNum:any;
  address:any;
  city:any;
  state:any;
  zipcode:any;
  isActive:any;

  totalUsers= 0;

  ngOnInit(): void {
    this.loadAllUsers();
  }

  loadAllUsers() {
    this.httpService.getAll('http://localhost:8000/auth/users')
    .subscribe((res) => {
      this.users = res;
      this.totalUsers = this.users.length;
    });
  }

  onEdit(id, username, firstName, lastName, email, password, phNum, address, city, state, zipcode, isActive) {


    this.router.navigate(['cashmoney/admin/edit_user'], { state: {id: id, username: username,
    firstName: firstName, lastName: lastName, email: email, password: password, phNum: phNum, address: address, city: city, state: state, zipcode: zipcode, isActive: isActive} });

    
  }

  onAdd() {


    this.router.navigate(['cashmoney/admin/add_user']); 
  }



}
