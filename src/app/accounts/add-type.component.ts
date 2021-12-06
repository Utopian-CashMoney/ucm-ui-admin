import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmDialogService } from '../confirmDialog/confirmDialogService.service';

@Component({
  selector: 'app-add-type',
  templateUrl: './add-type.component.html',
  styleUrls: ['./add-type.component.css']
})
export class AddTypeComponent implements OnInit {

  form: FormGroup;
  displayCredit = true;
  submitted = false;
  inputCheck = false;

  constructor(private httpService: HttpService, private router: Router, private fb: FormBuilder,
    private ConfirmDialogService: ConfirmDialogService) {

  }

  ngOnInit(): void {
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

  onSubmit() {
    this.submitted = true;
    this.httpService
      .post('http://localhost:8081/api/accounts', this.form.value)
      .subscribe((res) => {
        this.router.navigate(['cashmoney/admin/accounts'])
      });
    window.location.reload();
  }

  confirmationString(): string {
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

  public openConfirmationDialog() {
    if (!this.form.errors && this.form.valid) {
      this.ConfirmDialogService.confirm('Confirm New Account Type' , this.confirmationString())
        .then((confirmed) => {
          if (confirmed) {
            this.onSubmit();
          }
        })
        .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
    }
    else
      console.log("There are errors with the form");
  }
}
