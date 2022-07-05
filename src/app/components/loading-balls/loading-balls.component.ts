import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'rojo-loading-balls',
  templateUrl: './loading-balls.component.html',
  styleUrls: ['./loading-balls.component.scss']
})
export class LoadingBallsComponent implements OnInit {
  @Input() color: string = '#233674';

  constructor() { }

  ngOnInit(): void {
  }

}
