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
  submitted = false;

  constructor(private httpService: HttpService, private router: Router, private fb: FormBuilder,
    private ConfirmDialogService: ConfirmDialogService) {
    
  }

  ngOnInit(): void {
    this.form = this.fb.group(
      {
        type: [''],
        name: ['', Validators.required],
        creditLimit: ['', Validators.required],
        apr: ['', [Validators.required]],
        perks: ['', [Validators.required]],
      },
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }

onSubmit() {
  
    this.submitted = true;
    console.log("Type: " + this.form.value.type);
    if(!this.form.errors && this.form.valid){
    this.httpService
        .post('http://localhost:8081/api/accounts', this.form.value)
        .subscribe((res) => {
            this.router.navigate(['cashmoney/admin/accounts'])
        });
    }
    else
      console.log("Form has errors or is invalid.");

}

public openConfirmationDialog() {

  const accountType = JSON.stringify(this.form.value.type).replace(/\"/g, "");  
  const accountName = JSON.stringify(this.form.value.name).replace(/\"/g, "");
  const accountLimit = JSON.stringify(this.form.value.creditLimit).replace(/\"/g, "");  
  const accountAPR = JSON.stringify(this.form.value.apr).replace(/\"/g, "");  
  const accountPerks = JSON.stringify(this.form.value.perks).replace(/\"/g, "");  


  this.ConfirmDialogService.confirm('Please confirm...', 'Do you want to go ahead and create an account type with ' + ' type:"' + accountType +
  '", name: "' + accountName + ', credit limit: $' + accountLimit + '", APR: ' + accountAPR + '%, ' + 'perks: ' + accountPerks + '?')      
  .then((confirmed) => {
       if (confirmed) {
         this.onSubmit();
       }
     })
     .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
 }

}
