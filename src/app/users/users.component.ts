import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private httpService: HttpService) { }
  users: any;
  totalUsers= 0;

  ngOnInit(): void {
    this.loadAllUsers();
  }

  loadAllUsers() {
    this.httpService.getAll('http://localhost:8080/auth/users')
    .subscribe((res) => {
      this.users = res;
      this.totalUsers = this.users.length;
    });
  }
}
