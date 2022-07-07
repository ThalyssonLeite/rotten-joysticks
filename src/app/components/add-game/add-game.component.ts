import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APIService } from 'src/app/services/api.service';

@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.scss']
})
export class AddGameComponent implements OnInit {
  genres: any = [
    { id: 'Fight', active: false },
    { id: 'Sports', active: false },
    { id: 'Survival', active: false },
    { id: 'Horror', active: false },
    { id: 'RPG', active: false },
    { id: 'Fps', active: false },
    { id: 'Tps', active: false },
    { id: 'Platform', active: false },
    { id: 'Adventure', active: false },
    { id: 'Action', active: false },
    { id: 'Minigame', active: false },
    { id: 'Racing', active: false },
    { id: 'Strategy', active: false },
    { id: 'Musical', active: false },
    { id: 'Dance', active: false },
    { id: 'Simulator', active: false },
  ]

  platforms: any = [
    { id: 'PS', active: false },
    { id: 'PS2', active: false },
    { id: 'PS3', active: false },
    { id: 'PS4', active: false },
    { id: 'PS5', active: false },
    { id: 'PSP', active: false },
    { id: 'Tps', active: false },
    { id: 'Xbox', active: false },
    { id: 'Xbox 360', active: false },
    { id: 'Xbox One', active: false },
    { id: 'Xbox Series S', active: false },
    { id: 'Super Nintendo', active: false },
    { id: 'Nintendo 64', active: false },
    { id: 'Nintendo Switch', active: false },
    { id: 'Nintendo Wii', active: false },
    { id: 'Nintendo DS', active: false },
    { id: 'Nintendo 3DS', active: false },
    { id: 'Mega Drive', active: false },
    { id: 'PC', active: false },
    { id: 'Mobile', active: false },
  ]

  genresActive = [];
  platformsActive = [];

  tags = [];
  photos = [];
  videos = [];

  name: string = '';
  description: string = '';
  mediumPrice: string = '';
  releaseYear: string = '';

  loading: boolean = false;

  constructor(private router: Router, private apiService: APIService, private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.elementRef.nativeElement.closest('.rotten-joysticks').scrollTop = 0;//scroll to page to top;

    if (localStorage.getItem('token') === null) this.router.navigate(['']);
  }

  selectEnum (type, genre, index) {
    this[type].splice(index, 1);
    this[`${type}Active`].push(genre);
  }

  unselectEnum (type, genre, index) {
    this[`${type}Active`].splice(index, 1);
    this[type].unshift(genre);
  }

  reloadActiveEnum (type) {
    this[`${type}Active`] = this[type].filter(item => item.active === true);
  }

  recordEnum (type, $element) {
    const readyToPush = $element.value.includes('  ');
    if (!readyToPush) return;
    const trimmedString = $element.value.trim().replaceAll('  ', '');

    if (type === 'videos') {
      this[type].push(this.getEmbedYoutubeVideoFromLink(trimmedString));
    } else {
      this[type].push(trimmedString);
    }

    $element.value = '';
  }

  getEmbedYoutubeVideoFromLink (url) {
    if (url.includes('embed')) return url;
    const match = url.match(/v=(.+)/) ? url.match(/v=(.+)/)[1] : '';
    return `https://www.youtube.com/embed/${match}`;
  }

  deleteEnum (type, index) {
    this[type].splice(index, 1);
  }

  writeInput ($event, type) {
    $event.stopPropagation;

    if (type === 'mediumPrice') return this.formatMediumPrice($event.target);
    else if (type === 'releaseYear') return this.formatReleaseYear($event.target);

    const target = $event.target;
    this[type] = target.value;
  }

  formatMediumPrice (target, blur?: boolean) {
    let formatedNumber;

    if (blur === true) {
      formatedNumber = target.value < 0 ? 0 : undefined;
    }

     if (target.value > 2000) {
      formatedNumber = 2000
    } else {
      formatedNumber = target.value;
    }

    this.mediumPrice = target.value = formatedNumber;
  }

  formatReleaseYear (target, blur?: boolean) {
    let formatedNumber;
    const currentYear = new Date().getFullYear();
    const firstGameReleaseYear = 1958;

    if (blur === true) {
      formatedNumber = target.value < firstGameReleaseYear ? firstGameReleaseYear : undefined;
    }

    if (target.value < 0) {
      formatedNumber = 0;
    } else if (target.value > currentYear) {
      formatedNumber = currentYear;
    } else if (formatedNumber === firstGameReleaseYear) {
      null//do nothing :)
    } else {
      formatedNumber = Math.floor(Number(target.value));
    }

    this.releaseYear = target.value = formatedNumber;
  }

  goToHome () {
    this.router.navigate(['']);
  }

  submit () {
    const payload = {
      genres: this.genresActive.map(genre => genre.id),
      platforms: this.platformsActive.map(platform => platform.id.toUpperCase()),
      tags: this.tags,
      photos: this.photos.map(photo => ({ url: photo, name: 'picture' })),
      videos: this.videos.map(photo => ({ url: photo, name: 'youtube video' })),
      title: this.name,
      description: this.description,
      mediumPrice: parseFloat(this.mediumPrice),
      releaseYear: parseFloat(this.releaseYear)
    }

    this.loading = true;

    this.apiService.addGame(payload).subscribe({
      next: (res: any) => {
        const newGameId = res.game._id;
        this.router.navigate([newGameId]);
        this.loading = false;
      }
    });
  }
}
