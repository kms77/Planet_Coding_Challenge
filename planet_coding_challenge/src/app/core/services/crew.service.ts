import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// endpoint URL
const serverURL = 'http://localhost:3000/crews';

@Injectable({
  providedIn: 'root'
})
export class CrewService {

  constructor(private http: HttpClient) { }

  /**
   * Returns all the crews from the databasse using a HTTP GET request to the server.
   *
   * @remarks
   * The asynchronous method sends an HTTP request, and returns an Observable that emits the requested data when the response is received
   *
   * @returns
   * Observable that emits the requested data
   */
  public getCrews(): Observable<any> {
    return this.http.get(serverURL);
  }

}
