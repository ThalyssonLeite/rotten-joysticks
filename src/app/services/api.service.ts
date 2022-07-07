import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})

export class APIService {
  fallbackGameImage: string = 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/most-popular-video-games-of-2022-1642612227.png';

  constructor (private http: HttpClient) {};

  auth (email: string, password: string) {
    return this.http.post<Observable<any>>('https://api-labs.tindin.com.br/auth', { email, password });
  }

  getGamesList () {
    return this.http.get<Observable<any>>('https://api-labs.tindin.com.br/games');
  }

  getGamesListSixPerPage (page: number) {
    return this.http.get<Observable<any>>(`https://api-labs.tindin.com.br/games?perPage=8&page=${page || 1}`);
  }

  getGame (gameId: string) {
    return this.http.get<Observable<any>>(`https://api-labs.tindin.com.br/games/${gameId}`);
  }

  rateGame (gameId: string, rate: number) {
    return this.http.post<Observable<any>>(`https://api-labs.tindin.com.br/games/rate`, { gameId, rate });
  }

  addGame (payload) {
    return this.http.post('https://api-labs.tindin.com.br/games', payload);
  }

  deleteGame (id) {
    return this.http.delete(`https://api-labs.tindin.com.br/games/${id}`);
  }
}
