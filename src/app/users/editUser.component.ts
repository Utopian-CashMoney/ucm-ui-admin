import { Component, OnInit } from "@angular/core";
import { HttpService } from 'src/app/shared/services/http.service';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'


@Component({
    selector: 'app-editUser',
    templateUrl: './editUser.component.html',
    styleUrls: ['./editUser.component.css']
  })

export class EditUserComponent implements OnInit {

    constructor(private httpService: HttpService, private router: Router, private fb: FormBuilder) { }
    users: any;
    id:any;
    username:any;
    firstName:any;
    lastName:any;
    email:any;
    password:any;
    phNum:any;
    address:any;
    city:any;
    state:any;
    zipcode:any;
    isActive:any;
    editForm: FormGroup;
    submitted = false;
    result: string = '';

    userId = history.state.id;
    userUserName = history.state.username;
    userFirstName = history.state.firstName;
    userLastName = history.state.lastName;
    userEmail = history.state.email;
    userPassword = history.state.password;
    userPhNum = history.state.phNum;
    userAddress = history.state.address;
    userCity = history.state.city;
    userState = history.state.state;
    userZipcode = history.state.zipcode;
    userIsActive = history.state.isActive;



    ngOnInit(): void {

      // this.form = this.fb.group(
      //   {
      //     username: ['', Validators.required],
      //     firstName: ['', Validators.required],
      //     lastName: ['', [Validators.required]],
      //     email: ['', [Validators.required]],
      //     phNum: ['', [Validators.required]],
      //     isActive: ['', [Validators.required]]
      //   },
      // );

      // this.id = history.state.data.id;


      this.editForm = this.fb.group({
        id:[{value: this.userId, disabled: true}, Validators.required],

        username: [this.userUserName, [
          Validators.required,
          Validators.pattern(
            /^[a-zA-Z0-9]+([_ -]?[a-zA-Z0-9])*$/
          )
        ]],
        firstName: [this.userFirstName, [
          Validators.required,
          Validators.pattern(
            /^[A-Za-z]+$/
          )
        ]],
        lastName: [this.userLastName, [
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
        phNum: [this.userPhNum, [
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

        isActive: [this.userIsActive, [
          Validators.required,
          Validators.pattern(
            /^[A-Za-z]{1,16}([ ]?[a-zA-Z]{0,16})([ ]?[a-zA-Z]{0,16})$/
          )
        ]],
      });

      
    }

    get f(): { [key: string]: AbstractControl } {
      return this.editForm.controls;
    }

    onSubmit(form) {
      this.submitted = true;
  
      if (!this.editForm.errors && this.editForm.valid) {
        this.httpService
          .post('http://localhost:8000/auth/update_user', form.getRawValue())
          .subscribe((res) => {
            this.router.navigate(['cashmoney/admin/home'])
          });
      }

    }
    

    
    

}