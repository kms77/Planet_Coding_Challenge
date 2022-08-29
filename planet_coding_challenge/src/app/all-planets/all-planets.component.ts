import { Component, OnInit } from '@angular/core';
import { Planet } from '../core/models/planet';
import { PlanetService } from '../core/services/planet.service';

@Component({
  selector: 'app-all-planets',
  templateUrl: './all-planets.component.html',
  styleUrls: ['./all-planets.component.css']
})
export class AllPlanetsComponent implements OnInit {

  planets: any;
  checkplanets: any;
  constructor(private planetService: PlanetService) { }

  ngOnInit(): void {
    this.getAllPlanets();
  }

  getAllPlanets() {
    this.planets = this.planetService.getPlanets();
    console.log(this.planets);
    this.planets.subscribe((p:Planet) => {
      this.checkplanets = p;
    });
    console.log(this.checkplanets);
    console.log(this.planets);
  }

}
