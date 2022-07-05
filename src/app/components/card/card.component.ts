import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { setChoosenCard } from 'src/app/data/app.actions';
import { APIService } from 'src/app/services/api.service';

@Component({
  selector: 'rojo-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() game: any;
  image: string;
  rating: string;

  constructor(public apiService: APIService, private store: Store) { }

  ngOnInit(): void {
    this.image = this.game.photos[0] ? this.game.photos[0].url : this.apiService.fallbackGameImage;

    this.rating = this.game.rating !== undefined
    ? this.game.rating.toFixed(1).toString().endsWith('0')
      ? this.game.rating + ' / 10'
      : this.game.rating.toFixed(1) + ' / 10'
    : '???'
  }

  selectCard () {
    this.store.dispatch(setChoosenCard({ game: this.game }));
  }
}
