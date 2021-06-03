import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
  constructor(private httpService: HttpService) { }
  accounts: any;
  userAccounts: any;
  openUserAccountNum: any[][] = [];
  totalAccounts = 0;

  ngOnInit(): void {
    this.loadAllAccounts();
    this.findNumberOfOpenAccounts();
  }

  loadAllAccounts() {
    this.httpService
      .getAll('http://localhost:8080/api/accounts')
      .subscribe((res) => {
        this.accounts = res;
        this.totalAccounts = this.accounts.length;

      });
  }

  findNumberOfOpenAccounts() {
    this.httpService
      .getAll('http://localhost:8080/api/user_account')
      .subscribe((res) => {
        this.userAccounts = res;

        this.accounts.forEach(a => {
          var totalOpenAccounts = 0;
          this.userAccounts.forEach(u => {
            if (u.account.id == a.id)
              totalOpenAccounts++;
          })
          this.openUserAccountNum.push([a.id, totalOpenAccounts]);
        });
      });
  }
}
