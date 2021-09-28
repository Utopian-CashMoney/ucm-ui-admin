// import { Component, OnInit } from '@angular/core';
// import { HttpService } from 'src/app/shared/services/http.service';
// import { Router } from '@angular/router'
// import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ConfirmDialogService } from '../confirmDialog/confirmDialogService.service';

// import {NgForm} from '@angular/forms';


// @Component({
//     selector: 'app-branches',
//     templateUrl: './createloans.component.html',
//     styleUrls: ['./createloans.component.css']
// })

// export class CreateLoanComponent implements OnInit {

//     // firstname: any;
//     // lastname: any;
//     // email: any;
//     // address: any;

//     form: FormGroup;
//     submitted = false;
//     result: string = '';
//     confirmationDialogService: ConfirmDialogService;

//     constructor(private httpService: HttpService ,private router: Router, private fb: FormBuilder) { }

//     ngOnInit(): void {

//         this.form = this.fb.group(
//             {
//               max_amount: ['', Validators.required],
//               name: ['', Validators.required],
//               interest_rate: ['', [Validators.required]],
//             },
//           );

//     }

//     get f(): { [key: string]: AbstractControl } {
//         return this.form.controls;
//       }

//       onReset(): void {
//         this.submitted = false;
//         this.form.reset();
//       }

//       public openConfirmationDialog() {
//         this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to ... ?')
//         .then((confirmed) => console.log('User confirmed:', confirmed))
//         .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
//       }


//       onSubmit() {
//        // this.openConfirmationDialog();
//         this.submitted = true;

//         if(!this.form.errors && this.form.valid){

//         this.httpService
//             .post('http://localhost:8081/loans/createLoans', this.form.value)
//             .subscribe((res) => {
//                 this.router.navigate(['cashmoney/admin/home'])
//             });
//         }

//     }

//     // onSubmit(f: NgForm) {

//     //     this.httpService
//     //         .post('http://localhost:8081/loans/createLoans', f.value)
//     //         .subscribe((res) => {
//     //             this.router.navigate(['cashmoney/admin/home'])
//     //         });

//     // }

// }

import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';
import { Router } from '@angular/router'
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ConfirmDialogService } from '../confirmDialog/confirmDialogService.service';

@Component({
  selector: 'app-loans',
  templateUrl: './createloans.component.html',
  styleUrls: ['./createloans.component.css']
})


export class CreateLoanComponent {

  constructor(private httpService: HttpService, private router: Router, private fb: FormBuilder,
    private ConfirmDialogService: ConfirmDialogService) { }


  form: FormGroup;
  submitted = false;
  result: string = '';

  ngOnInit(): void {

    this.form = this.fb.group(
      {
        max_amount: ['', Validators.required],
        name: ['', Validators.required],
        interest_rate: ['', [Validators.required]],
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

    if (!this.form.errors && this.form.valid) {

      this.httpService
        .post('http://localhost:8081/loans/createLoans', this.form.value)
        .subscribe((res) => {
          this.router.navigate(['cashmoney/admin/home'])
        });
    }
  }

  public openConfirmationDialog() {

   const maxAmount = JSON.stringify(this.form.value.max_amount).replace(/\"/g, "");  
   const loanName = JSON.stringify(this.form.value.name).replace(/\"/g, "");  
   const loanRate = JSON.stringify(this.form.value.interest_rate).replace(/\"/g, "");  

   this.ConfirmDialogService.confirm('Please confirm..', 'Do you want to go ahead and create the loan with ' + 'max amount of $' + maxAmount +
   ', name of the loan being "' + loanName + '" and interest rate of ' + loanRate + '% ?' )      
   .then((confirmed) => {
        if (confirmed) {
          this.onSubmit();
        }
      })
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));

  }

}

