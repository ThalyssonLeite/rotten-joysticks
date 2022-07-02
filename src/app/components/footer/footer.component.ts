import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'rojo-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  socialBalls: any[] = [
    { class: 'facebook-fill-icon' },
    { class: 'twitter-fill-icon' },
    { class: 'google-plus-fill-icon' },
    { class: 'youtube-old-icon' },
    { class: 'instagram-outline-icon' },
  ]
}
