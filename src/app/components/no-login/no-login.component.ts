import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { APIService } from 'src/app/services/api.service';

@Component({
  selector: 'rojo-no-login',
  templateUrl: './no-login.component.html',
  styleUrls: ['./no-login.component.scss']
})
export class NoLoginComponent implements OnInit {
  @ViewChild('slider') slider: ElementRef;

  gamesList: any[];
  gamesAtPagination: any[] = [];
  slides: any[];
  slideWidth: number;
  pageNumber: number = 0;
  totalGamesLength: number;

  constructor(private apiService: APIService) { }

  ngOnInit(): void {
    this.getGameList();
    this.getGamesByPagination(this.pageNumber);
  }

  getGameList () {
    this.apiService.getGamesList().subscribe((res: any) => {
      this.gamesList = res.games;
      this.totalGamesLength = res.totalSize;
      this.separateSlides();
      setTimeout(() => this.getSlidesWidth(), 0);
    });
  }

  separateSlides () {
    this.slides = this.gamesList.reverse().slice(0, 3).map((game, index) => ({
      title: game.title,
      image: game.photos.length ? game.photos[0].url : this.apiService.fallbackGameImage,
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

  getGamesByPagination (pageNumber: number) {
    this.apiService.getGamesListSixPerPage(pageNumber + 1).subscribe((res: any) => {
      this.gamesAtPagination = [...this.gamesAtPagination, ...res.games];
      this.pageNumber = pageNumber + 1;

      if (res.totalSize !== this.totalGamesLength) {
        Array(this.pageNumber).forEach((_, index: number) => this.getGamesByPagination(index));
        this.totalGamesLength = res.totalSize;
      };//if someone adds a new game this reload all the list of games till the page that we currently are, it may prevent bugs in future,
    });
  }
}
