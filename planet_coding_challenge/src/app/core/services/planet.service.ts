import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Planet } from '../models/planet';

// endpoint URL
const serverURL = 'http://localhost:3000/planets';

@Injectable({
  providedIn: 'root'
})
export class PlanetService {

  constructor(private http: HttpClient) { }

   /**
   * Returns all the planets from the databasse using a HTTP GET request to the server.
   *
   * @remarks
   * The asynchronous method sends an HTTP request, and returns an Observable
   *
   * @returns
   * Observable that emits the requested data when the response is received
   */
  public getPlanets(): Observable<any> {
    return this.http.get(serverURL);
  }

   /**
   * Returns all the planets from the databasse using a HTTP POST request to the server.
   *
   * @remarks
   * The asynchronous method sends an HTTP request, and returns an Observable
   *
   * @param planet - The new planet tp be added in the database
   * @returns
   * Observable that emits the requested data when the response is received
   */
  public addPlanet(planet: Planet): Observable<any> {
    return this.http.post(serverURL, planet, {responseType: 'text'});
  }

   /**
   * Returns all the planets from the databasse using a HTTP PUT request to the server at the serverURL/planets/id -
   * where id is the id of the planet we want to update.
   *
   * @remarks
   * The asynchronous method sends an HTTP request, and returns an Observable
   *
   * @param planet - The new updated planet
   * @returns
   * Observable that emits the requested data when the response is received
   */
  public updatePlanet(planet: Planet): Observable<any> {
    return this.http.put(`${serverURL}/${planet.planetID}`, planet, {responseType: 'text'});
  }
}
