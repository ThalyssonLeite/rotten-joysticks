import { Component, Input, OnInit } from '@angular/core';
import { APIService } from 'src/app/services/api.service';

@Component({
  selector: 'rojo-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() game: any;
  image: string;

  constructor(public apiService: APIService) { }

  ngOnInit(): void {
    this.image = this.game.photos[0] ? this.game.photos[0].url : this.apiService.fallbackGameImage;
  }

}
