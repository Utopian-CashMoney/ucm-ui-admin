import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';

@Component({
  selector: 'app-view-cards',
  templateUrl: './view-cards.component.html',
  styleUrls: ['./view-cards.component.css']
})
export class ViewCardsComponent implements OnInit {
  constructor(private httpService: HttpService) { }
  cards: any;
  totalCards = 0;

  ngOnInit(): void {
    this.loadAllCards();
  }

  loadAllCards() {
    this.httpService
    .getAll('http://localhost:8080/api/cards')
      .subscribe((res) => {
        this.cards = res;
        this.totalCards = this.cards.length;
      });
  }
}
