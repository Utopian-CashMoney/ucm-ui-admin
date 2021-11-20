import { Component, OnInit, setTestabilityGetter } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';
import { Title } from "@angular/platform-browser";
import { ConfirmDialogService } from '../confirmDialog/confirmDialogService.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})

export class AccountsComponent implements OnInit {
  constructor(private httpService: HttpService, private title: Title, private ConfirmDialogService: ConfirmDialogService) { }
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
  }

  deleteAccountType(id: number){
    this.httpService
    .delete('http://localhost:8081/api/accounts/' + id)
    .subscribe((response) => {
      window.location.reload();
    });
  }

  confirmationString(name: string): string {
    let message: string =
    'Are you sure you want to delete Account type: ' + name + '?';

    return message;
  }

  openConfirmationDialog(id: number, name: string) {
    this.ConfirmDialogService.confirm('Deletion Confirmation', this.confirmationString(name))
    .then((confirmed) => {
      this.deleteAccountType(id);
    });
  }

}