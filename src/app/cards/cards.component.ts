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
  cards: any;
  totalCards = 0;

  ngOnInit(): void {
    this.title.setTitle('Cards');
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
