import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
const serverURL = 'http://localhost:3000/planets';
@Injectable({
  providedIn: 'root'
})
export class PlanetService {

  constructor(private http: HttpClient) { }

  getPlanets(): Observable<any> {
    return this.http.get(serverURL);
  }
}
