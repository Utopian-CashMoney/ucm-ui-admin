import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-loans',
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.css']
})

export class LoansComponent implements OnInit {
  constructor(private httpService: HttpService, private title: Title) { }
  loans: any;
  totalLoans = 0;

  ngOnInit(): void {
    this.title.setTitle('Loans');
    this.loadAllLoans();
  }

  // Gets all the loans in the database
  loadAllLoans() {
    this.httpService
    .getAll('http://localhost:8081/loans')
      .subscribe((res) => {
        this.loans = res;
        this.totalLoans = this.loans.length;
      });
  }

  // createLoan() {
  //   this.httpService
  //   .post('http://localhost:8081/loans/createLoan', payload)
  //   .subscribe((res) => {

  //   });

  // }

  // Add New loans in the database

}
