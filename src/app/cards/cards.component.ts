import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  constructor(private httpService: HttpService, private title: Title) { }
  creditCards: any;
  debitCards: any;
  totalCredit = 0;
  totalDebit = 0;

  ngOnInit(): void {
    this.title.setTitle('Cards');
    this.loadAllCreditCards();
    this.loadAllDebitCards();
  }

  loadAllCreditCards() {
    this.httpService
      .getAll('http://localhost:8081/api/creditcards')
      .subscribe((res) => {
        this.creditCards = res;
        this.totalCredit = this.creditCards.length;
      });
  }

  loadAllDebitCards() {
    this.httpService
      .getAll('http://localhost:8081/api/debitcards')
      .subscribe((res) => {
        this.debitCards = res;
        this.totalDebit = this.debitCards.length;
      });
  }
}
