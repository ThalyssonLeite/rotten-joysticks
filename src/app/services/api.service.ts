import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class APIService {
  constructor (private http: HttpClient) {};

  getGamesList () {
    return this.http.get('https://api-labs.tindin.com.br/games');
  }
}
