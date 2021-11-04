import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private httpService: HttpService, private title: Title) { }
  username: string = "Admin"; //Hardcoded until admin login is implemented
  temp: any;
  totalUsers = 0;
  totalAccounts = 0;
  totalDebit = 0;
  totalCredit = 0;
  totalLoans = 0;
  totalBranches = 0;

  ngOnInit(): void {
    this.title.setTitle('Dashboard');
    this.loadTotals();
  }

  loadTotals() {
    this.httpService
      .getAll('http://localhost:8000/auth/users')
      .subscribe((response) => {
        this.temp = response;
        this.totalUsers = this.temp.length;
      });

    this.httpService
      .getAll('http://localhost:8081/api/user_account')
      .subscribe((response) => {
        this.temp = response;
        this.totalAccounts = this.temp.length;
      });

      this.httpService
      .getAll('http://localhost:8081/api/debitcards')
      .subscribe((response) => {
        this.temp = response;
        this.totalDebit = this.temp.length;
      });

      this.httpService
      .getAll('http://localhost:8081/api/creditcards')
      .subscribe((response) => {
        this.temp = response;
        this.totalCredit = this.temp.length;
      });

      this.httpService
      .getAll('http://localhost:8081/api/loans')
      .subscribe((response) => {
        this.temp = response;
        this.totalLoans = this.temp.length;
      });

      this.httpService
      .getAll('http://localhost:8010/api/branches')
      .subscribe((response) => {
        this.temp = response;
        this.totalBranches = this.temp.length;
      });

  }

}
