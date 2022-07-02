import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})

export class APIService {
  fallbackGameImage: string = 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/most-popular-video-games-of-2022-1642612227.png';

  constructor (private http: HttpClient) {};

  getGamesList () {
    return this.http.get('https://api-labs.tindin.com.br/games');
  }

  getGamesListSixPerPage (page: number) {
    return this.http.get(`https://api-labs.tindin.com.br/games?perPage=8&page=${page || 1}`);
  }
}
