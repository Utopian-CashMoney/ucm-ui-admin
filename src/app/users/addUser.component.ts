import { Component, OnInit } from "@angular/core";
import { HttpService } from 'src/app/shared/services/http.service';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'


@Component({
    selector: 'app-addUser',
    templateUrl: './addUser.component.html',
    styleUrls: ['./addUser.component.css']
  })

export class AddUserComponent implements OnInit {

    constructor(private httpService: HttpService, private router: Router, private fb: FormBuilder) { }
    users: any;
    id:any;
    username:any;
    first_name:any;
    last_name:any;
    email:any;
    password:any;
    phone:any;
    address:any;
    city:any;
    state:any;
    zipcode:any;
    is_active:any;
    errors:any;
    addForm: FormGroup;
    submitted = false;
    result: string = '';

    userId = '';
    userUserName = '';
    userFirstName = '';
    userLastName = '';
    userEmail = '';
    userPassword = '';
    userPhNum = '';
    userAddress = '';
    userCity = '';
    userState = '';
    userZipcode = '';
    userIsActive = '';



    ngOnInit(): void {

      this.addForm = this.fb.group({
        id:[{value: this.userId, disabled: true}, Validators.required],

        username: [this.userUserName, [
          Validators.required,
          Validators.pattern(
            /^[a-zA-Z0-9]+([_ -]?[a-zA-Z0-9])*$/
          )
        ]],
        first_name: [this.userFirstName, [
          Validators.required,
          Validators.pattern(
            /^[A-Za-z]+$/
          )
        ]],
        last_name: [this.userLastName, [
          Validators.required,
          Validators.pattern(
            /^[A-Za-z]+$/
          )
        ]],
        email: [this.userEmail, [
          Validators.required,
          Validators.pattern(
            /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/
          )
        ]],
        password: [this.userPassword, [
          Validators.required,
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
          )
        ]],
        phone: [this.userPhNum, [
          Validators.required,
          Validators.pattern(
            /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/
          )
        ]],
        address: [this.userAddress, [
          Validators.required,
          Validators.pattern(
            /^\s*\S+(?:\s+\S+){2}/
          )
        ]],
        city: [this.userCity, [
          Validators.required,
          Validators.pattern(
            /^[A-Za-z]+$/
          )
        ]],
        state: [this.userState, [
          Validators.required,
          Validators.pattern(
            /AL|Alabama|AK|Alaska|AZ|Arizona|AR|Arkansas|CA|California|CO|Colorado|CT|Connecticut|DE|Delaware|FL|Florida|GA|Georgia|HI|Hawaii|ID|Idaho|IL|Illinois|IN|Indiana|IA|Iowa|KS|Kansas|KY|Kentucky|LA|Louisiana|ME|Maine|MD|Maryland|MA|Massachusetts|MI|Michigan|MN|Minnesota|MS|Mississippi|MO|Missouri|MT|Montana|NE|Nebraska|NV|Nevada|NH|New Hampshire|NJ|New Jersey|NM|New Mexico|NY|New York|NC|North Carolina|ND|North Dakota|OH|Ohio|OK|Oklahoma|OR|Oregon|PA|Pennsylvania|RI|Rhode Island|SC|South Carolina|SD|South Dakota|TN|Tennessee|TX|Texas|UT|Utah|VT|Vermont|VA|Virginia|WA|Washington|WV|West Virginia|WI|Wisconsin|WY|Wyoming/
          )
        ]],
        zipcode: [this.userZipcode, [
          Validators.required,
          Validators.pattern(
            /^\d{5}(?:[-\s]\d{4})?$/          
            )
        ]],

        isActive: [this.is_active, [
          Validators.pattern(
            /^[A-Za-z]{1,16}([ ]?[a-zA-Z]{0,16})([ ]?[a-zA-Z]{0,16})$/
          )
        ]]
      });

      
    }

    get f(): { [key: string]: AbstractControl } {
      return this.addForm.controls;
    }

    onSubmit(form) {
      this.submitted = true;
  
      if (!this.addForm.errors && this.addForm.valid) {
        this.httpService
          .post('http://localhost:8000/auth/signup_by_admin', form.getRawValue())
          .subscribe((res) => {
            this.router.navigate(['cashmoney/admin/home'])    
          }, errors => { 
            this.errors = 'Username/Email already exits please choose a new Username/Email';
        });
      }

    }
    

    
    

}