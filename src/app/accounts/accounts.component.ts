import { Component, OnInit, setTestabilityGetter } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';
import { Title } from "@angular/platform-browser";
import { ConfirmDialogService } from '../confirmDialog/confirmDialogService.service';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})

export class AccountsComponent implements OnInit {
  constructor(private httpService: HttpService, private router: Router, private title: Title, private fb: FormBuilder, private ConfirmDialogService: ConfirmDialogService) { }
  accounts: any;
  userAccounts: any;
  totalAccounts = 0;
  totalUserAccounts = 0;

  form: FormGroup;
  displayCredit = true;
  submitted = false;
  inputCheck = false;

  ngOnInit(): void {
    this.title.setTitle('Accounts');
    this.loadAllAccountTypes();
    this.loadAllAccounts();

    this.form = this.fb.group(
      {
        type: [ 'CREDIT', Validators.required],
        name: ['', Validators.required],
        perks: ['', [Validators.required]],
        creditLimit: ['', Validators.required],
        apr: ['', [Validators.required]],
      },
    );
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

  deleteAccountType(id: number) {
    this.httpService
    .delete('http://localhost:8081/api/accounts/' + id)
    .subscribe((response) => {
      window.location.reload();
    });
  }

  editConfirmationString(): string {
    const accountType = JSON.stringify(this.form.value.type).replace(/\"/g, "");
    const accountName = JSON.stringify(this.form.value.name).replace(/\"/g, "");
    const accountLimit = JSON.stringify(this.form.value.creditLimit).replace(/\"/g, "");
    const accountAPR = JSON.stringify(this.form.value.apr).replace(/\"/g, "");
    const accountPerks = JSON.stringify(this.form.value.perks).replace(/\"/g, "");

    let message: string = 
    `Type: ${accountType} 
    Name: ${accountName}  
    Credit Limit: ${accountLimit} 
    APR: ${accountAPR}  
    Description: ${accountPerks}`;

    return message;
  }

  deleteConfirmationString(name: string): string {
    let message: string =
    'Are you sure you want to delete Account type: ' + name + '?';

    return message;
  }

  openEditConfirmationDialog(id: number) {
    this.ConfirmDialogService.confirm('Edit Confirmation', this.editConfirmationString())
    .then((confirmed) => {
      this.onSubmit(id);
    });
  }

  openDeleteConfirmationDialog(id: number, name: string) {
    this.ConfirmDialogService.confirm('Deletion Confirmation', this.deleteConfirmationString(name))
    .then((confirmed) => {
      this.deleteAccountType(id);
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  showCredit() {
    if (!this.displayCredit) {
      this.displayCredit = true;
      this.form.value.creditLimit = null;
      this.form.value.apr = null;
    }
  }

  hideCredit() {
    if (this.displayCredit) {
      this.displayCredit = false;
      this.form.value.creditLimit = 0;
      this.form.value.apr = 0;
    }
    console.log(
      `After hideCredit()
      Type: ${this.form.value.type} 
      Name: ${this.form.value.name}  
      Credit Limit: ${this.form.value.creditLimit} 
      APR: ${this.form.value.apr}  
      Description: ${this.form.value.perks}`);
  }

  onReset(): void {
    this.form.reset()
    this.submitted = false;
    this.inputCheck = false;
    this.showCredit();
  }

  checkInput() {
    this.inputCheck = true;
    console.log(
    `Type: ${this.form.value.type} 
    Name: ${this.form.value.name}  
    Credit Limit: ${this.form.value.creditLimit} 
    APR: ${this.form.value.apr}  
    Description: ${this.form.value.perks}`);
  }

  onSubmit(id: number) {
    this.submitted = true;
    this.httpService
      .put('http://localhost:8081/api/accounts/' + id, this.form.value)
      .subscribe((res) => {
        this.router.navigate(['cashmoney/admin/accounts'])
      });
    window.location.reload();
  }

}