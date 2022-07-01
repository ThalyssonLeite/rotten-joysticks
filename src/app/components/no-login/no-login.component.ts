import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { APIService } from 'src/app/services/api.service';

@Component({
  selector: 'rojo-no-login',
  templateUrl: './no-login.component.html',
  styleUrls: ['./no-login.component.scss']
})
export class NoLoginComponent implements OnInit {
  @ViewChild('slider') slider: ElementRef;

  fallbackImage: string = 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/most-popular-video-games-of-2022-1642612227.png';

  gamesList: any[];
  slides: any[];
  slideWidth: number;

  constructor(private apiService: APIService) { }

  ngOnInit(): void {
    this.getGameList();
  }

  getGameList () {
    this.apiService.getGamesList().subscribe((res: any) => {
      this.gamesList = res.games;
      this.separateSlides();
      setTimeout(() => this.getSlidesWidth(), 0);
    });
  }

  separateSlides () {
    this.slides = this.gamesList.slice(0, 3).map((game, index) => ({
      title: game.title,
      image: game.photos.length ? game.photos[0].url : this.fallbackImage,
      active: !index ? true : false
    }))
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

      if (isLast) this.slides[0].active = true, newActiveIndex = 0;
      else this.slides[nextSlide].active = true, newActiveIndex = nextSlide;

    } else if (!forward) {//making explicit
      const isFirst = activeSlideIndex === 0;
      const previousSlide = activeSlideIndex - 1;

      if (isFirst) this.slides[lastIndex].active = true, newActiveIndex = lastIndex;
      else this.slides[previousSlide].active = true, newActiveIndex = previousSlide;
    }

    this.slider.nativeElement.scrollLeft = this.slideWidth * newActiveIndex;
  }
}
