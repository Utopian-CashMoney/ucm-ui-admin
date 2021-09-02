import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  constructor(private httpService: HttpService) { }
  cards: any;
  totalCards = 0;

  ngOnInit(): void {
    this.loadAllCreditCards();
    this.loadAllDebitCards();
  }

  loadAllCreditCards() {
    this.httpService
    .getAll('http://localhost:8080/api/creditcards')
      .subscribe((res) => {
        this.cards = res;
        this.totalCards = this.cards.length;
      });
  }

  loadAllDebitCards() {
    this.httpService
    .getAll('http://localhost:8080/api/debitcards')
      .subscribe((res) => {
        this.cards = res;
        this.totalCards = this.cards.length;
      });
  }
}
