import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { setChoosenCard, setRateModal } from 'src/app/data/app.actions';
import { APIService } from 'src/app/services/api.service';

@Component({
  selector: 'rojo-rate-modal',
  templateUrl: './rate-modal.component.html',
  styleUrls: ['./rate-modal.component.scss']
})
export class RateModalComponent implements OnInit {
  visibility: boolean;
  loading: boolean = false;
  game: any;

  stars: any[] = [
    { active: false },
    { active: false },
    { active: false },
    { active: false },
    { active: false },
    { active: false },
    { active: false },
    { active: false },
    { active: false },
    { active: false },
  ]

  selectedStars: any[] = [
    { active: false },
    { active: false },
    { active: false },
    { active: false },
    { active: false },
    { active: false },
    { active: false },
    { active: false },
    { active: false },
    { active: false },
  ]

  selectedRate: number;
  DOMStarScale: string;

  constructor(private apiService: APIService, private store: Store<{ rateModal, card }>) { }

  ngOnInit(): void {
    this.store.select('rateModal').subscribe(({ visible }) => {
      this.visibility = visible
      if (!visible) this.resetModal();
    });

    this.store.select('card').subscribe(({ game }) => this.game = game);
  }

  unhoverStars () {
    this.stars = JSON.parse(JSON.stringify(this.selectedStars));
  }

  hoverStars (index) {
    this.stars.forEach((star: any, i: number) => {
      if (i <= index) star.active = true;
      else star.active = false;
    });
  }

  selectStar (index) {
    this.selectedStars.forEach((star: any, i: number) => {
      if (i <= index) star.active = true;
      else star.active = false;
    });

    this.selectedRate = index + 1;
    this.selectDOMStarScale();
  }

  selectDOMStarScale () {
    const styleTemplate = `--scale: scale(1.`
    const scaleDecimal = (this.selectedRate / 2).toString().replace('.', '');

    this.DOMStarScale = `${styleTemplate}${scaleDecimal})`;
  }

  resetModal () {
    setTimeout( () => {
      this.stars.forEach(star => star.active = false);
      this.selectedStars.forEach(star => star.active = false);
      this.selectedRate = 0;
      this.selectDOMStarScale();
    }, 300);
  }

  close () {
    this.store.dispatch(setRateModal({ visible: false }));
  }

  rate () {
    if (this.loading) return;

    this.loading = true;

    this.apiService.rateGame(this.game._id, this.selectedRate).subscribe(({ ratingUpdated, success, totalVotes }: any) => {
      this.store.dispatch(setRateModal({ visible: false }));
      setTimeout(() => this.loading = false, 310);
      if (!success) return;

      const game = { ...this.game, totalVotes, rating: ratingUpdated };
      this.store.dispatch(setChoosenCard({ game }));
    });
  }
}
