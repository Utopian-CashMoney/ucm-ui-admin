import { Component, OnInit, setTestabilityGetter } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})

export class AccountsComponent implements OnInit {
  constructor(private httpService: HttpService, private title: Title) { }
  accounts: any;
  userAccounts: any;
  totalAccounts = 0;
  totalUserAccounts = 0;
  
  ngOnInit(): void {
    this.title.setTitle('Accounts');
    this.loadAllAccountTypes();
    this.loadAllAccounts();
  }

  loadAllAccountTypes() {
    this.httpService
      .getAll('http://localhost:8081/api/accounts')
      .subscribe((res) => {
        this.accounts = res;
        this.totalAccounts = this.accounts.length;
      });
  }

  loadAllAccounts() {
    this.httpService
    .getAll('http://localhost:8081/api/user_account')
    .subscribe((response) => {
      this.userAccounts = response;
      this.totalUserAccounts = this.userAccounts.length;
    });
}}
