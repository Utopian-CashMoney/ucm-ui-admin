import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmDialogService } from '../confirmDialog/confirmDialogService.service';

import {NgForm} from '@angular/forms';


@Component({
    selector: 'app-cards',
    templateUrl: './createCard.component.html',
    styleUrls: ['./createCard.component.css']
})

export class CreateCardComponent implements OnInit {

    form: FormGroup;
    submitted = false;
    result: string = '';


    constructor(private httpService: HttpService ,private router: Router, private fb: FormBuilder,
      private ConfirmDialogService: ConfirmDialogService) { 
    
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

    public openConfirmationDialog() {

      const cardType = JSON.stringify(this.form.value.type).replace(/\"/g, "");  
      const cardName = JSON.stringify(this.form.value.name).replace(/\"/g, "");  
      const cardAPR = JSON.stringify(this.form.value.apr).replace(/\"/g, "");  
      const cardPerks = JSON.stringify(this.form.value.perks).replace(/\"/g, "");  

   
      this.ConfirmDialogService.confirm('Please confirm..', 'Do you want to go ahead and create the card with ' + 'card type "' + cardType +
      '", name of the card being "' + cardName + '", APR of ' + cardAPR + '% and ' + 'perks being: ' + cardPerks)      
      .then((confirmed) => {
           if (confirmed) {
             this.onSubmit();
           }
         })
         .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
   
     }


}