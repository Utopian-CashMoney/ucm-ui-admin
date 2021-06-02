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
  totalAccounts = 0;

  ngOnInit(): void {
    this.loadAllAccounts();
  }

  loadAllAccounts() {
    this.httpService
    .getAll('http://localhost:8080/api/accounts')
      .subscribe((res) => {
        this.accounts = res;
        this.totalAccounts = this.accounts.length;
      });
  }
}
