import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
const serverURL = 'http://localhost:3000/crews';

@Injectable({
  providedIn: 'root'
})
export class CrewService {

  constructor(private http: HttpClient) { }

  public getCrews(): Observable<any> {
    return this.http.get(serverURL);
  }

}
