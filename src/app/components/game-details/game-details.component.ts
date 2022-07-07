import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { setChoosenCard, setDeletionModal, setRateModal } from 'src/app/data/app.actions';
import { APIService } from 'src/app/services/api.service';

@Component({
  selector: 'rojo-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.scss']
})
export class GameDetailsComponent implements OnInit, OnDestroy {
  @ViewChild('slider') slider: ElementRef;
  slideWidth: number;

  game: any;
  mainImage: any;
  rating: string;
  slides: any[];

  cardState$: Subscription;
  headerState$: Subscription;
  logged: boolean;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private apiService: APIService, private store: Store<{ card, header }>) { }

  ngOnInit(): void {
    let gameId = location.href.match(/h.+\/\/.+?\/(.+)?/)[1];

    this.headerState$ = this.store.select('header').subscribe(label => {
      this.logged = label === 'Signout';
    });

    this.cardState$ = this.store.select('card').subscribe(({ game }) => {
      if (gameId !== game._id) {
        this.apiService.getGame(gameId).subscribe({
          next: ({ game }: any) => {
            this.game = game;
            this.setMainImage();
            this.setSlides();

            setTimeout(() => this.getSlidesWidth(), 0);

            this.store.dispatch(setChoosenCard({ game }));
          },
          error:() => this.router.navigate(['/'])
        })
      } else {
        this.game = game;
        this.setMainImage();

        setTimeout(() => this.getSlidesWidth(), 0);

        this.setSlides();
      }

      this.rating = game.rating !== undefined
        ? game.rating.toFixed(1).toString().endsWith('0')
          ? game.rating.toFixed(1).toString().substring(0, 2).replace('.','') + ' / 10'
          : game.rating.toFixed(1) + ' / 10'
        : '???'
    })
  }

  setMainImage () {
    this.mainImage = {
      url: this.game.photos[0] ? this.game.photos[0].url : this.apiService.fallbackGameImage,
      type: 'photo'
    };
  }

  goToMainPage () {
    this.router.navigate(['/']);
  }

  openRatingModal () {
    this.store.dispatch(setRateModal({ visible: true }));
  }

  setSlides () {
    function getEmbedYoutubeVideoFromLink (url) {
      if (url.includes('embed')) return url;
      const match = url.match(/v=(.+)/) ? url.match(/v=(.+)/)[1] : '';
      return `https://www.youtube.com/embed/${match}`;
    }

    const photos = this.game.photos.map(photo => ({ url: photo.url, type: 'photo', active: false }));
    const videos = this.game.videos.map(video => ({ url: `${getEmbedYoutubeVideoFromLink(video.url)}`, type: 'video', active: false }))
    this.slides = [...photos, ...videos];
    this.slides[0].active = true;
  }

  openSlide ($event, index: number) {
    if ($event) $event.stopPropagation();

    this.slides.forEach((slide, i) => slide.active = (index === i) ? true : false);
    this.mainImage = {
      url: this.slides[index].url,
      type: this.slides[index].type
    }
  }

  getSlidesWidth () {
    this.slideWidth = this.slider.nativeElement.querySelector('.slide').clientWidth;
  }

  navigate (forward: boolean) {
    const activeSlideIndex = this.slides.findIndex(slide => slide.active);
    const lastIndex = this.slides.length - 1;
    let newActiveIndex;

    this.slides.forEach(slide => {
      slide.active = false;
    })

    if (forward) {
      const isLast = activeSlideIndex === lastIndex;
      const nextSlide = activeSlideIndex + 1;

      if (isLast) this.slides[0].active = true, newActiveIndex = 0, this.openSlide(null, 0);
      else this.slides[nextSlide].active = true, newActiveIndex = nextSlide, this.openSlide(null, nextSlide);

    } else if (!forward) {//making explicit
      const isFirst = activeSlideIndex === 0;
      const previousSlide = activeSlideIndex - 1;

      if (isFirst) this.slides[lastIndex].active = true, newActiveIndex = lastIndex, this.openSlide(null, lastIndex);
      else this.slides[previousSlide].active = true, newActiveIndex = previousSlide, this.openSlide(null, previousSlide);
    }

    const gap = 8;
    this.slider.nativeElement.scrollLeft = (this.slideWidth + gap) * newActiveIndex;
  }

  askToDelete () {
    this.store.dispatch(setDeletionModal({ visible: true }));
  }

  ngOnDestroy(): void {
    if (this.cardState$) this.cardState$.unsubscribe();
  }
}
