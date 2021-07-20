import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import {NgForm} from '@angular/forms';


@Component({
    selector: 'app-branches',
    templateUrl: './createCard.component.html',
    styleUrls: ['./createCard.component.css']
})

export class CreateCardComponent implements OnInit {

    form: FormGroup;
    submitted = false;

    constructor(private httpService: HttpService ,private router: Router, private fb: FormBuilder) { 
    
    }

    ngOnInit(): void {

        this.form = this.fb.group(
            {
              type: ['', Validators.required],
              name: ['', Validators.required],
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
        
        if(!this.form.errors && this.form.valid){
        this.httpService
            .post('http://localhost:8081/cards/create_card',this.form.value)
            .subscribe((res) => {
                this.router.navigate(['cashmoney/admin/home'])
            });
        }

    }


}