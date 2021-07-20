import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';
import { Router } from '@angular/router'
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';


import {NgForm} from '@angular/forms';


@Component({
    selector: 'app-branches',
    templateUrl: './createloans.component.html',
    styleUrls: ['./createloans.component.css']
})

export class CreateLoanComponent implements OnInit {

    // firstname: any;
    // lastname: any;
    // email: any;
    // address: any;

    form: FormGroup;
    submitted = false;

    constructor(private httpService: HttpService ,private router: Router, private fb: FormBuilder) { }


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
        
        if(!this.form.errors && this.form.valid){
     
        this.httpService
            .post('http://localhost:8081/loans/createLoans', this.form.value)
            .subscribe((res) => {
                this.router.navigate(['cashmoney/admin/home'])
            });
        }

    }

    // onSubmit(f: NgForm) {
        
    //     this.httpService
    //         .post('http://localhost:8081/loans/createLoans', f.value)
    //         .subscribe((res) => {
    //             this.router.navigate(['cashmoney/admin/home'])
    //         });

    // }

}