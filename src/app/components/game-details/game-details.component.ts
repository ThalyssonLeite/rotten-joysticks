import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { setChoosenCard, setRateModal } from 'src/app/data/app.actions';
import { APIService } from 'src/app/services/api.service';

@Component({
  selector: 'rojo-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.scss']
})
export class GameDetailsComponent implements OnInit, OnDestroy {
  game: any;
  mainImage: string;
  rating: string;

  state$: Subscription;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private apiService: APIService, private store: Store<{ card }>) { }

  ngOnInit(): void {
    let gameId = location.href.match(/h.+\/\/.+?\/(.+)?/)[1];

    this.state$ = this.store.select('card').subscribe(({ game }) => {
      if (!game) return this.router.navigate(['/']);
      else if (gameId !== game._id) {
        this.apiService.getGame(gameId).subscribe(({ game }: any) => {
          this.game = game;
          this.setMainImage();

          this.store.dispatch(setChoosenCard({ game }));
        }, () => this.router.navigate(['/']));
      } else {
        this.game = game;
        this.setMainImage();
      }

      this.rating = game.rating !== undefined
        ? game.rating.toFixed(1).toString().endsWith('0')
          ? game.rating + ' / 10'
          : game.rating.toFixed(1) + ' / 10'
        : '???'
    })
  }

  setMainImage () {
    this.mainImage = this.game.photos[0] ? this.game.photos[0].url : this.apiService.fallbackGameImage;
  }

  goToMainPage () {
    this.router.navigate(['/']);
  }

  openRatingModal () {
    this.store.dispatch(setRateModal({ visible: true }));
  }

  ngOnDestroy(): void {
    if (this.state$) this.state$.unsubscribe();
  }
}
