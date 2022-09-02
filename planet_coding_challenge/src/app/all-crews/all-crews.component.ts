import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Crew } from '../core/models/crew';

@Component({
  selector: 'app-all-crews',
  templateUrl: './all-crews.component.html',
  styleUrls: ['./all-crews.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AllCrewsComponent implements OnInit {

  dataSourceCrew: MatTableDataSource<any>;
  crews: Crew[]= [
    new Crew("crew1_4f44rf", "Crew no.1", "Jack", ["Robot1", "Robot2"],"Spaceship1"),
    new Crew("crew2_4f44rf", "Crew no.2", "Mike", ["Robot3", "Robot4", "Robot5", "Robot6", "Robot7"],"Spaceship2"),
    new Crew("crew3_4f44rf", "Crew no.3", "Adam", ["Robot8", "Robot9", "Robot10"],"Spaceship3")
    ];

  constructor() { }

  ngOnInit(): void {
    this.dataSourceCrew = new MatTableDataSource(this.crews);
  }

}
