import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
const serverURL = 'http://localhost:3000/robots';

@Injectable({
  providedIn: 'root'
})
export class RobotService {

  constructor(private http: HttpClient) { }

  getRobotsOfCrew(crewID: number): Observable<any> {
    return this.http.get(`${serverURL}/${crewID}`);
  }
}
