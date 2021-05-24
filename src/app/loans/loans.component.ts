import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';

@Component({
  selector: 'app-loans',
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.css']
})
export class LoansComponent implements OnInit {
  constructor(private httpService: HttpService) { }
  loans: any;
  totalLoans = 0;

  ngOnInit(): void {
    this.loadAllLoans();
  }

  loadAllLoans() {
    this.httpService
    .getAll('http://localhost:8080/api/loans')
      .subscribe((res) => {
        this.loans = res;
        this.totalLoans = this.loans.length;
      });
  }
}
