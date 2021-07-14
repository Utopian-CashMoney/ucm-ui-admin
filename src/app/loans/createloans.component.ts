import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';
import { Router } from '@angular/router'


import {NgForm} from '@angular/forms';


@Component({
    selector: 'app-branches',
    templateUrl: './createloans.component.html',
    styleUrls: ['./createloans.component.css']
})

export class CreateLoanComponent implements OnInit {

    firstname: any;
    lastname: any;
    email: any;
    address: any;

    constructor(private httpService: HttpService ,private router: Router) { }


    ngOnInit(): void {
    }

    onSubmit(f: NgForm) {
        
        this.httpService
            .post('http://localhost:8081/loans/createLoans', f.value)
            .subscribe((res) => {
                this.router.navigate(['cashmoney/admin/home'])
            });

    }

}