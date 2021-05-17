import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';

@Component({
  selector: 'app-view-loans',
  templateUrl: './view-loans.component.html',
  styleUrls: ['./view-loans.component.css']
})
export class ViewLoansComponent implements OnInit {
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
